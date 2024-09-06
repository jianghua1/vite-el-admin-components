import type { IconifyIcon } from '@iconify/vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<T>)
  | (() => Promise<typeof import('*.vue')>)

export interface AppRouteMenuItem {
  // 菜单名（别名）
  name?: string | Symbol
  meta?: RouteMeta
  children?: AppRouteMenuItem[]
  alias?: string
  path: string
  component?: Component
}

export interface RouteMeta extends Record<string | number | symbol, unknown> {
  // 菜单的组件名
  title?: string
  layout?: string
  // 菜单排序
  order?: number
  icon?: string | IconifyIcon
  hideMenu?: boolean
  //禁用
  disabled?: boolean
  // key: string
}

//控制icon的基础样式
export interface IconOptions {
  style: CSSProperties
  class: string
}

export type EmitSelectType = [
  index: string,
  indexPath: string[],
  item: MenuItemClicked,
  routeResult?: Promise<void | NavigationFailure>
]

export type OpenCloseType = [index: string, indexPath: string[]]
