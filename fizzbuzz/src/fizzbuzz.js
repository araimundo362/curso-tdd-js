/* 
A number is Fizz if it has a 3 in it: 13, 18,23,{30: -35,30}...,63, 43,73, 83,93

A number is Buzz if it has a 5 in it: 25, 50, 55, 95,

A number is FizzBuzz if: 35, 53, 45, 54, 30, 75, 57, 51

it has a 3 in it

it has a 5 in it

The previous requirements are still correct. */

export default () => {
  const numbers = [];

  for(let n = 1; n <= 100; n++) {

    let transformedNumber = transform(n);

    numbers.push(transformedNumber);

  }
  return numbers;
}

function transform(number) {

  if (isBuzz(number) && isFizz(number)) {

    return 'FizzBuzz';

  } 
  
  if (isFizz(number)) {

    return 'Fizz';

  } 
  
  if (isBuzz(number)) {

    return 'Buzz';

  } 

  return number;
}

function isFizz(n) {
  return n % 3 == 0 || String(n).includes("3");
}

function isBuzz(n) {
  return n % 5 == 0 || String(n).includes("5");
}

