"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

/**
 * ThemeProvider Wrapper
 * Menggunakan ThemeProviderProps langsung dari library lebih direkomendasikan
 * untuk memastikan kompatibilitas penuh dengan React 19.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
