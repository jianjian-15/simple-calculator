<script setup lang="ts">
defineProps<{
  expression: string
  result: string
}>()
</script>

<template>
  <div class="display">
    <div class="input-display">{{ expression }}</div>
    <div class="result-display">{{ result }}</div>
  </div>
</template>

<style scoped>
.display {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px var(--shadow);
}

.input-display {
  color: var(--text-secondary);
  font-size: 18px;
  min-height: 24px;
  word-wrap: break-word;
  word-break: break-all;
  text-align: right;
  width: 100%;
}

.result-display {
  color: var(--text-primary);
  font-size: 42px;
  font-weight: 300;
  margin-top: 10px;
  word-wrap: break-word;
  word-break: break-all;
  text-align: right;
  width: 100%;
}

@media (max-width: 480px) {
  .display {
    padding: 15px;
    min-height: 80px;
  }

  .result-display {
    font-size: 36px;
  }

  .input-display {
    font-size: 16px;
  }
}
</style>
