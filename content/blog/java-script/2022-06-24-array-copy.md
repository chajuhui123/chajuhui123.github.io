---
title: "얕은 복사(Shallow copy) VS 깊은 복사 (Deep Copy)"
date: 2022-06-24
category: "JavaScript"
draft: false
---

객체의 복사는 얕은 복사 shallow copy 와 깊은 복사 Deep copy 로 나눌 수 있다.

그리고 자바스크립트에서 값은 원시값과 참조값으로 나눌 수 있다.

원시값 `Number` `String` `Boolean` `Null` `Undefined`

참조값 `Object` `Symbol`

둘의 차이점은 복사될 때 서로에게 **‘영향을 주는가’**이다.

원시값을 복사할 때 복사된 값을 다른 메모리에 할당한다. 즉 원래 값과 복사된 값이 서로에게 영향을 미치지 않는다.

하지만 참조값은 변수가 **객체의 주소를 가리키는** 값이기 때문에 복사된 값이 같은 값을 가리킨다.

---

따라서 객체를 복사하는 방법은 크게 두 가지(얕은 복사 Shallow Copy, 깊은 복사 Deep Copy)로 나눌 수 있다.

## 1. 얕은 복사 Shallow Copy

얕은 복사란 객체를 복사할 때, 원래값과 복사된 값이 같은 참조를 가리키고있는 것을 말한다.

객체안에 객체가 있을 경우 한개의 객체라도 원본 객체를 참조하고 있다면 이를 `얕은 복사`라고 한다.

### Object.assign()

Object.assign은 첫 번째 인자로 들어온 객체에 두 번째 인자로 들어온 객체를 복사한다.

```jsx
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const copiedObj = Object.assign({}, obj);
// {} 객체에 obj 객체를 복사

copiedObj.b.c = 3;

obj === copiedObj; // false
obj.b.c === copiedObj.b.c; // true
```

### 전개연산자

```jsx
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const copiedObj = { ...obj };

copiedObj.b.c = 3;

obj === copiedObj; // false
obj.b.c === copiedObj.b.c; // true
```

## 2. 깊은 복사 Deep Copy

깊은 복사된 객체는 객체안에 객체가 있을 경우에도 원본과의 참조가 완전히 끊어진 객체를 말한다.

### 재귀함수를 이용한 복사

```jsx
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

function copyObj(obj) {
  const result = {};

  for (let key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = copyObj(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

const copiedObj = copyObj(obj);

copiedObj.b.c = 3;

obj.b.c === copiedObj.b.c; //false
```
