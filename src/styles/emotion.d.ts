import '@emotion/react'
import colors from '../gatsby-plugin-theme-ui/colors'
import { colorModeTransition, fonts } from '..//gatsby-plugin-theme-ui/index'

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    colorModeTransition: typeof colorModeTransition;
    fonts: typeof fonts;
  }
}