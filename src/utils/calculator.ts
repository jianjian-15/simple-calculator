export function formatNumber(num: number): string {
  if (Number.isInteger(num) && Math.abs(num) < 1e12) {
    return num.toString()
  }
  return parseFloat(num.toPrecision(10)).toString()
}

export function factorial(n: number): number {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  if (n > 170) return Infinity
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

export function performOperation(
  num1: number,
  num2: number,
  operator: string,
  isRadian: boolean = true
): number | string {
  switch (operator) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case '*':
      return num1 * num2
    case '/':
      return num2 !== 0 ? num1 / num2 : 'Error'
    case 'pow':
      return Math.pow(num1, num2)
    case 'sin':
      return isRadian ? Math.sin(num2) : Math.sin((num2 * Math.PI) / 180)
    case 'cos':
      return isRadian ? Math.cos(num2) : Math.cos((num2 * Math.PI) / 180)
    case 'tan':
      return isRadian ? Math.tan(num2) : Math.tan((num2 * Math.PI) / 180)
    case 'log':
      return Math.log10(num2)
    case 'ln':
      return Math.log(num2)
    case 'sqrt':
      return Math.sqrt(num2)
    default:
      return 'Error'
  }
}

export function getOperatorSymbol(operator: string): string {
  const symbols: Record<string, string> = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷',
    'pow': '^'
  }
  return symbols[operator] || operator
}
