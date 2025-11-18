## 변수명, 함수명, 클래스명 공통
- callback의 매개변수명을 한글자로 적지않고 원래 단어를 다 그대로 써야합니다.
- 예시: `array.map(t => t.some)`이 아니라 `array.map(topic => topic.some)` 이런식이 되야합니다.

## 코드작성 완료 후
- 반드시 unused imports 가 있는지 확인해주세요.
- unused variables도 있는지 확인해주세요.
- 커밋 남기지 말아주세요. 제가 알아서 커밋할게요

## useMutation
- `mutate` 대신 `mutateAsync` 와 `try-catch` 구문을 사용하는 것을 선호합니다.

### 예시

#### 사용하지 않는 방식

```typescript
const { mutate } = useMutation(mutationFn, {
  onSuccess: () => {
    // 성공 시 로직
  },
  onError: () => {
    // 에러 시 로직
  },
});

mutate(variables);
```

#### 선호하는 방식

```typescript
const { mutateAsync } = useMutation(mutationFn);

try {
  await mutateAsync(variables);
  // 성공 시 로직
} catch (error) {
  // 에러 시 로직
}
```
