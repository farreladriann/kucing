using System;
using System.Data;
using System.Diagnostics.CodeAnalysis;
using Newtonsoft.Json;


namespace Nuget.Quickstart
{
    public class Account
    {
        public Account()
        {
            Name = string.Empty;
            Email = string.Empty;
        }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            Account account = new Account
            {
                Name = "John Doe",
                Email = "john@nuget.org",
                DOB = new DateTime(1980, 2, 20, 0, 0, 0, DateTimeKind.Utc),
            };

            string json = JsonConvert.SerializeObject(account, Formatting.Indented);
            Console.WriteLine(json);
        }
    }
}