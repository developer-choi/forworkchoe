# Forworkchoe Monorepo

> 개인 프로젝트의 생산성 향상과 코드 재사용성을 높이기 위해 구축된 모노레포(Monorepo)입니다.

---

## Workspaces Overview

이 저장소는 `Yarn Workspaces`를 기반으로 구성되어 있으며, 크게 두 가지 핵심 패키지를 관리합니다.

### 1. @forworkchoe/core
> 재사용 가능한 UI 컴포넌트, Hooks, Utils 모음

### 2. @forworkchoe/ai-contexts
> AI Coding Assistant를 위한 Context 관리 도구

* Goal: AI에게 매번 설명해야 하는 규칙을 한곳에서 관리하고, 패키지 설치만으로 다른 프로젝트에 적용합니다.
* Mechanism: 패키지 설치 시 `postinstall` 스크립트가 작동하여, 정의된 컨벤션 파일(`.md`)을 대상 프로젝트로 자동 복사합니다.
