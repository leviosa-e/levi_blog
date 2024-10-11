# SSR

> https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc

## Islands 架构

> https://jasonformat.com/islands-architecture/

尽管 React 18 版本解决了以下问题：

- 不需要等待所有数据加载完毕就可以返回 HTML。
- 不需要等待所有 JavaScript 加载完毕就可以进行注水和响应交互。

但在渲染过程中仍然存在以下问题：

- 🪫 非交互组件进行不必要的水合和资源（JavaScript）的加载。
- 🪫 页面内容无法按照优先级（高、中、低）顺序进行组件渲染和资源加载。

通过采用孤岛架构，可以有效控制页面渲染的时序，灵活自定义页面组件的资源加载、数据请求和组件水合的时机与优先级。

孤岛架构允许按照立即加载、闲时加载和可视时加载等阶段进行渲染，确保高优先级内容尽早展示，非高优内容延迟加载。

这样，可以根据渲染优先级和用户交互触发条件依次渲染和展示页面内容。
