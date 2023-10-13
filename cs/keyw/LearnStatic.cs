using System;

namespace LearnStat
{
    class LearnStatClass
    {
        
        public int updNumber = 20;
        public static class StatClass
        {
            static readonly Random myRandGen = new Random();
            public static void PrintToScreenStat()
            {
                Console.WriteLine("PrintToScreenStatic: " + myRandGen.Next().ToString("N0"));
            }
        }
    }
}