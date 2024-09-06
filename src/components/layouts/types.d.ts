import type { AvatarMenuProps } from '../Avatar/types'
import type { ThemeSettingsProps } from '../Themes/types'

export interface HeaderProps extends Partial<AvatarMenuProps> {
  collapse: boolean
  settings?: ThemeSettingsProps
}

export enum TabActions {
  closeOthers = 'close-others',
  closeLeft = 'close-left',
  closeRight = 'close-right',
  closeAll = 'close-all'
}
