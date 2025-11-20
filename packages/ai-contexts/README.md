# @forworkchoe/ai-contexts

> AI Coding Assistant(Gemini, Copilot 등)를 위한 프롬프트 컨텍스트(Context)를 관리하고 배포하는 패키지입니다.

---

## Motivation

여러 프로젝트를 진행하다 보면, AI에게 매번 동일한 Context를 설명해야했습니다.

이 패키지는 이러한 **'Context'를 한곳에서 관리**하고, 패키지 설치만으로 모든 프로젝트에 **동일한 규칙을** 적용하기 위해 만들었습니다.

> *Note: 개인적인 필요에 의해 고안된 Experimental Approach 이며, 더 나은 방법론이 발견되면 변경될 수 있습니다.*

---

## How it works

이 패키지는 **`postinstall` 스크립트**를 통해 작동합니다.
패키지를 설치하는 즉시, 내장된 컨텍스트 파일(`.md`)들이 프로젝트의 특정 경로로 **자동 복사**됩니다.

1. 이 리포지토리의 `/docs/gemini` 폴더에서 컨벤션을 작성합니다.
2. 이 패키지를 설치한 프로젝트는 `postinstall` 훅이 트리거됩니다.
3. 정의된 `.md` 파일들이 대상 프로젝트의 `/docs/gemini` 경로로 자동 복사됩니다.