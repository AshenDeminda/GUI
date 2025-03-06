using System;
using System.Net.Http;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using Newtonsoft.Json;

namespace Balance_Buddy
{
    public partial class Signup : Page
    {
        private MainWindow _mainWindow;
        private static readonly HttpClient client = new HttpClient();

        public Signup(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
        }

        private async void Signup_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var signupData = new
                {
                    full_name = NameTextBox.Text,
                    email = EmailTextBox.Text,
                    password = PasswordBox.Password
                };

                var json = JsonConvert.SerializeObject(signupData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync("http://localhost:3000/signup", content);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Signup successful! Please login.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                    _mainWindow.MainFrame.Navigate(new Login(_mainWindow));
                }
                else
                {
                    MessageBox.Show("Failed to sign up", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void Login_Click(object sender, RoutedEventArgs e)
        {
            _mainWindow.MainFrame.Navigate(new Login(_mainWindow));
        }
    }
}
