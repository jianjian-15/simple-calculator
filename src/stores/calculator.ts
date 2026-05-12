import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export interface HistoryItem {
  id: string
  expression: string
  result: string
  timestamp: number
}

export const useCalculatorStore = defineStore('calculator', () => {
  const currentNumber = ref('')
  const previousNumber = ref('')
  const operator = ref<string | null>(null)
  const expression = ref('')
  const isResult = ref(false)
  const isScientific = ref(false)
  const isRadian = ref(true)

  const history = useLocalStorage<HistoryItem[]>('calculator-history', [])

  const displayNumber = computed(() => {
    if (isResult.value) {
      return previousNumber.value || '0'
    }
    return currentNumber.value || '0'
  })

  function appendNumber(num: string) {
    if (isResult.value) {
      currentNumber.value = num
      isResult.value = false
    } else {
      if (currentNumber.value.length < 12) {
        currentNumber.value += num
      }
    }
  }

  function setOperator(op: string) {
    if (!currentNumber.value && !previousNumber.value) return

    if (currentNumber.value && previousNumber.value && operator.value) {
      calculateResult()
    }

    operator.value = op
    previousNumber.value = currentNumber.value
    currentNumber.value = ''
    expression.value = `${previousNumber.value} ${getOperatorSymbol(op)}`
  }

  function calculateResult() {
    if (!previousNumber.value || !currentNumber.value || !operator.value) return

    const num1 = parseFloat(previousNumber.value)
    const num2 = parseFloat(currentNumber.value)
    let result: number | string

    switch (operator.value) {
      case '+':
        result = num1 + num2
        break
      case '-':
        result = num1 - num2
        break
      case '*':
        result = num1 * num2
        break
      case '/':
        result = num2 !== 0 ? num1 / num2 : 'Error'
        break
      default:
        return
    }

    const expressionText = `${num1} ${getOperatorSymbol(operator.value)} ${num2}`
    const resultText = typeof result === 'number' ? formatNumber(result) : result

    addToHistory({
      id: Date.now().toString(),
      expression: expressionText,
      result: resultText,
      timestamp: Date.now()
    })

    previousNumber.value = resultText
    currentNumber.value = ''
    operator.value = null
    expression.value = ''
    isResult.value = true
  }

  function formatNumber(num: number): string {
    if (Number.isInteger(num) && Math.abs(num) < 1e12) {
      return num.toString()
    }
    return parseFloat(num.toPrecision(10)).toString()
  }

  function getOperatorSymbol(op: string): string {
    const symbols: Record<string, string> = {
      '+': '+',
      '-': '-',
      '*': '×',
      '/': '÷'
    }
    return symbols[op] || op
  }

  function clearAll() {
    currentNumber.value = ''
    previousNumber.value = ''
    operator.value = null
    expression.value = ''
    isResult.value = false
  }

  function deleteLastChar() {
    if (currentNumber.value) {
      currentNumber.value = currentNumber.value.slice(0, -1)
    }
  }

  function toggleSign() {
    if (currentNumber.value && currentNumber.value !== '0') {
      if (currentNumber.value.startsWith('-')) {
        currentNumber.value = currentNumber.value.slice(1)
      } else {
        currentNumber.value = '-' + currentNumber.value
      }
    }
  }

  function appendDecimal() {
    if (!currentNumber.value.includes('.')) {
      if (currentNumber.value === '') {
        currentNumber.value = '0.'
      } else {
        currentNumber.value += '.'
      }
    }
  }

  function calculatePercentage() {
    if (currentNumber.value) {
      const value = parseFloat(currentNumber.value) / 100
      currentNumber.value = formatNumber(value)
    }
  }

  function applyScientificFunction(fn: string) {
    if (!currentNumber.value && fn !== 'PI' && fn !== 'E') return

    let value = parseFloat(currentNumber.value)
    let result: number

    switch (fn) {
      case 'sin':
        result = isRadian.value ? Math.sin(value) : Math.sin((value * Math.PI) / 180)
        break
      case 'cos':
        result = isRadian.value ? Math.cos(value) : Math.cos((value * Math.PI) / 180)
        break
      case 'tan':
        result = isRadian.value ? Math.tan(value) : Math.tan((value * Math.PI) / 180)
        break
      case 'log':
        result = Math.log10(value)
        break
      case 'ln':
        result = Math.log(value)
        break
      case 'sqrt':
        result = Math.sqrt(value)
        break
      case 'cbrt':
        result = Math.cbrt(value)
        break
      case 'square':
        result = value * value
        break
      case 'cube':
        result = value * value * value
        break
      case 'factorial':
        result = factorial(value)
        break
      case 'abs':
        result = Math.abs(value)
        break
      case 'PI':
        currentNumber.value = Math.PI.toString()
        return
      case 'E':
        currentNumber.value = Math.E.toString()
        return
      case 'exp':
        currentNumber.value = Math.exp(value).toString()
        return
      case 'inverse':
        currentNumber.value = formatNumber(1 / value)
        return
      default:
        return
    }

    currentNumber.value = formatNumber(result)
  }

  function factorial(n: number): number {
    if (n < 0) return NaN
    if (n === 0 || n === 1) return 1
    if (n > 170) return Infinity
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  function toggleScientific() {
    isScientific.value = !isScientific.value
  }

  function toggleRadian() {
    isRadian.value = !isRadian.value
  }

  function addToHistory(item: HistoryItem) {
    history.value.unshift(item)
    if (history.value.length > 50) {
      history.value.pop()
    }
  }

  function useHistoryItem(index: number) {
    const item = history.value[index]
    if (item && item.result !== 'Error') {
      previousNumber.value = ''
      operator.value = null
      currentNumber.value = item.result
      expression.value = ''
      isResult.value = true
    }
  }

  function clearHistory() {
    history.value = []
  }

  return {
    currentNumber,
    previousNumber,
    operator,
    expression,
    isResult,
    isScientific,
    isRadian,
    history,
    displayNumber,
    appendNumber,
    setOperator,
    calculateResult,
    clearAll,
    deleteLastChar,
    toggleSign,
    appendDecimal,
    calculatePercentage,
    applyScientificFunction,
    toggleScientific,
    toggleRadian,
    useHistoryItem,
    clearHistory
  }
})
