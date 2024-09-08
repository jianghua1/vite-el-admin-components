import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
//export * from './components-types'
// append-by-scripts
import AvatarList from './components/Avatar/AvatarList.vue'
import AvatarMenu from './components/Avatar/AvatarMenu.vue'
import VueEcharts from './components/Charts/VueEcharts.vue'
import Editor from './components/Editor/Editor.vue'
import LoginForm from './components/Form/LoginForm.vue'
import VForm from './components/Form/VForm.vue'
import VFormItem from './components/Form/VFormItem.vue'
import VFormLayout from './components/Form/VFormLayout.vue'
import HelloWorld from './components/HelloWorld.vue'
import IconFontIcon from './components/Icon/IconFontIcon.vue'
import Iconify from './components/Icon/Iconify.vue'
import IconList from './components/Icon/IconList.vue'
import IconPicker from './components/Icon/IconPicker.vue'
import NetIcon from './components/Icon/NetIcon.vue'
import SvgIcon from './components/Icon/SvgIcon.vue'
import Header1 from './components/layouts/Header1.vue'
import HeaderTabs from './components/layouts/HeaderTabs.vue'
import DropDown from './components/Menu/DropDown.vue'
import Menu from './components/Menu/Menu.vue'
import MenuItem from './components/Menu/MenuItem.vue'
import SubMenu from './components/Menu/SubMenu.vue'
import Notice from './components/Notice/Notice.vue'
import NoticeMessageList from './components/Notice/NoticeMessageList.vue'
import Notification from './components/Notice/Notification.vue'
import Popover from './components/Table/Popover.vue'
import VTable from './components/Table/VTable.vue'
import VTableColumn from './components/Table/VTableColumn.vue'
import Breadcrumb from './components/Themes/Breadcrumb.vue'
import DarkModeToggle from './components/Themes/DarkModeToggle.vue'
import FullScreen from './components/Themes/FullScreen.vue'
import ThemeSetting from './components/Themes/ThemeSetting.vue'

export const globalPlugin = {
  install(app: any) {
    app.component('AvatarList', AvatarList)
    app.component('AvatarMenu', AvatarMenu)
    app.component('VueEcharts', VueEcharts)
    app.component('Editor', Editor)
    app.component('LoginForm', LoginForm)
    app.component('VForm', VForm)
    app.component('VFormItem', VFormItem)
    app.component('VFormLayout', VFormLayout)
    app.component('HelloWorld', HelloWorld)
    app.component('IconFontIcon', IconFontIcon)
    app.component('Iconify', Iconify)
    app.component('IconList', IconList)
    app.component('IconPicker', IconPicker)
    app.component('NetIcon', NetIcon)
    app.component('SvgIcon', SvgIcon)
    app.component('Header1', Header1)
    app.component('HeaderTabs', HeaderTabs)
    app.component('DropDown', DropDown)
    app.component('VMenu', Menu)
    app.component('MenuItem', MenuItem)
    app.component('SubMenu', SubMenu)
    app.component('Notice', Notice)
    app.component('NoticeMessageList', NoticeMessageList)
    app.component('Notification', Notification)
    app.component('Popover', Popover)
    app.component('VTable', VTable)
    app.component('VTableColumn', VTableColumn)
    app.component('Breadcrumb', Breadcrumb)
    app.component('DarkModeToggle', DarkModeToggle)
    app.component('FullScreen', FullScreen)
    app.component('ThemeSetting', ThemeSetting)
  }
}

export default globalPlugin
export {
  AvatarList,
  AvatarMenu,
  VueEcharts,
  Editor,
  LoginForm,
  VForm,
  VFormItem,
  VFormLayout,
  HelloWorld,
  IconFontIcon,
  Iconify,
  IconList,
  IconPicker,
  NetIcon,
  SvgIcon,
  Header1,
  HeaderTabs,
  DropDown,
  Menu,
  MenuItem,
  SubMenu,
  Notice,
  NoticeMessageList,
  Notification,
  Popover,
  VTable,
  VTableColumn,
  Breadcrumb,
  DarkModeToggle,
  FullScreen,
  ThemeSetting
}

export { useForm } from './components/Form/useForm'
export { useMenu } from './components/Menu/useMenu'
export * from './components-types'
