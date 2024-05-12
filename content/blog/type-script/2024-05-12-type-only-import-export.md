---
title: "Type-only imports/exports 를 사용해야하는 이유"
date: 2024-05-12 19:30:00
category: "TypeScript"
draft: false
---

Typescript를 사용하는 프로젝트를 진행하다보면 interface 혹은 type을 분리하여 import 해오는 상황이 있을텐데요! 예를 들어 특정 interface 를 가진 데이터를 특정 컴포넌트 인자값에 넣어주어야 하는 상황 등에서 마주칠 것 같아요.

최근에 제가 가진 의문은 “interface 혹은 type을 가져올 때, import 문에 type을 꼭 명시해줘야할까?” 였습니다. 이전까지는 해당 의문을 가지지 않은채 습관적으로 type을 선언해주었기 때문입니다. 하지만 type을 생략하고 import 하는 팀원들의 코드를 마주쳤고, 팀원들과 컨벤션을 맞추기 위하여 고민을 시작해보았습니다.

둘의 차이는 무엇일까요?

```jsx
// Type only import
import type { ButtonProps } from ‘.’;

// 고냥 import
import { ButtonProps } from ‘.’;
```

이번 포스팅에서는 import 할 때 type을 명시하는 이유는 무엇이고 **장점, 유의할 점**이 무엇인지 살펴보겠습니다!

---

# Type only imports, exports 란?

Type-only imports/exports는 [TypeScript 3.8](https://www.typescriptlang.org/ko/docs/handbook/release-notes/typescript-3-8.html)에 새로 추가된 기술입니다.

해당 문법을 사용하게 되면, 런타임 과정에서 사용하지 않아도 되는 import를 구분할 수 있게됩니다. 사용하지 않는다고 분류된 type import/export, interface import/export 는 컴파일 결과에서 제외되는 것입니다. **에러를 방지하고, 번들 사이즈가 줄어**듭니다.

또한 프로젝트를 함께하는 개발자들도, import/export 해오는 코드가 **type인지, 아니면 변수나 함수인지 분명하게 구분**할 수 있도록 돕습니다.

정리해보자면, import type은 타입 문맥에 사용될 선언만 가져오고, export type은 타입 문맥에 사용될 선언만 내보내어, TS의 출력물에 제외되는 것입니다.

---

# 장점

1. **코드 가독성 향상**

   TypeScript에서는 일반적으로 코드를 작성할 때 모듈에서 사용되는 모든 데이터를 불러오기 위해 import 구문을 사용합니다. 타입만을 import하는 경우, **코드의 가독성이 향상**되어 효율적인 유지보수로 이어집니다.

2. **불필요한 모듈 로딩 방지**

   전체 모듈을 import하는 경우, 애플리케이션이 로드될 때 불필요한 모듈도 함께 로딩되어 성능 저하를 만들어낼 수 있습니다. 타입만을 import하는 경우, **필요한 타입만을 로드하여 성능 개선**에 도움을 줄 수 있습니다.

3. **컴파일 속도 향상**

   타입만을 import하는 경우, 컴파일러가 불필요한 코드를 처리하지 않아 **컴파일 속도**가 빨라집니다.

---

# 유의할 점

1. **import type으로 가져온 class는 확장이 불가합니다.**

   - 클래스는 런타임에 값을 가지고 있고, 디자인 타임(개발 할 때)에 타입이 있으며, 사용은 상황에 따라 다르다는 것을 유의해야 합니다. 클래스를 import 하기 위해 `import type`을 사용하면, 확장은 불가능합니다.
   - 컴파일러는 디자인 타임에 변수와 함수 등의 타입 정보를 정적으로 분석하고 체크합니다.
   - 런타임에는 코드가 실행되고, 인스턴스가 생성되어 메모리를 할당받으며, 이를 제어하기 위한 로직이 동작합니다.
   - 클래스는 디자인 타임(개발할 때)에 선언된 타입 정보를 기반으로 런타임에는 객체로 존재합니다.

   ```jsx
   import type { Component } from "react";

   interface ButtonProps {
     // ...
   }

   class Button extends Component<ButtonProps> {
     // error! 'Component' only refers to a type, but is being used as a value here.
   }
   ```

   - 예제처럼 이미 타입으로 가져온 클래스는 다시 값으로서 확장될 수 없습니다.

1. **import와 default import는 한 번에 할 수 없습니다.**

   - 하나는 일반 export, 하나는 default로 export 한 경우를 살펴봅시다.

   ```jsx
   // 'Foo'만 타입인가? 혹은 모든 import 선언이 타입인가?
   // 이는 명확하지 않기 때문에 오류로 처리합니다.
   import type Foo, { Bar, Baz } from "some-module";
   //     ~~~~~~~~~~~~~~~~~~~~~~
   // error! A type-only import can specify a default import or named bindings, but not both.
   ```

   - 두 개를 한 번에 가져오려 할 경우 에러가 발생합니다.
   - 이는 'Foo만 타입인지, 모든 import 선언이 타입인지'가 모호하게 해석될 여지가 있으므로 애초에 오류로 처리하도록 제한을 두었다고 합니다.

---

공식문서에 정리된 유의해야 할 점 또한 더 안정성 높은 앱을 만들기 위한 제한들 같습니다! 해당 문법 사용 후, 런타임 시간이 얼마나 줄어드는지 비교도 해보고 싶어지는 정리글이네요.

앞으로도 TypeScript를 더 똑똑하게 쓰기 위해 고민해보겠습니다!
