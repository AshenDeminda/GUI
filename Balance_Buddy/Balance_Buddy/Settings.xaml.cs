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
    public partial class Settings : Page
    {
        private static readonly HttpClient client = new HttpClient();
        private int userId;
        private MainWindow _mainWindow;

        public Settings(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
            userId = _mainWindow.UserId;
            LoadUserData();
        }

        private async void LoadUserData()
        {
            try
            {
                // Fetch user data for the logged-in user
                HttpResponseMessage response = await client.GetAsync($"http://localhost:3000/user/{userId}");
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var userData = JsonConvert.DeserializeObject<dynamic>(responseBody);

                    // Update UI with user data
                    NameTextBox.Text = userData.full_name ?? "Not set";
                    EmailTextBox.Text = userData.email ?? "Not set";
                    LocationTextBox.Text = userData.location ?? "Not set";
                    JobTextBox.Text = userData.job ?? "Not set";
                    AgeTextBox.Text = userData.age?.ToString() ?? "Not set";

                    // Set currency settings if available
                    if (userData.currency != null)
                    {
                        CurrencyComboBox.SelectedIndex = userData.currency == "USD" ? 0 : 1;
                    }

                    if (userData.currencyFormat != null)
                    {
                        CurrencyFormatComboBox.SelectedIndex = userData.currencyFormat == "$" ? 0 : 1;
                    }
                }
                else
                {
                    MessageBox.Show("Failed to load user data", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void UpdateProfile_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var updateData = new
                {
                    id = userId,
                    full_name = NameTextBox.Text,
                    email = EmailTextBox.Text,
                    location = LocationTextBox.Text,
                    job = JobTextBox.Text,
                    age = int.TryParse(AgeTextBox.Text, out int age) ? age : (int?)null
                };

                var json = JsonConvert.SerializeObject(updateData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PutAsync($"http://localhost:3000/settings/update-profile/{userId}", content);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Profile updated successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                }
                else
                {
                    MessageBox.Show("Failed to update profile", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void ChangePassword_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                // Check if new password and confirm password match
                if (NewPasswordBox.Password != ConfirmNewPasswordBox.Password)
                {
                    MessageBox.Show("New passwords do not match", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                var passwordData = new
                {
                    id = userId,
                    currentPassword = CurrentPasswordBox.Password,
                    newPassword = NewPasswordBox.Password
                };

                var json = JsonConvert.SerializeObject(passwordData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PutAsync($"http://localhost:3000/settings/change-password/{userId}", content);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Password updated successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);

                    // Clear password fields
                    CurrentPasswordBox.Password = "";
                    NewPasswordBox.Password = "";
                    ConfirmNewPasswordBox.Password = "";
                }
                else
                {
                    MessageBox.Show("Failed to update password. Please check your current password.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void UpdateCurrency_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                string selectedCurrency = (CurrencyComboBox.SelectedItem as ComboBoxItem)?.Content.ToString() ?? "USD";
                string selectedFormat = (CurrencyFormatComboBox.SelectedItem as ComboBoxItem)?.Content.ToString() ?? "$";

                var currencyData = new
                {
                    id = userId,
                    currency = selectedCurrency,
                    currencyFormat = selectedFormat
                };

                var json = JsonConvert.SerializeObject(currencyData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PutAsync($"http://localhost:3000/settings/update-currency/{userId}", content);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Currency settings updated successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                }
                else
                {
                    MessageBox.Show("Failed to update currency settings", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void LocationTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            // Optional: Add validation or other logic for location text changes
        }
    }
}