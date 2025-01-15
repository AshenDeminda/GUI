using System;
using System.Collections.Generic;
using System.Linq;
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

namespace Balance_Buddy
{
    /// <summary>
    /// Interaction logic for AddRecord.xaml
    /// </summary>
    public partial class AddRecord : Page
    {
        public AddRecord()
        {
            InitializeComponent();
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

        private void AddTransaction_Click(object sender, RoutedEventArgs e)
        {
            // Fetch entered values
            string transactionType = IncomeRadio.IsChecked == true ? "Income" : "Expense";
            string category = CategoryDropdown.SelectedItem as string ?? "N/A";
            string description = DescriptionBox.Text;
            if (decimal.TryParse(AmountBox.Text, out decimal amount))
            {
                // Update financial summary
                if (transactionType == "Income")
                {
                    decimal totalIncome = decimal.Parse(TotalIncomeText.Text.TrimStart('$'));
                    totalIncome += amount;
                    TotalIncomeText.Text = $"${totalIncome:F2}";
                }
                else
                {
                    decimal totalExpense = decimal.Parse(TotalExpenseText.Text.TrimStart('$'));
                    totalExpense += amount;
                    TotalExpenseText.Text = $"${totalExpense:F2}";
                }

                // Update net balance
                decimal netBalance = decimal.Parse(TotalIncomeText.Text.TrimStart('$')) -
                                     decimal.Parse(TotalExpenseText.Text.TrimStart('$'));
                NetBalanceText.Text = $"${netBalance:F2}";

                // Clear fields
                DescriptionBox.Text = "";
                AmountBox.Text = "";
                CategoryDropdown.SelectedIndex = -1;
            }
            else
            {
                MessageBox.Show("Please enter a valid amount.", "Invalid Input", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }
    }
}
