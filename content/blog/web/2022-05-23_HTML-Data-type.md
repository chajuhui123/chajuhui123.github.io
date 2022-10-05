---
title: 'HTML Data-type 활용하기'
date: 2022-05-23
category: 'web'
draft: false
---

# HTML Data-type ?

HTML 특정 요소와 연관되어 있지만 확정된 의미는 갖지 않는 데이터에 대한 확장 가능성을 염두에 두고 디자인되었습니다. `data-*` 은 표준이 아닌 속성이나 추가적인 DOM 속성, `Node.setUserData()`
과 같은 다른 조작을 하지 않고도, 의미론적 표준 HTML 요소에 추가 정보를 저장할 수 있도록 해줍니다. [By MDN](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes)

### 언제 사용할까요?

CSS 속성 선택자로 들어오는 데이터에 따라 스타일을 바꾸는데 사용할 수 있습니다.

예를 들어 쇼핑몰을 개발할 때 상품에 대한 상태가 다양하고 (Ex. 임금대기, 배송준비, 배송출발, 도착, 환불, 취소 등…) 해당 데이터에 따라 스타일이 달라져야 할 때, 유용하게 작성할 수 있습니다.

각 데이터에 대한 className을 하나하나 지정하는 편보다, `data-type` 과 `속성선택자`를 통해 예측 가능하고 확장가능한 코드를 작성할 수 있습니다.

검색 엔진에 노출되지 않는다는 문제점도 있지만, 스타일 커스텀에 사용되는 메타 데이터가 있을 때는 좋은 방안이 될 것 같습니다.

### 사용 예시를 살펴봅시다.

`data-` 로 시작하게 작성할 수 있고, `data-*` 뒤에 붙은 내용을 속성 이름으로 사용합니다.

또한 각 속성은 `문자열`로 저장됩니다. 따라서 Number, Boolean 값을 사용하더라도 `String` 형태로 작성해야합니다.

Data Type은 순수 HTML 속성이기에 JS, CSS을 통해 접근할 수 있습니다.

```html
<span data-info="{data.develiveryInfo}"> {data.develiveryInfo} </span>
```

```css
span[data-info='”WAITING”'] {
  background-color: “gray”;
}

span[data-info='”DELIVERY”'] {
  background-color: “blue”;
}
```
