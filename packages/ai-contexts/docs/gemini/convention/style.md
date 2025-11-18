## SCSS 사용

**CSS Modules**
```scss
// index.module.scss
.container {
  display: flex;
  align-items: center;

  &:nth-of-type(even) {
    background-color: aliceblue;
  }

  > a {
    text-decoration: underline;
  }
}

.loading {
  cursor: progress;
}
```

**@use 지시어 (구식 @import 대신)**
```scss
@use "@/styles/util";
@use "@/styles/color";

.button {
  background-color: color.$primary;
  padding: util.spacing(2);
}
```

**Mixin 활용**
```scss
@mixin cursorByState {
  cursor: pointer;

  &.loading {
    cursor: progress;
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.button {
  @include cursorByState;
}
```

## classnames 라이브러리

```typescript
import classNames from 'classnames';
import styles from './index.module.scss';

// ✅ Good
<div className={classNames(styles.container, {
  [styles.error]: error,
  [styles.disabled]: disabled
})} />

<button className={classNames(styles.button, className)} />
```