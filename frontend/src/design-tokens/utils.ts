// design-tokens/utils.ts
import tokens from "./tokens.json";

// Type definitions for design tokens
export interface DesignTokens {
  color: {
    light: ThemeColors;
  };
  spacing: Record<string, string>;
  typography: {
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
    letterSpacing: Record<string, string>;
  };
  borderRadius: Record<string, string>;
  transition: Record<string, string>;
  shadow: Record<string, string>;
}

export interface ThemeColors {
  primary: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  background: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  border: {
    primary: string;
    secondary: string;
  };
}

// Utility functions to access design tokens
export class DesignTokensUtil {
  private static tokens: DesignTokens = tokens as DesignTokens;

  // Get CSS custom property name
  static getCSSVar(path: string): string {
    const pathMap: Record<string, string> = {
      "color.text.primary": "--color-text-primary",
      "color.text.secondary": "--color-text-secondary",
      "color.text.muted": "--color-text-muted",
      "color.background.primary": "--color-bg-primary",
      "color.background.secondary": "--color-bg-secondary",
      "color.border.primary": "--color-border-primary",
      "color.border.secondary": "--color-border-secondary",
      "color.primary": "--color-primary",
    };

    return `var(${pathMap[path] || `--${path.replace(/\./g, "-")}`})`;
  }

  // Get spacing value
  static getSpacing(size: keyof typeof tokens.spacing): string {
    return this.tokens.spacing[size];
  }

  // Get typography value
  static getFontSize(size: keyof typeof tokens.typography.fontSize): string {
    return this.tokens.typography.fontSize[size];
  }

  static getFontWeight(
    weight: keyof typeof tokens.typography.fontWeight,
  ): string {
    return this.tokens.typography.fontWeight[weight];
  }

  // Get border radius
  static getBorderRadius(size: keyof typeof tokens.borderRadius): string {
    return this.tokens.borderRadius[size];
  }

  // Get transition
  static getTransition(speed: keyof typeof tokens.transition): string {
    return this.tokens.transition[speed];
  }

  // Get shadow
  static getShadow(size: keyof typeof tokens.shadow): string {
    return this.tokens.shadow[size];
  }
}

// Export the tokens for direct access if needed
export { tokens };

// Convenient exports for common use cases
export const spacing = tokens.spacing;
export const typography = tokens.typography;
export const borderRadius = tokens.borderRadius;
export const transition = tokens.transition;
export const shadow = tokens.shadow;
