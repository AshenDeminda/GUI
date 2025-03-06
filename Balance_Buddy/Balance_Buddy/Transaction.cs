using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Balance_Buddy
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
