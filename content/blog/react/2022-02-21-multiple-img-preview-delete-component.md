---
title: '[React] 다중 첨부 이미지 미리보기 및 제거 컴포넌트'
date: 2022-02-21 21:30:00
category: 'React'
draft: false
---

input 태그에 파일이 첨부될 때(onChange)의 event 를 찍어보았다.

다중업로드?

`<input type="file" multiple />` 처럼 속성값을 넣어주면, 다중 파일 업로드가 가능해진다.

Files 내부에 파일을 Object 형태로 받아오고 있다.

미리보기 기능을 구현하기 위해선 이미지 DOM이 필요한데, 이것은 `URL.createObjectUrl()` 메서드를 활용하여 반환받을 수 있다. 위에서 받아온 파일 Object 각각을 `URL.createObjectUrl()` 의 매개변수로 넣어주면 주어진 객체를 가리키는 URL을 DOMString 으로 반환받을 수 있다. 이 때 매개변수로 넣어주는 Object는 File, Blob, MediaSource 형태여야 한다.

참고 : [MDN Web Docs : URL.createObjectURL()](https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL)

위에서 얻은 DOMString을 `<img> src` 속성에 대입해준다면 미리보기 이미지를 구현할 수 있다.

---

## 요약

1️⃣ `<input>` 대신 `<label>` 을 사용하여, 이미지 첨부 UI를 디자인한다. `<input>`은 `display : none` 으로 숨긴다.

2️⃣ `<input>` 에 `onChange` 이벤트를 등록한다.

3️⃣ onChange 이벤트에 첨부된 파일을 `DOMString 으로 반환`해주는 함수를 대입한다.

4️⃣  반환받은 DOMString은 `배열 형태의 State` 로 관리한다.

5️⃣  첨부된 이미지 DOMString을 담고 있는 배열 State를 순환하여 미리보기 `이미지 컴포넌트를 렌더링`해준다.

---

### State 선언

```tsx
const [previewImgList, setPreviewImgList] = useState([])
```

- 미리보기 이미지 객체들을 관리할 배열 형태의 State를 선언한다.

### 미리보기 이미지 DOMString 저장

```tsx
const handleCreatePreviewImg = event => {
  let previewUrlList = [...previewImgList]
  const uploadFilesObject = event.target.files
  for (let i = 0; i < uploadFilesObject.length; i++) {
    const currentImgUrl = URL.createObjectURL(uploadFilesObject[i])
    previewUrlList.push(currentImgUrl)
  }
  // 이미지 최대 5개 제한
  if (previewUrlList.length > 5) {
    previewUrlList = previewUrlList.slice(0, 5)
  }
  setPreviewImgList(previewUrlList)
  // (+ 개발 중인 프로젝트에 따라 서버에 저장하기 위한 코드를 추가할 수 있음.)
}
```

- `onChange` 이벤트에 넣어줄 함수이다.
- 첨부 파일이 들어올 때, 들어온 파일들을 DOMString 형태로 반환하여 준다. 반환된 파일은 관리하고 있는 state에 추가시킨다.
- 이미지는 최대 5개 첨부할 수 있도록, 배열을 자르는 방식으로 제한하였다.

### 미리보기 이미지 삭제

```tsx
const handleDeleteImage = id => {
  const filteredImgList = []
  ;[...previewImgList].map((img, imgIndex) => {
    if (id !== imgIndex) {
      filteredImgList.push(img)
    } else {
      URL.revokeObjectURL(img)
    }
  })
  setPreviewImgList(filteredImgList)
  setValue('urls', filteredImgList)
}
```

- handleDeleteImage는 삭제하고자 하는 이미지 컴포넌트 위 `X` 버튼을 onClick 하면 작동하는 함수이다.
- 미리보기 DOMString 값이 저장된 배열을 순환하며, 현재 누른 컴포넌트의 id값과 미리보기 이미지의 id값이 일치하지 않으면 (삭제하고자하는 컴포넌트가 아닌 경우), 배열에 포함한다.
- 만약 일치한다면 (삭제하고자하는 컴포넌트인 경우), 배열에 포함하지 않으며 `URL.revokeObjectURL` 를 통해 URL 객체를 제거한다.
  → [MDN](https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL)에서 **최적의 성능과 메모리 사용량**을 위해서 권장하고 있는 방식이다.

### 주요 코드

```tsx
...
const UploadPreviewImage: React.FC<TProps> = ({ ... }) => {
  ...
  return (
    <StyledWrapper>
      <div className="photo-input-preview-box">
        <div className="photo-wrap">
          **<label htmlFor="uploadFile">
              <div>사진 업로드</div>
          </label>**
        </div>
        **{previewImgList.map((previewImg, previewImgIdx) => {
          return (
            <ReviewPreviewPhoto
              key={previewImgIdx}
              id={previewImgIdx}
              imgSrc={previewImg}
              handleDeleteImage={handleDeleteImage}**
							// (+ 진행 중인 프로젝트에 따라 option 추가 가능)
            **/>
          );
        })}**
      </div>
      **<input
        type="file"
        multiple
        id="uploadFile"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleCreatePreviewImg}**
				// (+ 진행 중인 프로젝트에 따라 option 추가 가능)
      **/>**
    </StyledWrapper>
  );
};

export default UploadPreviewImage;
```

- input 대신 label 태그를 사용해 input UI를 디자인한다.
- previewImgList (= DOMString을 담고 있는 배열)을 순환하며 이미지를 랜더링한다.
- 이미지에 `handleDeleteImage` 함수를 props 로 넘겨줘, 컴포넌트 위에 X 버튼을 두고, X를 눌렀을 때 해당 함수가 작동하도록 한다.
