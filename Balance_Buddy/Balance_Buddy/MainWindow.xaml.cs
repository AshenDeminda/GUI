using System.Configuration;
using System.Text;
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
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void NavigateDashboard_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new Dashboard());
        }

        private void NavigateAddRecord_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new AddRecord());
        }

        private void NavigateReports_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new Reports());
        }

        private void NavigateSettings_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new Settings());
        }
    }
}