import { TransitionNameEnum } from './const'
export interface ThemeSettingsProps {
  theme: string
  backgroundColor: string
  darkMode: boolean
  menuWidth?: number
  showLogo: boolean
  showTabs: boolean
  fixedHead: boolean
  showBreadcrumb: boolean
  mode: 'siderbar' | 'mix' | 'top' | 'mixbar'
  //动画过渡效果
  transition: TransitionNameEnum
}
