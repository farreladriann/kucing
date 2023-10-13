using System;
using System.Data;
using System.Diagnostics.CodeAnalysis;
using LearnStat;

namespace MainProgram
{
    class MainProgramClass
    {
        static void Main(string[] args)
        {
            int a = 7;
            int b = 20;
            float sum,  subs;
            Opperation(a, b, out sum, out subs);
        }
        public static void Opperation(int &a, int b,out float sum, out float subs)
        {
            sum = a+b;
            subs = a-b;
            a = 10;
        }
        public static float Opperation1(int a, int b)
        {
            return a+b;
        }
        public static float Opperation2(int a, int b)
        {
            return a-b;
        }

        public abstract class Animal
        {
            protected abstract void Mengaum();
            public int Ggg()
            {
                return 2;
            }
        }
        public class MyBaseClass
        {
            public void MyMethod(int x)
            {
                Console.WriteLine($"MyMethod dengan parameter {x}");
            }
        }

        public class MyBaseClass2
        {
            public void MyMethod2(int x)
            {
                Console.WriteLine($"MyMethod2 dengan parameter {x}");
            }
        }

        interface MyInterface
        {
            int Value { get; set; }
            public void InterfaceMethod(int x)
            {
                Console.WriteLine($"InterfaceMethod dengan parameter {x}");
            }
        }

        public class MyDerivedClass : MyBaseClass, MyInterface
        {
            public void tes()
            {
            }
        }

    }
}