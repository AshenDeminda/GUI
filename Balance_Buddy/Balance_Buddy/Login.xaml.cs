using System;
using System.Net.Http;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Newtonsoft.Json;

namespace Balance_Buddy
{
    public partial class Login : Page
    {
        private MainWindow _mainWindow;
        private static readonly HttpClient client = new HttpClient();

        public Login(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
        }

        private async void Login_Click(object sender, RoutedEventArgs e)
        {
            string email = EmailTextBox.Text;
            string password = PasswordBox.Password;

            var loginData = new
            {
                email = email,
                password = password
            };

            var json = JsonConvert.SerializeObject(loginData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                HttpResponseMessage response = await client.PostAsync("http://localhost:3000/signin", content);
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<dynamic>(responseBody);

                    // Store the user ID in the main window
                    _mainWindow.UserId = result.user.id;

                    // Show navigation bar
                    _mainWindow.ShowNavigationBar();

                    // Navigate to Dashboard
                    _mainWindow.MainFrame.Navigate(new Dashboard(_mainWindow));
                }
                else
                {
                    MessageBox.Show("Invalid email or password", "Login Failed", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void Register_Click(object sender, MouseButtonEventArgs e)
        {
            _mainWindow.MainFrame.Navigate(new Signup(_mainWindow));
        }
    }
}