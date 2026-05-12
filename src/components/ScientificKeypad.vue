<script setup lang="ts">
import { useCalculatorStore } from '../stores/calculator'

const store = useCalculatorStore()

const scientificButtons = [
  { label: 'sin', action: () => store.applyScientificFunction('sin') },
  { label: 'cos', action: () => store.applyScientificFunction('cos') },
  { label: 'tan', action: () => store.applyScientificFunction('tan') },
  { label: 'log', action: () => store.applyScientificFunction('log') },
  { label: 'ln', action: () => store.applyScientificFunction('ln') },
  { label: '√', action: () => store.applyScientificFunction('sqrt') },
  { label: 'x²', action: () => store.applyScientificFunction('square') },
  { label: 'x³', action: () => store.applyScientificFunction('cube') },
  { label: 'n!', action: () => store.applyScientificFunction('factorial') },
  { label: 'π', action: () => store.applyScientificFunction('PI') },
  { label: 'e', action: () => store.applyScientificFunction('E') },
  { label: '1/x', action: () => store.applyScientificFunction('inverse') },
  { label: 'RAD', action: () => store.toggleRadian(), type: 'toggle' },
  { label: 'DEG', action: () => store.toggleRadian(), type: 'toggle' }
]

function getButtonLabel(btn: any): string {
  if (btn.label === 'RAD' || btn.label === 'DEG') {
    return store.isRadian ? 'DEG' : 'RAD'
  }
  return btn.label
}
</script>

<template>
  <div class="scientific-keypad">
    <div class="scientific-grid">
      <button
        v-for="(btn, index) in scientificButtons"
        :key="index"
        class="btn btn-scientific"
        @click="btn.action"
      >
        {{ getButtonLabel(btn) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.scientific-keypad {
  margin-bottom: 15px;
}

.scientific-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.btn-scientific {
  height: 45px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background: var(--button-function-bg);
  color: var(--text-primary);
  box-shadow: 0 2px 6px var(--shadow);
}

.btn-scientific:hover {
  background: var(--button-function-hover);
  transform: translateY(-1px);
}

@media (max-width: 480px) {
  .scientific-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .btn-scientific {
    height: 40px;
    font-size: 12px;
  }
}
</style>
