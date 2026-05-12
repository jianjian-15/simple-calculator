# 计算器升级实施计划

**目标：** 将现有纯原生计算器升级为 Vue 3 + Vite + TypeScript 的现代化计算器应用

**架构：** 单页应用（SPA），采用 Composition API 和 Pinia 状态管理

**技术栈：** Vue 3.4+, Vite 5.x, TypeScript 5.x, Pinia 2.x, VueUse 10.x

---

## 文件结构

```
/workspace/
├── package.json              # 项目依赖配置
├── vite.config.ts          # Vite 构建配置
├── tsconfig.json            # TypeScript 配置
├── index.html               # 入口 HTML
├── src/
│   ├── main.ts              # 应用入口
│   ├── App.vue              # 根组件
│   ├── components/
│   │   ├── Calculator.vue   # 主计算器组件
│   │   ├── Display.vue      # 显示屏组件
│   │   ├── BasicKeypad.vue  # 基础按键组件
│   │   ├── ScientificKeypad.vue  # 科学计算按键
│   │   ├── HistoryPanel.vue # 历史记录面板
│   │   └── ThemeSwitcher.vue # 主题切换器
│   ├── stores/
│   │   ├── calculator.ts   # 计算器状态（Pinia）
│   │   └── theme.ts        # 主题状态（Pinia）
│   ├── composables/
│   │   ├── useCalculator.ts  # 计算逻辑
│   │   ├── useKeyboard.ts    # 键盘事件
│   │   └── useLocalStorage.ts # 本地存储
│   ├── utils/
│   │   └── calculator.ts   # 数学计算工具
│   └── styles/
│       ├── variables.css   # CSS 变量
│       └── main.css        # 全局样式
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-05-12-calculator-upgrade-design.md
        └── plans/
            └── 2026-05-12-calculator-upgrade-plan.md
```

---

## 任务清单

### 任务 1: 初始化 Vue 3 + Vite 项目

**文件：**
- 创建: `package.json`
- 创建: `vite.config.ts`
- 创建: `tsconfig.json`
- 创建: `index.html`
- 创建: `src/main.ts`
- 创建: `src/App.vue`

- [ ] **步骤 1: 创建 package.json**

```json
{
  "name": "modern-calculator",
  "version": "3.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix"
  },
  "dependencies": {
    "vue": "^3.4.21",
    "pinia": "^2.1.7",
    "@vueuse/core": "^10.9.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "typescript": "^5.4.2",
    "vite": "^5.1.6",
    "vue-tsc": "^2.0.6"
  }
}
```

- [ ] **步骤 2: 创建 vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    port: 5173,
    host: true
  }
})
```

- [ ] **步骤 3: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **步骤 4: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>现代计算器 v3.0</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **步骤 5: 创建 src/main.ts**

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/variables.css'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

- [ ] **步骤 6: 创建 src/App.vue**

```vue
<script setup lang="ts">
import Calculator from './components/Calculator.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
themeStore.initTheme()
</script>

<template>
  <div class="app-container">
    <ThemeSwitcher />
    <Calculator />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
```

---

### 任务 2: 创建 CSS 变量系统

**文件：**
- 创建: `src/styles/variables.css`
- 创建: `src/styles/main.css`

- [ ] **步骤 1: 创建 src/styles/variables.css**

```css
:root,
:root[data-theme="dark"] {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --bg-tertiary: #0f3460;
  --accent: linear-gradient(135deg, #667eea, #764ba2);
  --accent-solid: #667eea;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --button-number-bg: #1f4068;
  --button-number-hover: #2d5a87;
  --button-operator-bg: #e94560;
  --button-operator-hover: #ff6b6b;
  --button-clear-bg: #e74c3c;
  --button-equal-bg: linear-gradient(135deg, #667eea, #764ba2);
  --button-function-bg: #16213e;
  --button-function-hover: #1f4068;
  --border-color: #0f3460;
  --shadow: rgba(0, 0, 0, 0.3);
  --glass-bg: rgba(22, 33, 62, 0.8);
  --glass-blur: blur(20px);
}

:root[data-theme="light"] {
  --bg-primary: #f0f2f5;
  --bg-secondary: #ffffff;
  --bg-tertiary: #e8ecf1;
  --accent: linear-gradient(135deg, #667eea, #764ba2);
  --accent-solid: #667eea;
  --text-primary: #1a1a2e;
  --text-secondary: #666666;
  --button-number-bg: #e8ecf1;
  --button-number-hover: #dde1e7;
  --button-operator-bg: #667eea;
  --button-operator-hover: #7b8ff0;
  --button-clear-bg: #e74c3c;
  --button-equal-bg: linear-gradient(135deg, #667eea, #764ba2);
  --button-function-bg: #e8ecf1;
  --button-function-hover: #dde1e7;
  --border-color: #dde1e7;
  --shadow: rgba(0, 0, 0, 0.1);
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-blur: blur(20px);
}

:root[data-theme="glass"] {
  --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --bg-secondary: rgba(255, 255, 255, 0.15);
  --bg-tertiary: rgba(255, 255, 255, 0.1);
  --accent: linear-gradient(135deg, #ffffff, #f0f0f0);
  --accent-solid: #ffffff;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --button-number-bg: rgba(255, 255, 255, 0.2);
  --button-number-hover: rgba(255, 255, 255, 0.3);
  --button-operator-bg: rgba(233, 69, 96, 0.8);
  --button-operator-hover: #e94560;
  --button-clear-bg: rgba(231, 76, 60, 0.8);
  --button-equal-bg: rgba(255, 255, 255, 0.9);
  --button-function-bg: rgba(255, 255, 255, 0.15);
  --button-function-hover: rgba(255, 255, 255, 0.25);
  --border-color: rgba(255, 255, 255, 0.2);
  --shadow: rgba(0, 0, 0, 0.2);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-blur: blur(20px);
}

:root[data-theme="gradient"] {
  --bg-primary: linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%);
  --bg-secondary: rgba(255, 255, 255, 0.9);
  --bg-tertiary: rgba(255, 255, 255, 0.7);
  --accent: linear-gradient(135deg, #ff6b6b, #feca57);
  --accent-solid: #ff6b6b;
  --text-primary: #1a1a2e;
  --text-secondary: #666666;
  --button-number-bg: #ffffff;
  --button-number-hover: #f0f0f0;
  --button-operator-bg: #ff6b6b;
  --button-operator-hover: #ff5252;
  --button-clear-bg: #e74c3c;
  --button-equal-bg: linear-gradient(135deg, #ff6b6b, #feca57);
  --button-function-bg: #f0f0f0;
  --button-function-hover: #e0e0e0;
  --border-color: rgba(0, 0, 0, 0.1);
  --shadow: rgba(0, 0, 0, 0.15);
  --glass-bg: rgba(255, 255, 255, 0.5);
  --glass-blur: blur(10px);
}
```

- [ ] **步骤 2: 创建 src/styles/main.css**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s ease, color 0.3s ease;
}

#app {
  width: 100%;
  min-height: 100vh;
}

button {
  font-family: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--button-number-hover);
}
```

---

### 任务 3: 创建 Pinia Stores

**文件：**
- 创建: `src/stores/theme.ts`
- 创建: `src/stores/calculator.ts`

- [ ] **步骤 1: 创建 src/stores/theme.ts**

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export type ThemeType = 'dark' | 'light' | 'glass' | 'gradient'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = useLocalStorage<ThemeType>('calculator-theme', 'dark')
  const isMenuOpen = ref(false)

  function setTheme(theme: ThemeType) {
    currentTheme.value = theme
    applyTheme(theme)
  }

  function applyTheme(theme: ThemeType) {
    document.documentElement.setAttribute('data-theme', theme)
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function initTheme() {
    applyTheme(currentTheme.value)
  }

  return {
    currentTheme,
    isMenuOpen,
    setTheme,
    toggleMenu,
    initTheme
  }
})
```

- [ ] **步骤 2: 创建 src/stores/calculator.ts**

```typescript
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
```

---

### 任务 4: 创建工具函数

**文件：**
- 创建: `src/utils/calculator.ts`

- [ ] **步骤 1: 创建 src/utils/calculator.ts**

```typescript
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
```

---

### 任务 5: 创建 Display 组件

**文件：**
- 创建: `src/components/Display.vue`

- [ ] **步骤 1: 创建 src/components/Display.vue**

```vue
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
```

---

### 任务 6: 创建基础按键组件

**文件：**
- 创建: `src/components/BasicKeypad.vue`

- [ ] **步骤 1: 创建 src/components/BasicKeypad.vue**

```vue
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
```

---

### 任务 7: 创建科学计算按键组件

**文件：**
- 创建: `src/components/ScientificKeypad.vue`

- [ ] **步骤 1: 创建 src/components/ScientificKeypad.vue**

```vue
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
```

---

### 任务 8: 创建历史记录面板组件

**文件：**
- 创建: `src/components/HistoryPanel.vue`

- [ ] **步骤 1: 创建 src/components/HistoryPanel.vue**

```vue
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
```

---

### 任务 9: 创建主题切换器组件

**文件：**
- 创建: `src/components/ThemeSwitcher.vue`

- [ ] **步骤 1: 创建 src/components/ThemeSwitcher.vue**

```vue
<script setup lang="ts">
import { useThemeStore, type ThemeType } from '../stores/theme'

const themeStore = useThemeStore()

const themes: { key: ThemeType; label: string; icon: string }[] = [
  { key: 'dark', label: '深色', icon: '🌙' },
  { key: 'light', label: '浅色', icon: '☀️' },
  { key: 'glass', label: '玻璃', icon: '✨' },
  { key: 'gradient', label: '渐变', icon: '🌈' }
]
</script>

<template>
  <div class="theme-switcher">
    <button class="theme-btn" @click="themeStore.toggleMenu">
      🎨
    </button>
    <div v-if="themeStore.isMenuOpen" class="theme-menu">
      <button
        v-for="theme in themes"
        :key="theme.key"
        :class="['theme-option', { active: themeStore.currentTheme === theme.key }]"
        @click="themeStore.setTheme(theme.key)"
      >
        <span class="theme-icon">{{ theme.icon }}</span>
        <span class="theme-label">{{ theme.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.theme-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bg-secondary);
  font-size: 24px;
  box-shadow: 0 4px 15px var(--shadow);
  border: 2px solid var(--border-color);
}

.theme-btn:hover {
  transform: scale(1.1);
}

.theme-menu {
  position: absolute;
  top: 60px;
  right: 0;
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 8px 30px var(--shadow);
  border: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 8px;
  background: transparent;
  color: var(--text-primary);
  font-size: 14px;
  text-align: left;
}

.theme-option:hover {
  background: var(--button-function-hover);
}

.theme-option.active {
  background: var(--accent);
  color: white;
}

.theme-icon {
  font-size: 18px;
}

.theme-label {
  font-weight: 500;
}

@media (max-width: 480px) {
  .theme-switcher {
    top: 10px;
    right: 10px;
  }

  .theme-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .theme-menu {
    top: 50px;
  }
}
</style>
```

---

### 任务 10: 创建主计算器组件

**文件：**
- 创建: `src/components/Calculator.vue`
- 创建: `src/composables/useKeyboard.ts`

- [ ] **步骤 1: 创建 src/composables/useKeyboard.ts**

```typescript
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
```

- [ ] **步骤 2: 创建 src/components/Calculator.vue**

```vue
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
```

---

### 任务 11: 创建类型声明文件

**文件：**
- 创建: `src/vite-env.d.ts`

- [ ] **步骤 1: 创建 src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

---

### 任务 12: 创建 GitHub Actions 部署配置

**文件：**
- 创建: `.github/workflows/deploy.yml`

- [ ] **步骤 1: 创建 .github/workflows/deploy.yml**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### 任务 13: 安装依赖并测试

- [ ] **步骤 1: 安装依赖**

```bash
npm install
```

- [ ] **步骤 2: 启动开发服务器**

```bash
npm run dev
```

- [ ] **步骤 3: 构建生产版本**

```bash
npm run build
```

---

## 规格覆盖检查

### 功能覆盖
- ✅ 基础计算（四则运算）
- ✅ 百分比计算
- ✅ 正负切换
- ✅ 删除功能
- ✅ 科学计算模式（三角函数、对数、指数、阶乘）
- ✅ 主题切换（4种主题）
- ✅ 历史记录（50条、持久化）
- ✅ 键盘支持
- ✅ 响应式设计

### 技术覆盖
- ✅ Vue 3 + Composition API
- ✅ TypeScript 类型安全
- ✅ Pinia 状态管理
- ✅ VueUse 工具库
- ✅ Vite 构建优化
- ✅ CSS Variables 主题系统
- ✅ 现代设计潮流

---

## 实施摘要

本计划包含 **13 个任务**，涵盖：
1. 项目初始化和配置
2. CSS 变量系统和主题
3. Pinia 状态管理
4. 工具函数库
5. Vue 组件开发（6个组件）
6. 键盘事件处理
7. GitHub Actions CI/CD
8. 测试和部署

每个任务都是独立的，可以按顺序实施。完成所有任务后，你将拥有一个功能完整、设计现代的 Vue 3 计算器应用。

---

**下一步操作：**
1. 运行 `npm install` 安装依赖
2. 运行 `npm run dev` 启动开发服务器
3. 访问 http://localhost:5173 查看效果
4. 测试所有功能：基础计算、科学计算、主题切换、历史记录、键盘操作
5. 运行 `npm run build` 构建生产版本
6. 推送到 GitHub 触发自动部署
