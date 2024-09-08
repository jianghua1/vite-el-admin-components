import type { IconProps as IconPropsOrigin } from '@iconify/vue'

export interface IconProps extends /* @vue-ignore */ IconPropsOrigin {}

export interface IconPickerSubmitDataType {
  icon: string
  color: string
  fontSize: number
}

export interface IconListType {
  iconData: string[]
  collection: string
  showText: boolean
  itemClass: string
  iconClass: string
  activeClass: string
}
