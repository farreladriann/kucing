using System;
using System.Data;
using System.Diagnostics.CodeAnalysis;
using Newtonsoft.Json;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.IO;

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
        static async Task Main(string[] args)
        {
            string connectionString = "mongodb+srv://dagr:testing123@cluster0.t3ydebj.mongodb.net/CompanyDB?retryWrites=true&w=majority";

            MongoClient client = new MongoClient(connectionString);

            IMongoDatabase database = client.GetDatabase("CompanyDB");

            var collection = database.GetCollection<BsonDocument>("employees");

            var documents = await collection.Find(new BsonDocument()).ToListAsync();

            var settings = new JsonWriterSettings
            {
                Indent = true,
            };

            foreach (var document in documents)
            {
                Console.WriteLine(document.ToJson(settings));
            }
        }
    }
}
