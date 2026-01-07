import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Deep merge utility for objects
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      const existingValue = result[key];
      if (existingValue && typeof existingValue === 'object' && !Array.isArray(existingValue)) {
        result[key] = deepMerge(
          existingValue as Record<string, any>,
          source[key] as any
        ) as T[Extract<keyof T, string>];
      } else {
        result[key] = { ...(source[key] as Record<string, any>) } as T[Extract<keyof T, string>];
      }
    } else if (source[key] !== undefined) {
      result[key] = source[key] as T[Extract<keyof T, string>];
    }
  }

  return result;
}
