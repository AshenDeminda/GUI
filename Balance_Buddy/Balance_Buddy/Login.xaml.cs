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
    public partial class Login : Page
    {
        private MainWindow _mainWindow;

        public Login(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
        }

        private void Login_Click(object sender, RoutedEventArgs e)
        {
            string email = EmailTextBox.Text;
            string password = PasswordBox.Password;

            // Here you would typically validate credentials against a database or service
            // For this example, we'll use a simple hardcoded credential check
            if (email == "user@example.com" && password == "password123")
            {
                // Show navigation bar
                _mainWindow.ShowNavigationBar();

                // Navigate to Dashboard
                _mainWindow.MainFrame.Navigate(new Dashboard());
            }
            else
            {
                MessageBox.Show("Invalid email or password", "Login Failed", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void Register_Click(object sender, MouseButtonEventArgs e)
        {
            // Implement registration logic or open registration window
            MessageBox.Show("Registration feature not implemented", "Register", MessageBoxButton.OK, MessageBoxImage.Information);
        }
    }
}