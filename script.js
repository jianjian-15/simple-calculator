let currentNumber = '';
let previousNumber = '';
let currentOperator = '';

function updateDisplay() {
  const expression = document.getElementById('expression');
  const result = document.getElementById('result');

  if (currentOperator && previousNumber) {
    expression.textContent = `${previousNumber} ${getOperatorSymbol(currentOperator)} ${currentNumber || ''}`;
  } else if (currentNumber) {
    expression.textContent = currentNumber;
  } else {
    expression.textContent = '';
  }

  result.textContent = currentNumber || '0';
}

function appendNumber(num) {
  if (currentNumber.length < 12) {
    currentNumber += num;
    updateDisplay();
  }
}

function setOperator(operator) {
  if (!currentNumber && !previousNumber) return;

  if (currentNumber && previousNumber && currentOperator) {
    calculate();
  }

  currentOperator = operator;
  previousNumber = currentNumber;
  currentNumber = '';
  updateDisplay();
}

function calculate() {
  if (!previousNumber || !currentNumber || !currentOperator) return;

  const num1 = parseFloat(previousNumber);
  const num2 = parseFloat(currentNumber);
  let result;

  switch (currentOperator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num2 !== 0 ? num1 / num2 : 'Error';
      break;
    default:
      return;
  }

  currentNumber = result.toString();
  previousNumber = '';
  currentOperator = '';

  document.getElementById('result').textContent = currentNumber;
  document.getElementById('expression').textContent = '';
}

function clearAll() {
  currentNumber = '';
  previousNumber = '';
  currentOperator = '';
  updateDisplay();
}

function getOperatorSymbol(operator) {
  const symbols = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
  };
  return symbols[operator] || operator;
}
