<script setup lang="ts">
import { useCalculatorStore } from '../stores/calculator'

const store = useCalculatorStore()

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="history-section">
    <div class="history-header">
      <h3>历史记录</h3>
      <button
        v-if="store.history.length > 0"
        class="history-clear-btn"
        @click="store.clearHistory"
      >
        清空
      </button>
    </div>
    <div class="history-list">
      <div v-if="store.history.length === 0" class="history-empty">
        暂无历史记录
      </div>
      <div
        v-for="(item, index) in store.history"
        :key="item.id"
        class="history-item"
        @click="store.useHistoryItem(index)"
      >
        <div class="history-expression">{{ item.expression }} =</div>
        <div class="history-result">{{ item.result }}</div>
        <div class="history-time">{{ formatTime(item.timestamp) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-section {
  margin-top: 20px;
  border-top: 1px solid var(--border-color);
  padding-top: 15px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.history-header h3 {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.history-clear-btn {
  background: transparent;
  color: var(--button-operator-bg);
  font-size: 12px;
  padding: 5px 10px;
  height: auto;
  box-shadow: none;
}

.history-clear-btn:hover {
  background: rgba(233, 69, 96, 0.1);
}

.history-list {
  max-height: 200px;
  overflow-y: auto;
}

.history-empty {
  color: var(--text-secondary);
  font-size: 12px;
  text-align: center;
  padding: 20px 0;
  opacity: 0.6;
}

.history-item {
  background: var(--bg-tertiary);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.history-item:hover {
  background: var(--button-function-hover);
  transform: translateX(5px);
}

.history-item:last-child {
  margin-bottom: 0;
}

.history-expression {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 4px;
}

.history-result {
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 500;
}

.history-time {
  color: var(--text-secondary);
  font-size: 10px;
  margin-top: 4px;
  opacity: 0.7;
}
</style>
