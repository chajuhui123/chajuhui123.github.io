# chajuhui123.github.io

[Next.js](https://nextjs.org) App Router로 만든 개인 블로그. `content/posts`, `content/stash`의 MDX 파일을 정적으로 빌드해서 GitHub Pages로 배포합니다.

## 로컬 개발

```bash
pnpm install
pnpm dev
```

`http://localhost:3000`에서 확인할 수 있습니다.

## 글 작성

- 정식 글: `content/posts/`
- 과거 아카이브: `content/stash/`

frontmatter는 아래 형식을 따릅니다.

```md
---
title: "글 제목"
date: 2026-01-01
tags: ["태그"]
description: "선택 사항"
image: "/images/xxx.png" # 선택 사항, 커버 이미지
---
```

## 배포

`main` 브랜치에 push되면 `.github/workflows/pages.yml`이 정적 export(`pnpm build` → `out/`)를 빌드해 GitHub Pages로 자동 배포합니다.

## 커밋 컨벤션

커밋 메시지는 [gitmoji](https://gitmoji.dev/)로 시작해야 합니다 (`.husky/commit-msg`에서 검사). `pnpm commit`으로 인터랙티브하게 작성할 수 있습니다.
