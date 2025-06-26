## TODO
1. npm에 @devchoe/core 같은 패키지 만들고,
2. 이 프로젝트 이름도 @devchoe/core 같은걸로 바꾸고
3. 모든 파일 삭제 후 Vite + Storybook + 기타 유틸파일 (extend/)을 모아서 배포할 예정임.

## 참고되야하는 문서
1. [NPM에 내 패키지 배포하기](https://docs.google.com/document/d/1R69tksVr6Zj72JXBqn_Zj8ev3dTwAYpDJDu3suVu_Zc/edit?tab=t.0#heading=h.go66gxoi0ls)
2. [Vite Overview](https://docs.google.com/document/d/1pwlt-i1HnHojfJaT7P94BBxVQJ6FZUJW1GPYGv0UPZ4/edit?tab=t.0)
3. [Storybook Overview](https://docs.google.com/document/d/1ntfILJiKxujMkit895qpXSrKQqYNwxBLwOqpaLvGm60/edit?tab=t.0#heading=h.foxnveqz2ale)
4. [Test Overview](https://docs.google.com/document/d/1XGxLWBEO-MI266875wTlfoSV4OnD_FCjtCrGLtmLyaM/edit?tab=t.0#heading=h.tw2g4w4hld42)

## Nextjs 라이브러리 제작자를 위한 내용도 숙지해야.
https://nextjs.org/docs/app/getting-started/server-and-client-components#third-party-components
- Advice for Library Authors
- If you’re building a component library, add the "use client" directive to entry points that rely on client-only features. This lets your users import components into Server Components without needing to create wrappers.
- It's worth noting some bundlers might strip out "use client" directives. You can find an example of how to configure esbuild to include the "use client" directive in the React Wrap Balancer and Vercel Analytics repositories.
