# 计算器升级技术规格文档

**版本：** v3.0.0
**日期：** 2026-05-12
**作者：** AI Assistant

---

## 1. 项目概述

### 1.1 项目背景
将现有的纯原生网页计算器升级为基于 Vue 3 + Vite 的现代化计算器应用。

### 1.2 项目目标
- ✅ 技术栈升级：从原生 HTML/CSS/JS 迁移到 Vue 3 + TypeScript
- ✅ 功能增强：添加科学计算、主题切换、本地持久化
- ✅ 视觉升级：采用现代潮流设计语言
- ✅ 代码质量：类型安全、组件化、可维护

### 1.3 技术栈
- **框架：** Vue 3.4+ (Composition API)
- **构建工具：** Vite 5.x
- **语言：** TypeScript 5.x
- **状态管理：** Pinia 2.x
- **工具库：** VueUse 10.x

---

## 2. 功能规格

### 2.1 基础计算功能

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 数字输入 | 支持 0-9 和小数点 | P0 |
| 四则运算 | 加减乘除 | P0 |
| 等号计算 | 执行运算并显示结果 | P0 |
| 清空 | 清除所有输入 | P0 |
| 删除 | 删除最后一个字符 | P1 |
| 正负切换 | 切换正负号 | P1 |
| 百分比 | 计算百分比 | P1 |
| 连续运算 | 支持链式计算 | P1 |

### 2.2 科学计算功能

| 功能 | 描述 | 快捷键 | 优先级 |
|------|------|--------|--------|
| 平方 | x² | ^2 | P0 |
| 立方 | x³ | ^3 | P1 |
| 幂运算 | xʸ | ^ | P0 |
| 平方根 | √x | S | P0 |
| 立方根 | ³√x | - | P1 |
| 阶乘 | n! | ! | P1 |
| 绝对值 | |x| | A | P2 |
| 三角函数 | sin, cos, tan | - | P0 |
| 反三角函数 | asin, acos, atan | - | P1 |
| 对数 | log₁₀, ln | L | P0 |
| 指数 | eˣ, 10ˣ | E | P1 |
| 常量 | π, e | P | P1 |
| 角度/弧度 | 切换模式 | R | P0 |
| 括号 | () | ( ) | P0 |

### 2.3 主题系统

| 主题 | 描述 | 优先级 |
|------|------|--------|
| 深色主题 | 默认深色，紫色渐变 | P0 |
| 浅色主题 | 亮色背景，柔和配色 | P1 |
| 玻璃主题 | 毛玻璃效果，半透明 | P2 |
| 渐变主题 | 渐变背景，活力配色 | P2 |

### 2.4 历史记录

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 保存历史 | 自动保存最近 50 条 | P0 |
| 显示时间 | 显示每条记录的时间 | P1 |
| 复用结果 | 点击历史可复用 | P0 |
| 清空历史 | 一键清空所有历史 | P1 |
| 持久化 | 存储到 localStorage | P0 |

---

## 3. 数据结构

### 3.1 计算器状态

```typescript
interface CalculatorState {
  currentNumber: string;      // 当前输入
  previousNumber: string;      // 之前的数字
  operator: string | null;     // 当前运算符
  expression: string;         // 显示的表达式
  isResult: boolean;          // 是否刚计算完
  isScientific: boolean;       // 科学计算模式
  isRadian: boolean;          // 角度/弧度模式
  history: HistoryItem[];      // 历史记录
}

interface HistoryItem {
  id: string;                 // 唯一 ID
  expression: string;         // 表达式
  result: string;             // 结果
  timestamp: number;          // 时间戳
}
```

### 3.2 主题状态

```typescript
interface ThemeState {
  currentTheme: 'dark' | 'light' | 'glass' | 'gradient';
  isMenuOpen: boolean;
}
```

---

## 4. 组件设计

### 4.1 Calculator.vue
**职责：** 主容器组件，协调所有子组件
**状态：** 从 Pinia Store 获取
**事件：** 处理所有业务逻辑

### 4.2 Display.vue
**职责：** 显示屏展示
**属性：**
- `expression: string` - 表达式文本
- `result: string` - 结果文本
**样式：** 右侧对齐，溢出省略

### 4.3 BasicKeypad.vue
**职责：** 基础计算按键
**布局：** 4列网格
**事件：** 触发计算器逻辑

### 4.4 ScientificKeypad.vue
**职责：** 科学计算按键
**布局：** 可折叠面板
**分组：** 三角函数、对数、指数、常用

### 4.5 HistoryPanel.vue
**职责：** 历史记录面板
**功能：** 展示、复用、清空历史
**样式：** 可滚动列表

### 4.6 ThemeSwitcher.vue
**职责：** 主题切换器
**样式：** 下拉菜单或图标按钮
**功能：** 切换 4 种主题

---

## 5. 键盘支持

| 按键 | 功能 |
|------|------|
| 0-9 | 数字输入 |
| . | 小数点 |
| + - * / | 四则运算 |
| Enter / = | 计算结果 |
| Backspace | 删除 |
| Escape / C | 清空 |
| % | 百分比 |
| ^ | 幂运算 |
| S | 平方根 |
| L | 对数 |
| ( ) | 括号 |
| Shift + 函数 | 反函数 |

---

## 6. 样式规范

### 6.1 色彩系统

```css
/* 深色主题 */
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
  --button-equal-bg: #667eea;
  --border-color: #0f3460;
  --shadow: rgba(0, 0, 0, 0.3);
}

/* 浅色主题 */
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
  --button-equal-bg: #667eea;
  --border-color: #dde1e7;
  --shadow: rgba(0, 0, 0, 0.1);
}
```

### 6.2 动画规范

| 动画 | 时长 | 缓动 | 触发 |
|------|------|------|------|
| 按钮按下 | 150ms | ease-out | 点击 |
| 按钮悬停 | 200ms | ease | 悬停 |
| 主题切换 | 300ms | ease-out | 切换 |
| 历史展开 | 200ms | ease-out | 操作 |

### 6.3 响应式断点

| 设备 | 宽度 | 布局 |
|------|------|------|
| 桌面 | > 768px | 完整科学计算器 |
| 平板 | 480-768px | 自适应宽度 |
| 移动 | < 480px | 紧凑布局 |

---

## 7. 性能要求

- 首屏加载 < 1s
- 交互响应 < 50ms
- 无布局偏移（CLS < 0.1）
- 支持离线使用（PWA）

---

## 8. 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 9. 部署

- **GitHub Pages：** Vite 静态部署
- **域名：** 保留原有域名
- **CI/CD：** GitHub Actions 自动部署
