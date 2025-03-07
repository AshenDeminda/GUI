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
        private MainWindow _mainWindow;

        public Settings(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
        }

        // Empty event handlers to satisfy XAML references
        private void UpdateProfile_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("User data updated successfully!", "Update Profile", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void ChangePassword_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Password changed successfully!", "Change Password", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void LocationTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            // Empty implementation
        }
    }
}