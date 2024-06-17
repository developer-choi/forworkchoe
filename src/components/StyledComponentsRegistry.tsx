"use client";

import React, {useState} from "react";
import {useServerInsertedHTML} from "next/navigation";
import {DefaultTheme, ServerStyleSheet, StyleSheetManager, ThemeProvider} from "styled-components";

/**
 * https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components
 * 위 코드를 기준으로, ThemeProvider를 추가하였음.
 */
export default function StyledComponentsRegistry({children}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  const ChildrenWithTheming = (
    <ThemeProvider theme={defaultTheme}>
      {children}
    </ThemeProvider>
  );

  if (typeof window !== "undefined") {
    return ChildrenWithTheming;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {ChildrenWithTheming}
    </StyleSheetManager>
  );
}

const defaultTheme: DefaultTheme = {
  main: "red",
  sub: 'blue'
};
