---
title: '[React Query] React Query 정리하기'
date: 2022-05-31
category: 'ReactQuery'
draft: false
---

## Server-State VS Client-State

useQuery 가 반환하는 객체의 프로퍼티로 4가지 상태 중 어떤 상태인지 확인가능하다.

1. **fresh** : 새롭게 추가된 쿼리 인스턴스 → active로 시작
2. **fetching** : 요청을 수행하는 중인 쿼리
   - 어떻게 리패칭이 될까?
     1. 런타임(랜더링)간 특정 쿼리 인스턴스가 다시 만들어졌을 때
     2. window가 다시 포스 되어있을 때
     3. 네트워크 다시 연결되었을 때
     4. refetch interval이 있을 때 :
3. **stale** : 인스턴스 존재하지만 패칭 완료된 쿼리. 특정 쿼리가 stale 된 상태에서 같은 쿼리를 useQuery로 호출해 마운트를 시도한다면 캐싱된 데이터가 반환
4. **inactive** : active가 하나도 없는 쿼리. gc됨. (가비지 콜렉터, 할당된 메모리에서 더 이상 사용하지 않는 메모리를 해체)

---

## 리액트 쿼리 등장 배경 (For Server State)

- React 에는 데이터를 패칭하거나 업데이트하는 옵션을 제공하지 않는다. 따라서 React 개발자들은 HTTP 통신 로직을 짜야한다.
  - 하지만 기존의 API Fetch를 사용하면, 반복되는 패턴, 같은 코드의 반복이 이어지는데 이는 다소 LEGACY 하다.
- Redux는 쿠키나 세션같은 클라이언트 state를 관리하기에 적절하다, 하지만 서버 상태에 대해서는 적절하지 못하다.
  - 서버 데이터는 항상 최신 상태를 보장하지 않는다. Fetching 을 수행해야 최신 데이터로 전환된다.
  - 네트워크 통신은 최소한으로 줄이는 게 좋다. 하지만 각각의 컴포넌트에서 최신 데이터를 받아오기 위해 fetching을 여러번 수행하는 낭비가 발생할 수 있다.

<aside>

### ❓ Client State

React Query는 **전역 state를 "Client"와 "Server"로 분류**해야한다고 주장하며, 각 state는 다른 방식으로 다뤄져야 효율적인 앱을 만들 수 있다고 주장한다.

**Client State** : 세션간 지속적이지 않는 데이터, 동기적, 클라이언트가 소유, 항상 최신 데이터로 업데이트(렌더링에 반영)
(ex. 리액트 컴포넌트의 state, 동기적으로 저장되는 redux store)

**Server State** : 세션간 지속되는 데이터, 비동기적, 세션을 진행하는 클라이언트만 소유하는게 아니고 공유되는 데이터도 존재하며 여러 클라이언트에 의해 수정될 수 있음, 클라이언트에서는 서버 데이터의 스냅샷만을 사용하기 때문에 클라이언트에서 보이는 서버 데이터는 항상 최신임을 보장할 수 없음
(ex. 리액트 앱에서는 비동기 요청으로 받아올 수 있는, 백엔드 DB에 저장되어있는 데이터)

</aside>

- **useQuery (GET)**

  제일 많이 사용

  Query Key

  캐싱할 때 데이터 키를 가지고 있는데,  같은 키를 가지고 있으면

  스트링, 배열 형태로 사용할 수 있다. (?)

  객체 여러 개 써

  보통 쿼리키는 API 주소로 많이 쓴다.

- **Use Mutation (Fetch / POST)**

  특정 값만 변경할 수 있다.

  적은 횟수로 호출할 수 있어짐.

  사이드이펙트

---

## useQueries (GET)

```jsx
const { status, data, error, isFetching, isPreviousData } = useQuery(
  ['projects', page],
  () => fetchProjects(page),
  { keepPreviousData: true, staleTime: 5000 }
)

const { error } = useQuery(['todos', todoId], async () => {
  if (somethingGoesWrong) {
    throw new Error('Oh no!')
  }

  return data
})
```

- 쿼리는 server date를 요청하는 프로미스를 리턴하는 함수와 함께 `unique key`로 맵핑된다.

- 인자는 2개가 들어간다
  - 첫 번째 인자 : 쿼리의 unique key (보통 쿼리키는 API 주소로 많이 쓴다.)
  - 두 번째 인자 : 프로미스를 리턴하는 함수 (resolve Promise를 리턴하거나, error를 throw 해야함)
- unique key : 한 번 fresh 되었다면, 계속 추적이 가능하다. 리패칭, 캐싱, 공유 등을 할 때 참조되는 값이다.
  - 주로 배열을 사용하고, 배열의 요소로 **`[쿼리의 이름을 나타내는 문자열, 프로미스를 리턴하는 함수의 인자로 쓰이는 값]`** 을 넣는다.
- 반환값

  - `IsLoading` `isError` `isSuccess` `isldle` `status`
  - `error` `data` `isFetching` → 런타임간 요청이 한 번 이상 발생했다면 값이 존재

- 쿼리 요청 함수의 상태를 표현하는 status는 4가지이다.
  - status 프로퍼티에서는 문자열로, 상태 이름 앞에 is를 붙인 프로퍼티에서는 불리언으로 해당 상태인지 아닌지를 평가 가능하다. (isIdle === true 등)
  - idle : 쿼리 데이터가 하나도 없고 비었을 때. {enabled : false} 상태로 쿼리가 호출되었다면 이 상태로 시작된다.
  - loading : 로딩 중
  - error : 에러 발생
  - success : 요청 성공
- 주요 쿼리 옵션

  - enabled : True일 때 자동으로 쿼리의 요청 함수가 호출되는 일이 없다
  - keepPreviousData : success와 loading 사이 널뛰기 방지
  - placeholderData : mock 데이터 설정도 가능. 하지만 캐싱이 되지 않는다.
  - initialData : 초기값 설정

    → 쿼리의 여러가지 옵션 설정을 통해 다양한 방식으로 데이터를 관리할 수 있다.

## useMutation

```jsx
function App() {
  const mutation = useMutation(newTodo => axios.post('/todos', newTodo))

  return (
    <div>
      {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  )
}
```

- userQuery와 다르게 create, update, delete 하며, server state에 사이드 이펙트를 일으키는 경우 사용한다.
- mutation 객체를 정의하고, mutate 메서드를 사용하면 요청 함수를 호출해 요청이 보내진다. 이것이 query랑 mutation이 나눠져있는 이유인 것 같다.

  → 이벤트 핸들러 함수, 조건부로 useQuery를 호출하면 최상위에서 호출해야한다는 훅의 규칙에 위배되기 때문에 성가시다.

- useMutation이 반환하는 객체 프로퍼티로 제공되는 상태값은 useQuery와 동일하다

```jsx
seMutation(addTodo, {
  onMutate: variables => {
    // 뮤테이션 시작
    // onMutate가 리턴하는 객체는 이하 생명주기에서 context 파라미터로 참조가 가능하다.
    return { id: 1 }
  },
  onError: (error, variables, context) => {
    // 에러가 났음
    console.log(`rolling back optimistic update with id ${context.id}`)
  },
  onSuccess: (data, variables, context) => {
    // 성공
  },
  onSettled: (data, error, variables, context) => {
    // 성공이든 에러든 어쨌든 끝났을 때
  },
})
```

- 두 번째 인자로 콜백 객체를 넘겨줘서, **라이프사이클 인터셉트 로직**을 짤 수 있다.
- retry 옵션 또한 부여할 수 있다
