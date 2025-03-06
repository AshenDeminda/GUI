using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Balance_Buddy
{
    public class UserData
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string Job { get; set; }
        public int? Age { get; set; }
        public string Currency { get; set; }
        public string CurrencyFormat { get; set; }
    }
}
