import { onMounted, onUnmounted } from 'vue'
import { useCalculatorStore } from '../stores/calculator'

export function useKeyboard() {
  const store = useCalculatorStore()

  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key

    if (key >= '0' && key <= '9') {
      store.appendNumber(key)
      event.preventDefault()
    } else if (key === '.') {
      store.appendDecimal()
      event.preventDefault()
    } else if (key === '+') {
      store.setOperator('+')
      event.preventDefault()
    } else if (key === '-') {
      store.setOperator('-')
      event.preventDefault()
    } else if (key === '*') {
      store.setOperator('*')
      event.preventDefault()
    } else if (key === '/') {
      event.preventDefault()
      if (store.currentNumber === '') {
        store.toggleSign()
      } else {
        store.setOperator('/')
      }
    } else if (key === 'Enter' || key === '=') {
      store.calculateResult()
      event.preventDefault()
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      store.clearAll()
      event.preventDefault()
    } else if (key === 'Backspace') {
      store.deleteLastChar()
      event.preventDefault()
    } else if (key === '%') {
      store.calculatePercentage()
      event.preventDefault()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
}
