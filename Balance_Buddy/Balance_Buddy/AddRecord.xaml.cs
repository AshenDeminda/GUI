using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Newtonsoft.Json;

namespace Balance_Buddy
{
    public partial class AddRecord : Page
    {
        private static readonly HttpClient client = new HttpClient();
        private int userId;
        private MainWindow _mainWindow;

        public AddRecord(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
            userId = _mainWindow.UserId;
            LoadInitialData();
        }

        private async void LoadInitialData()
        {
            try
            {
                await LoadFinancialSummary();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to load financial data: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async Task LoadFinancialSummary()
        {
            HttpResponseMessage response = await client.GetAsync($"http://localhost:3000/transaction?user={userId}");
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                var transactions = JsonConvert.DeserializeObject<dynamic[]>(responseBody);

                decimal totalIncome = 0;
                decimal totalExpense = 0;

                foreach (var transaction in transactions)
                {
                    if (transaction.type.ToString().ToLower() == "income")
                        totalIncome += (decimal)transaction.amount;
                    else if (transaction.type.ToString().ToLower() == "expense")
                        totalExpense += (decimal)transaction.amount;
                }

                decimal netBalance = totalIncome - totalExpense;

                TotalIncomeText.Text = $"${totalIncome:F2}";
                TotalExpenseText.Text = $"${totalExpense:F2}";
                NetBalanceText.Text = $"${netBalance:F2}";
            }
            else
            {
                throw new Exception($"Failed to fetch transactions: {response.StatusCode}");
            }
        }

        private void TransactionType_Checked(object sender, RoutedEventArgs e)
        {
            if (IncomeRadio.IsChecked == true)
            {
                CategoryDropdown.Items.Clear();
                CategoryDropdown.Items.Add("Salary 💰");
                CategoryDropdown.Items.Add("Freelance 🛠");
                CategoryDropdown.Items.Add("Investments 📈");
            }
            else if (ExpenseRadio.IsChecked == true)
            {
                CategoryDropdown.Items.Clear();
                CategoryDropdown.Items.Add("Rent 🏠");
                CategoryDropdown.Items.Add("Groceries 🛒");
                CategoryDropdown.Items.Add("Dining 🍽");
                CategoryDropdown.Items.Add("Transport 🚗");
                CategoryDropdown.Items.Add("Entertainment 🎉");
            }

            CategoryDropdown.IsEnabled = true;
        }

        private async void AddTransaction_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (CategoryDropdown.SelectedItem == null)
                {
                    MessageBox.Show("Please select a category", "Input Required", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                if (string.IsNullOrWhiteSpace(DescriptionBox.Text))
                {
                    MessageBox.Show("Please enter a description", "Input Required", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                if (!decimal.TryParse(AmountBox.Text, out decimal amount) || amount <= 0)
                {
                    MessageBox.Show("Please enter a valid amount (greater than zero)", "Invalid Input", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                string transactionType = IncomeRadio.IsChecked == true ? "income" : "expense";
                string selectedCategory = CategoryDropdown.SelectedItem.ToString();
                string category = selectedCategory.Split(' ')[0].ToLower();

                var transactionData = new
                {
                    type = transactionType,
                    category = category,
                    description = DescriptionBox.Text,
                    amount = amount,
                    userId = userId
                };

                string json = JsonConvert.SerializeObject(transactionData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync("http://localhost:3000/transaction", content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<dynamic>(responseBody);

                    MessageBox.Show("Transaction added successfully!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);

                    await LoadFinancialSummary();

                    DescriptionBox.Text = "";
                    AmountBox.Text = "";
                    CategoryDropdown.SelectedIndex = -1;
                }
                else
                {
                    MessageBox.Show($"Failed to add transaction: {response.StatusCode}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}