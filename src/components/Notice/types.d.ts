import type { IconifyIcon, IconProps } from '@iconify/vue'
import { BadgeProps } from 'element-plus'

import type { AvatarProps, TagProps } from 'element-plus'
export interface NotificationProps extends Partial<BadgeProps> {
  icon: string | IconifyIcon
  size: number
  color: string
  // 之所以是可选的是因为默认可以是黑白的
  iconSize?: number
  iconColor?: string
}
//用于定义NoticeMessageList组件用到的所有数据
export interface NoticeMessageListProps {
  lists: NoticeMessageListOptions[]
  actions: NoticeActionsItem[]
  wrapClass?: string
  wrapStyle?: string
}

export interface NoticeProps extends Partial<NotificationProps>, NoticeMessageListProps {}
//通知消息合集
export interface NoticeMessageListOptions {
  title: string
  contents?: MessageListItem[]
}

//每条通知消息
export interface MessageListItem {
  avatar?: Partial<AvatarProps>
  title: string
  content?: string
  time?: string
  tagProps?: Partial<TagProps>
  tag?: string
}
//操作按钮的图标和文字
export interface NoticeActionsItem extends IconProps {
  title: string
  click: () => void
}
