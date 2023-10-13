// string greeting = "      Hello World!       ";
// Console.WriteLine($"[{greeting}]");

// string trimmedGreeting = greeting.TrimStart();
// Console.WriteLine($"[{trimmedGreeting}]");

// trimmedGreeting = greeting.TrimEnd();
// Console.WriteLine($"[{trimmedGreeting}]");

// trimmedGreeting = greeting.Trim();
// Console.WriteLine($"[{trimmedGreeting}]");
//=============
// string sayHello = "Hello World!";
// Console.WriteLine(sayHello);
// sayHello = sayHello.Replace("Hello", "Greetings");
// Console.WriteLine(sayHello)
//========
using System;
using System.Collections.Generic;
using System.Linq;

namespace helloWorld
{
    class A
    {
        public virtual void M() { Console.Write("A"); }
    }
    class B : A
    {
        public override void M() { Console.Write("B"); }
    }
    class C : B
    {
        new public virtual void M() { Console.Write("C"); }
    }
    class D : C
    {
        public override void M() { Console.Write("D"); }
        static void Main()
        {
            D d = new D(); C c = d; B b = c; A a = b;
            d.M(); c.M(); b.M(); a.M();
        }
    }
}