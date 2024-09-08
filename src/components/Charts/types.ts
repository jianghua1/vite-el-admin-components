import { init } from 'echarts/core'
import * as echarts from 'echarts'

import type { CSSProperties } from 'vue'
import type { SetOptionOpts } from 'echarts'

type InitType = typeof init
export type InitParameter = Parameters<InitType>
export type Theme = NonNullable<InitParameter[1]>
export type InitOptions = NonNullable<InitParameter[2]>
export type UpdateOptions = SetOptionOpts

export type EChartsOption = echarts.EChartsOption

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
  option: EChartsOption
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
