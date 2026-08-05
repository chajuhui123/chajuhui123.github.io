---
title: "[WIP] No React Query, 나만의 캐싱 라이브러리 만들기"
date: 2024-12-21
category: "front"
draft: true
---

## 서론

최근 토스의 기술 포스팅 중 [ESLint와 AST로 코드 퀄리티 높이기](https://toss.tech/article/improving-code-quality-via-eslint-and-ast)를 보면서 토스의 다양한 Rule을 엿볼 수 있었어요. 포스팅 내용 중 저의 이목을 이끈 것은 `외부 라이브러리 사용에 관련한 규칙들` 관련 룰이었어요.

그 중에서도 가장 인상깊은 룰은 `사용하지 않기로 한 패키지 사용 제한 (ban-axios, ban-lodash)` 이었는데, 많은 프로젝트에서 쓰이고 대중적인 라이브러리 사용을 제한하다니 이유가 궁금하기도 하고, **'재밌겠다'** 라는 감정이 지배를 했어요. 나도 패키지 사용 제한? 해보고 싶은데? 라는 생각이 들었습니다. [2024 프론트 관련 통계](https://2024.stateofjs.com/ko-KR/other-tools/)에 따르면 lodash는 1위, axios는 18위를 기록할 만큼 많은 개발자들이 애정하는 라이브러리인데 말이죠.

또 한편으로는, 만약 지금 우리가 편하게 쓰고 있는 JS 라이브러리들이 사라진다면... 나는 과연 프론트엔드 개발자로 일할 수 있을지 생각이 들기도 하더라구요.

그래서 시작한 No 프로젝트입니다. 먼저 제 1탄으로 `No React Query` 를 선정하였습니다. 많은 FE 개발자들이 애정하는 해당 라이브러리는 패칭 관련 상태들을 제어할 수 있게 돕고, 몇가지 핵심 이점들을 통해 좋은 UX 를 만드는데 이바지 하고 있어요. 또한 React Hook 포맷으로 제공하여, 코드를 깔끔하게 작성할 수 있다는 점도 매력 포인트입니다.

### React Query 의 탄생 배경

대부분의 전통적인 상태 관리 라이브러리는 **클라이언트 상태**(**client state**)를 다루는 데는 적합하지만, **서버 상태/비동기 상태**(**server state/async state**)를 다루는 데는 적합하지 않습니다. 그 이유는 서버 상태와 클라이언트 상태가 본질적으로 다르기 때문입니다. 서버 상태는 다음과 같은 특성을 가집니다.

- 원격 서버에 저장되며, 클라이언트가 소유하거나 제어할 수 없는 위치에 존재할 수 있습니다.
- 데이터를 가져오거나 업데이트하기 위해 비동기 API가 필요합니다.
- 서버 데이터는 다른 클라이언트에게도 조회, 수정될 수 있으며, 이는 클라이언트가 모르는 상태에서 이루어질 수 있습니다.
- 잘못 관리하면 애플리케이션 내에서 데이터가 **변질**(**out-of-date**)이 될 가능성이 있습니다.

서버 상태를 이해하고 나면, 이를 관리하기 위한 아래와 같은 추가적인 문제들에 직면하게 됩니다.

- 캐싱 (프로그래밍에서 어려운 작업 중 하나)
- 동일한 데이터를 여러 요청에서 중복으로 요청하지 않도록 요청 병합(deduplication) 처리
- 오래된 데이터를 백그라운드에서 업데이트
- 데이터가 **변질**(**out-of-date**)되었는지 인지
- 데이터를 가능한 한 빠르게 업데이트 내용을 반영
- 페이징(pagination) 및 지연 로딩(lazy loading) 같은 성능 최적화
- 서버 상태의 메모리 관리 및 가비지 컬렉션
- **구조적 공유**(**structural sharing**)를 활용한 쿼리 결과의 메모이제이션(memoization)

React Query 는 이러한 서버 상태 관리의 복잡한 문제를 극복하고, 데이터를 제어하기 위해 탄생한 기술입니다.

### React Query 기능

React Query는 서버로부터 데이터 가져오기, 데이터 캐싱, 캐시 제어 등 데이터를 쉽고 효율적으로 관리할 수 있는 라이브러리입니다.

현재는 TanStack Query 로 명칭하고 있습니다. v4부터 Vue나 Svelte 등의 다른 프레임워크에서도 활용할 수 있도록 기능이 확장되며 TanStack Query라는 이름으로 변경되었습니다.

아래는 대표적인 기능들입니다.

- 데이터 페칭: API 호출을 통해 데이터를 가져옵니다.
- 캐싱: 동일한 데이터를 반복적으로 가져오지 않도록 캐싱합니다.
- 데이터 유효성 검사: 캐시된 데이터의 유효성을 확인합니다.
- 리페치: 데이터가 변경되었거나 오래된 경우 데이터를 다시 가져옵니다.
- 중복 요청 방지: 같은 데이터 요청이 동시에 여러 번 발생하지 않도록 합니다.
- 자동 리프레시: 백그라운드에서 데이터를 주기적으로 업데이트합니다.

---

## 데이터 패칭 & 캐싱 라이브러리

```js
// useFetch.js

import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (key, fetchFn) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchFn()
      .then((response) => {
        if (isMounted) {
          setData(response);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false; // 컴포넌트가 언마운트되면 요청 취소
    };
  }, [key, fetchFn]);

  return { data, error, isLoading };
};
```

1. key, fetch 문을 props 로 넘겨주면 loading 상태를 true 로 변경하고
2. (catch) 패치 과정에서 에러가 리턴되었다면 error 응답을 저장합니다.
3. (finally) 로딩 상태를 끝냅니다.

data, error, isLoading 값을 리턴해주는 useFetch 훅을 작성하였습니다. 해당 훅은 컴포넌트가 마운트 상태일 때만, 실행되는 훅입니다.

```js
// cache.js

const cache = new Map();

export const getFromCache = (key) => cache.get(key);

export const setToCache = (key, value) => {
  cache.set(key, value);
};

export const clearCache = (key) => {
  cache.delete(key);
};
```

```js
// useFetch 훅에 캐싱 기능 추가

import { useState, useEffect } from "react";
import { getFromCache, setToCache } from "./cache";

export const useFetch = (key, fetchFn) => {
  const [data, setData] = useState(getFromCache(key) || null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!data);

  useEffect(() => {
    if (data) return; // 캐시된 데이터가 있으면 스킵

    let isMounted = true;
    setIsLoading(true);

    fetchFn()
      .then((response) => {
        if (isMounted) {
          setToCache(key, response); // 캐시에 저장
          setData(response);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [key, fetchFn, data]);

  return { data, error, isLoading };
};
```

React Query를 활용할 때, 필수 인자 중 하나는 `쿼리 키(queryKey)` 입니다.

쿼리 키를 통해 캐싱되어 있는 데이터와 비교하여, 새로운 데이터를 가져올지, 캐시되어 있는 데이터를 사용할지 결정합니다.

- 쿼리 키와 일치하는 캐싱 데이터가 없을 때, 새롭게 해당 키로 데이터를 저장하고
- 이미 존재하는 데이터가 있다면, 변질도(out-of-date)를 체크하여 캐싱 데이터 사용 유무를 결정합니다.
  - 캐시된 데이터를 사용하게 되어 **중복 요청을 줄일 수** 있습니다.

위 cache.js 함수에서는 key:value 의 Map 구조로, Query Key에 value 값이 저장되어 있는지 **체크**, **저장**, **제거**하는 기능을 제공합니다.

### WIP LIST

- staleTime 을 통한 out-of-date 여부 결정
- 쿼리키 Array 형태로 관리
- refetch 를 시키는 invalidateQuery
- 백그라운드 데이터 업데이트
- 포커싱, 네트워크 재연결 등… 데이터 자동 리페치
- 전역 상태 관리로 변경

(작업 예정)

캐싱된 데이터의 변질도는 React Query 가 제공하는 staleTime 옵션으로 **Fresh/Stale** 상태를 결정할 수 있습니다.

캐시된 데이터가 fresh 하다면 캐싱된 데이터를 사용하고, 만약 데이터가 stale 하다면, 서버에 다시 요청하여 새로운 데이터를 가져옵니다.

```js
// 중복 요청 방지를 위한 requestTracker.js

const pendingRequests = new Map();

export const trackRequest = (key, promise) => {
  pendingRequests.set(key, promise);
};

export const getTrackedRequest = (key) => pendingRequests.get(key);

export const clearTrackedRequest = (key) => {
  pendingRequests.delete(key);
};
```

```js
// 패치문에 중복 요청 방지 로직 추가

import {
  trackRequest,
  getTrackedRequest,
  clearTrackedRequest,
} from "./requestTracker";

export const useFetch = (key, fetchFn) => {
  // ... 기존 코드 유지

  useEffect(() => {
    if (data) return;

    const trackedRequest = getTrackedRequest(key);
    if (trackedRequest) {
      trackedRequest
        .then(setData)
        .catch(setError)
        .finally(() => setIsLoading(false));
      return;
    }

    const fetchPromise = fetchFn()
      .then((response) => {
        setToCache(key, response);
        setData(response);
        setError(null);
        return response;
      })
      .catch((err) => {
        setError(err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
        clearTrackedRequest(key);
      });

    trackRequest(key, fetchPromise);
  }, [key, fetchFn, data]);

  return { data, error, isLoading };
};
```

---

참고자료

- [react query](https://www.heropy.dev/p/HZaKIE)
