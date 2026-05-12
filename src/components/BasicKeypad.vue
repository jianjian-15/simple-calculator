<script setup lang="ts">
import { useCalculatorStore } from '../stores/calculator'

const store = useCalculatorStore()

const buttons = [
  { label: 'C', action: () => store.clearAll(), type: 'clear' },
  { label: '±', action: () => store.toggleSign(), type: 'function' },
  { label: '%', action: () => store.calculatePercentage(), type: 'function' },
  { label: '÷', action: () => store.setOperator('/'), type: 'operator' },
  { label: '7', action: () => store.appendNumber('7'), type: 'number' },
  { label: '8', action: () => store.appendNumber('8'), type: 'number' },
  { label: '9', action: () => store.appendNumber('9'), type: 'number' },
  { label: '×', action: () => store.setOperator('*'), type: 'operator' },
  { label: '4', action: () => store.appendNumber('4'), type: 'number' },
  { label: '5', action: () => store.appendNumber('5'), type: 'number' },
  { label: '6', action: () => store.appendNumber('6'), type: 'number' },
  { label: '-', action: () => store.setOperator('-'), type: 'operator' },
  { label: '1', action: () => store.appendNumber('1'), type: 'number' },
  { label: '2', action: () => store.appendNumber('2'), type: 'number' },
  { label: '3', action: () => store.appendNumber('3'), type: 'number' },
  { label: '+', action: () => store.setOperator('+'), type: 'operator' },
  { label: '0', action: () => store.appendNumber('0'), type: 'number', wide: true },
  { label: '.', action: () => store.appendDecimal(), type: 'number' },
  { label: '=', action: () => store.calculateResult(), type: 'equal' }
]
</script>

<template>
  <div class="basic-keypad">
    <button
      v-for="(btn, index) in buttons"
      :key="index"
      :class="[
        'btn',
        `btn-${btn.type}`,
        btn.wide ? 'btn-wide' : ''
      ]"
      @click="btn.action"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<style scoped>
.basic-keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.btn {
  height: 60px;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 500;
  box-shadow: 0 4px 10px var(--shadow);
}

.btn-number {
  background: var(--button-number-bg);
  color: var(--text-primary);
}

.btn-number:hover {
  background: var(--button-number-hover);
  transform: translateY(-2px);
}

.btn-operator {
  background: var(--button-operator-bg);
  color: #ffffff;
}

.btn-operator:hover {
  background: var(--button-operator-hover);
  transform: translateY(-2px);
}

.btn-clear {
  background: var(--button-clear-bg);
  color: #ffffff;
}

.btn-clear:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.btn-function {
  background: var(--button-function-bg);
  color: var(--text-primary);
}

.btn-function:hover {
  background: var(--button-function-hover);
  transform: translateY(-2px);
}

.btn-equal {
  background: var(--button-equal-bg);
  color: #ffffff;
}

.btn-equal:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.btn-wide {
  grid-column: span 2;
}

@media (max-width: 480px) {
  .basic-keypad {
    gap: 8px;
  }

  .btn {
    height: 50px;
    font-size: 20px;
  }
}
</style>
