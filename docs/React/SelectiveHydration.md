# Selective Hydration

React 18 引入了一些新的特性和改进，其中之一是 Selective Hydration（选择性 Hydration）。这个特性主要用于提高服务器端渲染（SSR）的性能和用户体验。

### 什么是 Hydration？

在 React 中，Hydration 是指将服务器端渲染的 HTML 转换成可以在客户端操作的 React 组件的过程。这个过程通常发生在页面加载时，将静态的 HTML 变成动态的、可交互的 React 组件。

### 什么是 Selective Hydration？

Selective Hydration 是 React 18 中引入的一种优化技术，它允许 React 在客户端只对用户交互的部分进行 Hydration，而不是在页面加载时一次性进行全部 Hydration。这样可以显著提高页面的初始加载性能和响应速度。

### 为什么需要 Selective Hydration？

传统的 Hydration 过程是同步的，意味着在页面加载时，React 会一次性对整个页面进行 Hydration。这种做法在页面复杂度较高时会导致较长的加载时间和较差的用户体验。

Selective Hydration 通过只对用户交互的部分进行 Hydration，可以实现以下几个好处：

1. **提高初始加载性能**：减少初始加载时需要 Hydration 的内容，缩短加载时间。
2. **提高响应速度**：用户交互的部分可以更快地变为可交互状态，提高响应速度。
3. **更好的用户体验**：用户可以更快地与页面进行交互，不需要等待整个页面的 Hydration 完成。

### 如何使用 Selective Hydration？

React 18 的 Selective Hydration 是自动处理的，不需要开发者进行额外的配置。以下是一些相关的概念和使用示例：

1. **React.lazy 和 Suspense**：React.lazy 和 Suspense 可以与 Selective Hydration 一起使用，以实现组件的懒加载和选择性 Hydration。

   ```jsx
   import React, { Suspense } from "react";

   const LazyComponent = React.lazy(() => import("./LazyComponent"));

   function App() {
     return (
       <div>
         <h1>Hello, React 18!</h1>
         <Suspense fallback={<div>Loading...</div>}>
           <LazyComponent />
         </Suspense>
       </div>
     );
   }

   export default App;
   ```

2. **事件绑定**：React 18 会在服务端渲染的 HTML 中自动添加事件监听器，以便在用户交互时触发 Selective Hydration。

3. **并发模式**：React 18 引入了并发模式（Concurrent Mode），可以更好地支持 Selective Hydration 和其他性能优化特性。

### 示例

假设你有一个复杂的页面，其中包含多个独立的组件。使用 Selective Hydration，React 18 会优先对用户交互的部分进行 Hydration，而不是一次性对整个页面进行 Hydration。

```jsx
import React, { Suspense } from "react";

const Header = React.lazy(() => import("./Header"));
const Content = React.lazy(() => import("./Content"));
const Footer = React.lazy(() => import("./Footer"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading content...</div>}>
        <Content />
      </Suspense>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
```

在这个示例中，当页面加载时，React 会优先对用户交互的部分（例如点击事件）进行 Hydration，而不是一次性对 Header、Content 和 Footer 进行全部 Hydration。这可以显著提高页面的初始加载性能和用户体验。

## Selective Hydration 是如何区分用户交互的部分进行 Hydration 的？

Selective Hydration 是 React 18 中的一项优化技术，它通过智能地选择用户交互的部分进行 Hydration，从而提高页面的初始加载性能和用户体验。那么它是如何区分和识别这些用户交互的部分呢？以下是一些关键机制和原理：

### 1. 事件绑定

在服务器端渲染（SSR）过程中，React 会在生成的 HTML 中添加一些特殊的属性和事件监听器。这些事件监听器在页面加载时不会立即触发 Hydration，而是等待用户交互（如点击、输入等）发生时才触发。

#### 示例：

假设你有一个服务器端渲染的按钮：

```html
<button data-reactroot="">Click Me</button>
```

在 React 18 中，这个按钮可能会带有一些内部的事件监听器，当用户点击按钮时，这些监听器会触发 Selective Hydration。

### 2. 预渲染和标记

React 18 在服务器端渲染时，会为每个组件生成一个唯一的标记（marker），这些标记帮助 React 在客户端识别和定位需要进行 Hydration 的部分。

#### 示例：

假设你有一个复杂的页面，包含多个组件：

```jsx
function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```

在服务器端渲染时，React 会为每个组件生成标记，并在 HTML 中保留这些标记。这样，React 在客户端可以根据这些标记进行选择性 Hydration。

### 3. Suspense 和 Lazy Loading

React 18 中的 `Suspense` 和 `React.lazy` 特性可以与 Selective Hydration 一起使用，以实现组件的懒加载和选择性 Hydration。当用户与某个组件交互时，React 会优先对该组件进行 Hydration。

#### 示例：

```jsx
import React, { Suspense } from "react";

const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
  return (
    <div>
      <h1>Hello, React 18!</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

在这个示例中，当用户与 `LazyComponent` 交互时，React 会触发对该组件的 Selective Hydration。

### 4. 并发模式（Concurrent Mode）

React 18 引入的并发模式（Concurrent Mode）可以更好地支持 Selective Hydration。并发模式允许 React 在后台进行非阻塞的更新和 Hydration，从而提高页面的响应速度和用户体验。

#### 示例：

```jsx
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

在并发模式下，React 可以更智能地调度和管理 Hydration 任务，根据用户交互的优先级进行选择性 Hydration。

### 5. 资源优先级和调度

React 18 中的调度器（Scheduler）可以根据用户交互的优先级来调度 Hydration 任务。高优先级的用户交互（如点击、输入等）会被优先处理，而低优先级的任务（如背景更新）会被延后处理。

#### 示例：

```jsx
import { unstable_scheduleCallback } from "scheduler";

unstable_scheduleCallback(() => {
  // 高优先级的用户交互任务
});
```

通过这种方式，React 可以更高效地管理和调度 Hydration 任务，确保用户交互部分得到优先处理。

### 总结

Selective Hydration 通过事件绑定、预渲染和标记、Suspense 和 Lazy Loading、并发模式以及资源优先级和调度等机制，智能地选择和区分需要进行 Hydration 的用户交互部分。这样可以显著提高页面的初始加载性能和用户体验，使得复杂页面的加载更加高效。

### 总结

Selective Hydration 是 React 18 中引入的一项重要特性，它通过只对用户交互的部分进行 Hydration 来提高页面的初始加载性能和响应速度。这种优化技术使得复杂页面的加载更加高效，用户体验也得到了显著提升。
