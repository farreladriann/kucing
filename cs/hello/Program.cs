using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic;

namespace RSP
{
    public class Journal
    {
        private readonly List<string> entries = new();

        private static int count = 0;
        public void AddEntry(string text)
        {
            entries.Add($"{++count}: {text}");
        }

        public void RemoveEntry(int index)
        {
            entries.RemoveAt(index);
        }

        public void ShowEntry()
        {
            foreach (var entry in entries)
            {
                Console.WriteLine(entry);
            }

            for (int i = 0; i < entries.Count; i++)
            {
                Console.WriteLine(entries[i]);
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Journal j = new Journal();
            j.AddEntry("I cried today");
            j.AddEntry("I ate Bug,");
            j.ShowEntry();
        }
    }
}