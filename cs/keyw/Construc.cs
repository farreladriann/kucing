using System;

namespace LearnConstruc
{
    class LearnConstrucClass
    {
        readonly int IDi;

        public LearnConstrucClass()
        {
            Console.WriteLine("Gunakan Parameter");
        }
        
        public LearnConstrucClass(int IDi)
        {
            this.IDi = IDi;
        }

        static LearnConstrucClass()
        {

        }

        public static LearnConstrucClass CreateInstance(int IDi)
        {
            return new LearnConstrucClass(IDi);
        }
    }
}