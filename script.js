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
    highlightButton(num);
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
  highlightOperatorButton(operator);
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
  highlightButton('=');
}

function clearAll() {
  currentNumber = '';
  previousNumber = '';
  currentOperator = '';
  updateDisplay();
  highlightButton('C');
}

function deleteLastChar() {
  if (currentNumber.length > 0) {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
  }
}

function toggleSign() {
  if (currentNumber && currentNumber !== '0') {
    if (currentNumber.startsWith('-')) {
      currentNumber = currentNumber.slice(1);
    } else {
      currentNumber = '-' + currentNumber;
    }
    updateDisplay();
  }
}

function appendDecimal() {
  if (!currentNumber.includes('.')) {
    if (currentNumber === '') {
      currentNumber = '0.';
    } else {
      currentNumber += '.';
    }
    updateDisplay();
  }
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

function highlightButton(value) {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (button.textContent === value) {
      button.classList.add('active');
      setTimeout(() => button.classList.remove('active'), 150);
    }
  });
}

function highlightOperatorButton(operator) {
  const symbols = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
  };
  const displaySymbol = symbols[operator];
  const buttons = document.querySelectorAll('.btn-operator');
  buttons.forEach(button => {
    if (button.textContent === displaySymbol) {
      button.classList.add('active');
      setTimeout(() => button.classList.remove('active'), 150);
    }
  });
}

document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (key >= '0' && key <= '9') {
    appendNumber(key);
    event.preventDefault();
  } else if (key === '.') {
    appendDecimal();
    event.preventDefault();
  } else if (key === '+') {
    setOperator('+');
    event.preventDefault();
  } else if (key === '-') {
    setOperator('-');
    event.preventDefault();
  } else if (key === '*') {
    setOperator('*');
    event.preventDefault();
  } else if (key === '/') {
    event.preventDefault();
    if (currentNumber === '') {
      toggleSign();
    } else {
      setOperator('/');
    }
  } else if (key === 'Enter' || key === '=') {
    calculate();
    event.preventDefault();
  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    clearAll();
    event.preventDefault();
  } else if (key === 'Backspace') {
    deleteLastChar();
    event.preventDefault();
  } else if (key === '%') {
    if (currentNumber) {
      currentNumber = (parseFloat(currentNumber) / 100).toString();
      updateDisplay();
    }
    event.preventDefault();
  }
});
