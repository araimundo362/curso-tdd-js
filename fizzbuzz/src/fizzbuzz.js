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
  return n % 3 == 0;
}

function isBuzz(n) {
  return n % 5 == 0;
}

