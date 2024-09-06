import { init } from 'echarts/core'
import type { SetOptionOpts, EChartsOption } from 'echarts'
import type { CSSProperties } from 'vue'

type InitType = typeof init
export type InitParameter = Parameters<InitType>
export type Theme = NotNullable<InitParameter[1]>
export type InitOptions = NotNullable<InitParameter[2]>
export type UpdateOptions = SetOptionOpts

type AutoresizeProp =
  | boolean
  | {
      throttle?: number
      onResize?: () => void
    }

export type LoadingOptions = {
  text?: string
  textColor?: string
  fontSize?: number | string
  fontWeight?: number | string
  fontStyle?: string
  fontFamily?: string
  maskColor?: string
  showSpinner?: boolean
  color?: string
  spinnerRadius?: number
  lineWidth?: number
  zlevel?: number
}

export interface VEchartsProps {
  option: typeof EChartsOption
  theme: {
    type: Theme
  }
  initOptions: InitOptions
  updateOptions: UpdateOptions
  group: string
  manualUpdate: boolean
  autoresize: AutoresizeProp
  loading: boolean
  loadingOptions: LoadingOptions
}

export interface VueEchartsProps extends Partial<VEchartsProps> {
  theme?: 'dark' | 'default' | string
  style?: CSSProperties
  height?: string | number
  charts: string
  components?: string[]
}
