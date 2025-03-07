using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Balance_Buddy
{
    public class Transaction
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("category")]
        public string Category { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("amount")]
        public decimal Amount { get; set; }

        [JsonProperty("userId")]
        public int UserId { get; set; }

        // The API doesn't return this property, but we'll keep it for compatibility
        [JsonIgnore]
        public DateTime CreatedAt { get; set; }
    }
}
