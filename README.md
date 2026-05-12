# 🧮 现代计算器 v3.0

一个功能强大、美观实用的网页计算器，支持科学计算、多主题切换和本地存储持久化。

**在线访问：** https://jianjian-15.github.io/simple-calculator/

## ✨ 功能特点

### 🎨 多主题系统
- **深色主题** - 默认的护眼深色模式
- **浅色主题** - 明亮清新的浅色模式
- **玻璃拟态** - 半透明的玻璃质感
- **渐变主题** - 活力四射的渐变配色
- 一键切换，自动保存用户偏好

### 🔢 基本运算
- **加法 (+)**：两个数相加
- **减法 (-)**：两个数相减
- **乘法 (×)**：两个数相乘
- **除法 (÷)**：两个数相除
- **百分比 (%)**：百分比计算
- **正负号 (±)**：快速切换正负
- **小数点 (.)**：支持小数运算

### 🔬 科学计算模式
- **三角函数**：sin、cos、tan（支持角度/弧度切换）
- **对数函数**：log（常用对数）、ln（自然对数）
- **幂运算**：x²（平方）、x³（立方）
- **根运算**：√（平方根）、³√（立方根）
- **阶乘**：n!
- **常数**：π（圆周率）、e（自然常数）
- **倒数**：1/x
- **绝对值**：|x|

### ⌨️ 键盘支持
支持完整的键盘操作，无需使用鼠标即可完成计算：

| 按键 | 功能 |
|------|------|
| `0-9` | 输入数字 |
| `.` | 输入小数点 |
| `+` `-` `*` `/` | 四则运算 |
| `Enter` 或 `=` | 计算结果 |
| `Backspace` | 删除最后一个字符 |
| `Escape` 或 `C` | 清空所有输入 |
| `%` | 百分比计算 |

### 📜 历史记录
- 自动保存最近的 50 条计算记录
- 点击历史记录可快速复用结果
- 支持一键清空历史
- 显示每条记录的计算时间
- 本地存储持久化，刷新页面不丢失

### 📱 响应式设计
- 完美适配桌面端
- 友好的移动端体验
- 流畅的动画过渡效果
- 优雅的按钮交互反馈

## 🚀 使用方法

### 方式一：在线使用
直接访问 https://jianjian-15.github.io/simple-calculator/

### 方式二：本地开发

1. 克隆仓库到本地
```bash
git clone https://github.com/jianjian-15/simple-calculator.git
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

5. 预览构建结果
```bash
npm run preview
```

### 基本操作示例

**计算 25 + 13：**
1. 点击 `2` `5`
2. 点击 `+`
3. 点击 `1` `3`
4. 点击 `=`
5. 结果显示 `38`

**使用科学计算（求√16）：**
1. 点击「科学计算」切换到科学模式
2. 点击 `1` `6`
3. 点击 `√`
4. 结果显示 `4`

**切换主题：**
1. 点击右上角的 🎨 按钮
2. 选择喜欢的主题

**使用历史记录：**
1. 完成一次计算后，结果会自动保存到历史记录
2. 点击任意历史记录条目，可将结果应用到当前输入

**键盘操作示例：**
1. 按 `1` `0` `0` 输入数字 100
2. 按 `*` 选择乘法
3. 按 `5` 输入数字 5
4. 按 `Enter` 计算，结果显示 `500`

## 🛠️ 技术栈

- **Vue 3.4** - 渐进式 JavaScript 框架
- **Vite 5** - 下一代前端构建工具
- **TypeScript 5** - JavaScript 的超集，类型安全
- **Pinia 2** - Vue 的状态管理库
- **VueUse 10** - Vue 组合式工具函数库
- **Composition API** - Vue 3 组合式 API
- **CSS Variables** - CSS 变量实现主题系统
- **localStorage** - 本地存储持久化

## 📂 项目结构

```
simple-calculator/
├── public/              # 静态资源
├── src/
│   ├── components/      # Vue 组件
│   │   ├── Calculator.vue       # 主计算器组件
│   │   ├── Display.vue          # 显示屏组件
│   │   ├── BasicKeypad.vue      # 基础按键组件
│   │   ├── ScientificKeypad.vue # 科学计算按键
│   │   ├── HistoryPanel.vue     # 历史记录面板
│   │   └── ThemeSwitcher.vue    # 主题切换器
│   ├── stores/          # Pinia 状态管理
│   │   ├── calculator.ts        # 计算器状态
│   │   └── theme.ts             # 主题状态
│   ├── composables/     # 组合式函数
│   │   └── useKeyboard.ts       # 键盘事件
│   ├── utils/           # 工具函数
│   │   └── calculator.ts        # 计算工具
│   ├── styles/          # 全局样式
│   │   ├── variables.css        # CSS 变量
│   │   └── main.css             # 主样式
│   ├── App.vue         # 根组件
│   └── main.ts         # 应用入口
├── .github/
│   └── workflows/       # GitHub Actions
│       └── deploy.yml           # 自动部署配置
├── index.html          # HTML 入口
├── vite.config.ts      # Vite 配置
├── tsconfig.json       # TypeScript 配置
├── package.json        # 项目配置
└── README.md           # 项目文档
```

## 🔧 开发说明

### 添加新主题

1. 在 `src/styles/variables.css` 中添加新的 CSS 变量
2. 在 `src/stores/theme.ts` 中添加主题类型定义
3. 在 `src/components/ThemeSwitcher.vue` 中添加主题选项

### 添加新的科学计算功能

1. 在 `src/stores/calculator.ts` 中添加新的计算方法
2. 在 `src/components/ScientificKeypad.vue` 中添加对应的按钮

## 📝 更新日志

### v3.0.0 (2026-05-12)
- 🎉 技术栈全面升级到 Vue 3 + Vite + TypeScript
- ✨ 新增科学计算模式（三角函数、对数、阶乘等）
- 🎨 实现 4 种主题切换（深色、浅色、玻璃、渐变）
- 💾 历史记录支持本地存储持久化
- 📦 使用 Pinia 进行状态管理
- 🎯 引入 VueUse 工具库
- 🚀 配置 GitHub Actions 自动部署
- 📱 优化响应式设计
- 🔧 重构代码结构，提升可维护性

### v2.0.0 (2026-05-12)
- ✨ 新增计算历史记录功能
- 🎨 优化历史记录界面样式
- 🔧 修复键盘操作反馈问题

### v1.0.0 (2026-05-12)
- ✨ 初次发布
- 🎨 现代深色主题界面
- ⌨️ 完整的键盘支持
- 🔢 支持加减乘除四则运算

## 📄 许可证

本项目采用 MIT 许可证开源，欢迎自由使用和修改。

## 🙏 致谢

感谢你的使用！如果你有任何问题或建议，欢迎提交 Issue 或 Pull Request。

---

如果你觉得这个项目不错，请给它一个 ⭐ Star！
