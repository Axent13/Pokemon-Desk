// Задача #1

const firstRow = prompt('Введите первую строку:');
const secondRow = prompt('Введите вторую строку:');

function getRow(firstRow, secondRow) {
  let firstRowLettersCounter = 0;
  let secondRowLettersCounter = 0;
  const requiredLetter = prompt('Введите искомый символ:');

  for (let i = 0; i < firstRow.length; i++) {
    if (firstRow.charAt(i) === requiredLetter) {
      firstRowLettersCounter++;
    };
  }

  for (let i = 0; i < secondRow.length; i++) {
    if (secondRow.charAt(i) === requiredLetter) {
      secondRowLettersCounter++;
    };
  }

  if (firstRowLettersCounter > secondRowLettersCounter) {
    alert(firstRow);
    return firstRow;
  } else if (firstRowLettersCounter === secondRowLettersCounter) {
    alert('В обеих строках число искомых символов одинаково!');
    return 'В обеих строках число искомых символов одинаково!';
  } else {
    alert(secondRow);
    return secondRow;
  }
}

console.log(getRow(firstRow, secondRow));