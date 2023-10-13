using System;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using Lecture_2;

namespace Lecture_1
{
    class MainProgramClass
    {
        static void Main(string[] args)
        {
            PrintToScreenRecorder cus = new PrintToScreenRecorder();
            cus.PrintToScreenPublic();
            cus.PrintPrivately();
            Console.WriteLine("Inh");
            PrintScreenV2 cusInh = new PrintScreenV2();
            cusInh.PrintProtected();
            PrintScreenStatic.PrintToScreenStatic();
            Console.WriteLine(PrintScreenStatic.myRandGen.Next());
            PrintWithoutStaticClass();
            InternalTest internalTestObj = new InternalTest();
            internalTestObj.InternalTesting();

            Car myCar = new Car();
            Console.WriteLine($"default: {myCar.carName}");
            myCar.carName = "Porsche";
            Console.WriteLine($"default: {myCar.carName}");
            Console.WriteLine($"default: {myCar.IrPrice}");
            Console.WriteLine(PrintScreenStatic.myRandGen.Next());
            Console.WriteLine(PrintScreenStatic.nuym);
            PrintScreenStatic.nuym = 220;
            Console.WriteLine(PrintScreenStatic.nuym);
            Car car = new();
            car.IrPrice = 20;
            
        }

        public static class PrintScreenStatic
        {
            public static Random myRandGen = new Random();
            public static int nuym = 20;
            public static void PrintToScreenStatic()
            {
                Console.WriteLine("PrintToScreenStatic: " + myRandGen.Next().ToString("N0"));
            }
        }

        public static void PrintWithoutStaticClass()
        {
            Random myRandGen = new Random();
            Console.WriteLine("PrintWithoutStaticClass: " + myRandGen.Next().ToString("N0"));
        }

        public class PrintToScreenRecorder
        {
            // bisa dimana aja
            readonly Random myRandGen = new Random();

            void PrintToScreenDefault()
            {
                Console.WriteLine("PrintToScreenDefault: " + myRandGen.Next().ToString("N0"));
            }
            public void PrintToScreenPublic()
            {
                Console.WriteLine("PrintToScreenPublic: " + myRandGen.Next().ToString("N0"));
            }
            // hanya bisa di class ini, inherited class gabisa
            private void PrintToScreenPrivate()
            {
                Console.WriteLine("PrintToScreenPrivate: " + myRandGen.Next().ToString("N0"));
            }
            // perbedaan protected bisa diakses ke inherited class
            protected void PrintToScreenProtected()
            {
                Console.WriteLine("PrintToScreenProtected: " + myRandGen.Next().ToString("N0"));
            }

            public void PrintPrivately()
            {
                PrintToScreenPrivate();
            }

            internal void PrintToScreenInternal()
            {
                Console.WriteLine("PrintToScreenInternal: " + myRandGen.Next().ToString("N0"));
            }
        }

        class PrintScreenV2 : PrintToScreenRecorder
        {
            public void PrintProtected()
            {
                PrintToScreenProtected();
            }
        }
        class Car
        {
            public string carName = "Enzo Ferrari";
            public int IrPrice 
            { 
                get{ return IrPrice; } 
                set{ IrPrice = value } 
            }

        }
    }
}