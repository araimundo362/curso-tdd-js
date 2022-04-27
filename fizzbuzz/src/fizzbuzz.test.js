import fizzbuzz from "./fizzbuzz";


//1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz ... etc up to 100

describe("FizzBuzz", () => {

  test("There are 100 numbers", () => {
    const numbers = fizzbuzz();
  
    expect(numbers.length).toBe(100);
  });

  test.each([13, 23, 31, 73, 83])
  ( "%i is fizz because it has a three", (num) => {
    const numbers = fizzbuzz();
    expect(numbers[num-1]).toBe("Fizz");
  
  })

  test.each([52, 56, 58, 59])
  ("%i is Buzz because it has a five", (num) => {
    const numbers = fizzbuzz();

    expect(numbers[num-1]).toBe("Buzz");
  });

  test.each([35, 53])
  ("%i is fizzBuzz if it has a three & five", (num) => {
    // const hasThreeFive = [30, 15, 45, 60, 75];
    const numbers = fizzbuzz();

    expect(numbers[num-1]).toBe("FizzBuzz");
  
  })

  test.each([54, 57, 51])
  ("%i is fizzBuzz because it has a five and is multiple of 3", (num) => {
    const numbers = fizzbuzz();

    expect(numbers[num-1]).toBe("FizzBuzz");
  
  })
})

