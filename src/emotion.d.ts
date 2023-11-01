import '@emotion/react';
import { Theme as DesignTheme } from './library';

declare module '@emotion/react' {
  export interface Theme extends DesignTheme {}
}
