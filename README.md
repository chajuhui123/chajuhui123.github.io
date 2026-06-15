# JOY DEVLOG

Next.js + MDX + Tailwind CSS 기반 개인 블로그입니다.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, Static Export)
- [MDX](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub Pages](https://pages.github.com/)

## Development

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 정적 사이트 빌드 (`out/`) |
| `npm run verify-posts` | 포스트 slug/개수 검증 |
| `npm run lint` | ESLint |

## Content

블로그 포스트는 `content/blog/{category}/` 디렉터리에 Markdown/MDX 파일로 작성합니다.

```yaml
---
title: "포스트 제목"
date: 2026-01-01
category: "front"
draft: false
archived: false
---
```

## Deployment

`main` 브랜치 push 시 GitHub Actions가 `out/` 디렉터리를 GitHub Pages에 배포합니다.
