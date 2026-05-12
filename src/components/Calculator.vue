<script setup lang="ts">
import Display from './Display.vue'
import BasicKeypad from './BasicKeypad.vue'
import ScientificKeypad from './ScientificKeypad.vue'
import HistoryPanel from './HistoryPanel.vue'
import { useCalculatorStore } from '../stores/calculator'
import { useKeyboard } from '../composables/useKeyboard'

const store = useCalculatorStore()
useKeyboard()
</script>

<template>
  <div class="calculator">
    <button
      v-if="!store.isScientific"
      class="mode-toggle"
      @click="store.toggleScientific"
    >
      科学计算
    </button>
    <button
      v-else
      class="mode-toggle mode-toggle-active"
      @click="store.toggleScientific"
    >
      基础计算
    </button>

    <Display
      :expression="store.expression"
      :result="store.displayNumber"
    />

    <ScientificKeypad v-if="store.isScientific" />

    <BasicKeypad />

    <HistoryPanel />
  </div>
</template>

<style scoped>
.calculator {
  background: var(--bg-secondary);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 20px 60px var(--shadow);
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
}

.mode-toggle {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: var(--button-function-bg);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px var(--shadow);
}

.mode-toggle:hover {
  background: var(--button-function-hover);
}

.mode-toggle-active {
  background: var(--accent);
  color: white;
}

@media (max-width: 480px) {
  .calculator {
    padding: 15px;
    border-radius: 16px;
  }

  .mode-toggle {
    padding: 8px;
    font-size: 12px;
  }
}
</style>
