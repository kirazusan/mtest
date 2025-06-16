

package com.example;

import org.junit.Test;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import static org.junit.Assert.assertEquals;

public class HelloWorldTest {

    @Test
    public void testHelloWorld() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
        HelloWorld.hello();
        assertEquals("Hello World!\n", outContent.toString());
    }
}

package com.example;

public class HelloWorld {

    public static void hello() {
        System.out.println("Hello World!");
    }
}