using System.Windows;
using System.Windows.Controls;

namespace WPFexpense_tracker
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            MainFrame.Navigate(new AddRecord()); // Default page
        }

        private void NavigateToDashboard(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new AddRecord()); // Replace with Dashboard page if created
        }

        private void NavigateToAddRecord(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new AddRecord());
        }

        private void NavigateToReports(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new Reports());
        }

        private void NavigateToSettings(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new Settings());
        }
    }
}