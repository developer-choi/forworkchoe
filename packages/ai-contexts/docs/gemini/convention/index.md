# Convention

## 주석 작성 스타일

**예외 상황 문서화**
```typescript
/**
 * @throws {RangeError} Stack overflow
 */
abstract push(data: D): void;

/**
 * @throws {RangeError} Stack underflow
 */
abstract pop(): D;
```

### 테스트 파일 상단 실행 명령어

```typescript
// yarn test src/algorithm/sort/sort.test.ts
// yarn test src/data-structure/stack/index.test.ts

describe('Sorting Algorithm', () => {
  // ...
});
```
