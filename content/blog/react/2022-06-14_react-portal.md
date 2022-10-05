---
title: 'Modal 구현 제대로 알기! root에 등장하는 Modal Portal 구현'
date: 2022-06-14
category: 'React'
draft: false
---

### Modal Portal

```jsx
<Modal visible={boolean}/>
```

→ 위 코드처럼 작성하는 것의 문제점 : 띄우지 않은 Modal 에 대한 컴포넌트도 랜더링되고, visible(boolean) 값에만 숨겨지고 보여지는 것으로 동작한다. 이에 대한 대안책은 `Modal Portal` 방식으로 구현하는 것이다.

- [Modal Portal](https://ko.reactjs.org/docs/portals.html) ?
    - Portal 은 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링하는 방법을 제공한다.
    - = React으로 예시를 들면 App.js 내부에 감싸져 있는 div 바깥으로 DOM 노드가 생성되는 것이다.
    
    ```jsx
    ReactDOM.createPortal(child, container)
    ```
    