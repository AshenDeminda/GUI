using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
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
    public partial class Dashboard : Page
    {
        private static readonly HttpClient client = new HttpClient();
        private int userId;
        private UserData userData;
        private List<Transaction> transactions = new List<Transaction>();
        private MainWindow _mainWindow;

        public Dashboard(MainWindow mainWindow)
        {
            InitializeComponent();
            _mainWindow = mainWindow;
            userId = _mainWindow.UserId;
            LoadDashboardData();
        }

        private async void LoadDashboardData()
        {
            try
            {
                await Task.WhenAll(
                    LoadUserData(),
                    LoadTransactionData()
                );

                UpdateUI();
                DrawPieChart();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async Task LoadUserData()
        {
            HttpResponseMessage userResponse = await client.GetAsync($"http://localhost:3000/user/{userId}");
            if (userResponse.IsSuccessStatusCode)
            {
                string userResponseBody = await userResponse.Content.ReadAsStringAsync();
                userData = JsonConvert.DeserializeObject<UserData>(userResponseBody);
            }
            else
            {
                throw new Exception($"Failed to load user data: {userResponse.StatusCode}");
            }
        }

        private async Task LoadTransactionData()
        {
            HttpResponseMessage transactionsResponse = await client.GetAsync($"http://localhost:3000/transaction?user={userId}");
            if (transactionsResponse.IsSuccessStatusCode)
            {
                string transactionsResponseBody = await transactionsResponse.Content.ReadAsStringAsync();
                transactions = JsonConvert.DeserializeObject<List<Transaction>>(transactionsResponseBody);
            }
            else
            {
                throw new Exception($"Failed to load transaction data: {transactionsResponse.StatusCode}");
            }
        }

        private void UpdateUI()
        {
            UserNameText.Text = userData.FullName;
            UserEmailText.Text = $"Email: {userData.Email}";
            UserLocationText.Text = $"Location: {userData.Location ?? "Not set"}";
            UserJobText.Text = $"Job: {userData.Job ?? "Not set"}";
            UserAgeText.Text = $"Age: {userData.Age?.ToString() ?? "Not set"}";

            decimal totalIncome = transactions
                .Where(t => t.Type.ToLower() == "income")
                .Sum(t => t.Amount);

            decimal totalExpenses = transactions
                .Where(t => t.Type.ToLower() == "expense")
                .Sum(t => t.Amount);

            decimal netBalance = totalIncome - totalExpenses;

            string currencySymbol = userData.CurrencyFormat ?? "$";

            TotalIncomeText.Text = $"{currencySymbol}{totalIncome:N2}";
            TotalExpensesText.Text = $"{currencySymbol}{totalExpenses:N2}";
            NetBalanceText.Text = $"{currencySymbol}{netBalance:N2}";

            TotalIncomeText.Foreground = new SolidColorBrush(Colors.Green);
            TotalExpensesText.Foreground = new SolidColorBrush(Colors.Red);
            NetBalanceText.Foreground = new SolidColorBrush(netBalance >= 0 ? Colors.Green : Colors.Red);
        }

        private void DrawPieChart()
        {
            PieChartCanvas.Children.Clear();

            var expensesByCategory = transactions
                .Where(t => t.Type.ToLower() == "expense")
                .GroupBy(t => t.Category)
                .Select(g => new { Category = g.Key, Amount = g.Sum(t => t.Amount) })
                .OrderByDescending(x => x.Amount)
                .Take(5)
                .ToList();

            Color[] colors = {
                Colors.Blue,
                Colors.Green,
                Colors.Red,
                Colors.Purple,
                Colors.Orange
            };

            decimal total = expensesByCategory.Sum(e => e.Amount);
            if (total == 0)
            {
                TextBlock noDataText = new TextBlock
                {
                    Text = "No expense data available",
                    FontSize = 16,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    VerticalAlignment = VerticalAlignment.Center
                };
                Canvas.SetLeft(noDataText, 75);
                Canvas.SetTop(noDataText, 125);
                PieChartCanvas.Children.Add(noDataText);
                return;
            }

            double centerX = 125;
            double centerY = 125;
            double radius = 100;
            double startAngle = 0;
            double legendStartY = 10;

            for (int i = 0; i < expensesByCategory.Count; i++)
            {
                var expenseItem = expensesByCategory[i];
                decimal percentage = expenseItem.Amount / total;
                double sweepAngle = (double)percentage * 360;

                PathGeometry pathGeometry = new PathGeometry();
                PathFigure pathFigure = new PathFigure();
                pathFigure.StartPoint = new Point(centerX, centerY);

                double endAngleRad = (startAngle + sweepAngle) * Math.PI / 180;
                ArcSegment arcSegment = new ArcSegment
                {
                    Point = new Point(
                        centerX + radius * Math.Cos(endAngleRad),
                        centerY + radius * Math.Sin(endAngleRad)
                    ),
                    Size = new Size(radius, radius),
                    IsLargeArc = sweepAngle > 180,
                    SweepDirection = SweepDirection.Clockwise
                };

                pathFigure.Segments.Add(arcSegment);
                pathFigure.Segments.Add(new LineSegment(new Point(centerX, centerY), true));
                pathGeometry.Figures.Add(pathFigure);

                Path path = new Path
                {
                    Fill = new SolidColorBrush(colors[i % colors.Length]),
                    Data = pathGeometry,
                    Stroke = Brushes.White,
                    StrokeThickness = 1
                };

                Canvas.SetZIndex(path, 1);
                PieChartCanvas.Children.Add(path);

                Rectangle legendRect = new Rectangle
                {
                    Width = 10,
                    Height = 10,
                    Fill = new SolidColorBrush(colors[i % colors.Length])
                };
                Canvas.SetLeft(legendRect, 10);
                Canvas.SetTop(legendRect, legendStartY);

                TextBlock legendText = new TextBlock
                {
                    Text = $"{expenseItem.Category}: {expenseItem.Amount:N2} ({percentage:P1})",
                    FontSize = 10
                };
                Canvas.SetLeft(legendText, 25);
                Canvas.SetTop(legendText, legendStartY - 2);

                PieChartCanvas.Children.Add(legendRect);
                PieChartCanvas.Children.Add(legendText);

                legendStartY += 20;
                startAngle += sweepAngle;
            }
        }
    }
}