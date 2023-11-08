using System;
using Lecture_1;

namespace Lecture_2
{
    class InternalTest
    {
            public void InternalTesting()
            {
                MainProgramClass.PrintToScreenRecorder cobaScreen = new MainProgramClass.PrintToScreenRecorder();
                cobaScreen.PrintToScreenInternal();
                MainProgramClass.PrintWithoutStaticClass();
            }

    }
} 



