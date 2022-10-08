---
title: "NextJS Storybook 환경에서 Tailwind css 미적용 이슈 해결하기"
date: 2022-08-10 12:24
category: "NextJS"
draft: false
---

Storybook은 프론트에서 작업한 컴포넌트를 관리하고 테스트하기 위해 도입한 기술입니다. 디자이너와의 소통을 원활하게 해주고 프론트 팀의 작업물을 팀 구성원들이 쉽게 관리할 수 있도록 돕습니다. 최근 프로젝트에서 tailwind css 를 도입하였는데, 해당 기술이 Storybook 에 적용되지 않는 이슈가 있었습니다.

이 게시물에서는 storybook 을 처음부터 셋팅하는 과정보다는 제가 이슈를 해결한 과정을 정리하려고 합니다.

---

## 1. Preview.js 에서 tailwind css 코드가 적용되어있는 css 파일을 import

첫 번째로 시도한 방식은 preview.js 에서도 tailwind css 셋팅이 적용되어있는 global css 파일을 import 하는 것입니다. storybook 환경에도 tailwind 셋팅이 필요하기에 임포트를 해와 영향력을 줍니다. 하지만 이 방법으로는 문제를 해결하지 못했습니다.

`.storybook/preview.js`

```jsx
import "../styles/globals.css";
```

`styles/globals.css`

```jsx
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 2. post css add-ons 버전 이슈

tailwindcss 가 적용되려면 post-css 패키지를 적용해, 프로젝트의 css를 미리 빌드하여 storybook에 적용해야합니다. 해당 패키지를 다운받고 storybook에 다음과 같이 셋팅을 해주었습니다. 또한 이 문서를 참고하였습니다. [https://theodorusclarence.com/blog/nextjs-storybook-tailwind](https://theodorusclarence.com/blog/nextjs-storybook-tailwind)

`.storybook/main.js`

```jsx
const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-next-router",
    // post css 패키지 적용
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
```

셋팅 후 스토리북 환경을 켜보니 storybook 빌드 상태가 99% 에서 진전이 되지 않았습니다. (`99% done plugins webpack-hot-middlewarewebpack built preview b15e0ed4179d6dceff64 in 3202ms`)

찾아보니, 해당 이슈는 위에서 사용하였던 `@storybook/addon-postcss` 의 버전 이슈였습니다.

postcss 버전이 3.x.x-alpha 버전이였는데 `2.0.0` 으로 stable 한 버전을 사용하면 이 이슈를 해결할 수 있다고 하였습니다.

`pacakge.json`

```json
"@storybook/addon-postcss": "2.0.0",
```

이를 통해 Storybook에 tailwind css 가 미적용되었던 이슈를 해결하였습니다 :D

이제 Storybook에 static 한 이미지를 올릴 수 있도록 셋팅을 하러갈 것입니다.
