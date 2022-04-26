import fizzbuzz from "./fizzbuzz";


//1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz ... etc up to 100

describe("FizzBuzz", () => {

  test("The number in the first position to be 1", () => {
    const numbers = fizzbuzz();
  
    expect(numbers[0]).toBe(1);
  });
  
  test("The number in the second position to be 2", () => {
    const numbers = fizzbuzz();
  
    expect(numbers[1]).toBe(2);
  });
  
  test("The number in the third position is Fizz", () => {
    const numbers = fizzbuzz();
  
    expect(numbers[2]).toBe("Fizz");
  });

  test("The number in the fifth position is Buzz", () => {
    const numbers = fizzbuzz();
  
    expect(numbers[4]).toBe("Buzz");
  });

  test("The number in the sixth position is Fizz", () => {
    const numbers = fizzbuzz();
  
    expect(numbers[5]).toBe("Fizz");
  });

  test("The number in the tenth position is Buzz", () => {
    const numbers = fizzbuzz();
  
    expect(numbers[9]).toBe("Buzz");
  });

  test("The number in the 15th position is FizzBuzz", () => {
    const numbers = fizzbuzz();
  
    expect(numbers[14]).toBe("FizzBuzz");
  });

  test("There are 100 numbers", () => {
    const numbers = fizzbuzz();
  
    expect(numbers.length).toBe(100);
  });

})

