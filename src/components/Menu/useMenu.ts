import type { AppRouteMenuItem } from './types'
import path from 'path'

export function useMenu() {
  function filterAndOrderMenus(menus: AppRouteMenuItem[]) {
    menus.forEach((item) => {
      if (item.children && Array.isArray(item.children) && item.children.length > 0) {
        item.children = filterAndOrderMenus(item.children)
      }
      item.meta = {
        ...item.meta,
        order: item.meta?.order ?? 100
      }
    })

    return menus
      .filter((m) => !m.meta?.hideMenu)
      .sort((a, b) => {
        const orderA = a.meta?.order ?? 100
        const orderB = b.meta?.order ?? 100
        return orderA - orderB
      })
      .map((item) => ({ ...item }))
  }
  function generateMenuKeys(menus: AppRouteMenuItem[], level = '0') {
    //过滤被隐藏的菜单
    const filteredMenus = filterAndOrderMenus(menus)
    let i = 1
    filteredMenus.forEach((item) => {
      //通过index中是否存在-来判断是否是第一级菜单
      const key = level.indexOf('-') !== -1 ? `${level}-${i}` : `${i}`

      item.meta = {
        ...item.meta,
        key
      }
      i++
      //如存在子菜单，则递归调用当前方法
      if (item.children && item.children.length > 0) {
        return (item.children = generateMenuKeys(item.children, `${key}-`))
      }
    })
    return filteredMenus
  }

  function getItemCondition(menus: AppRouteMenuItem[], fn: (ietm: AppRouteMenuItem) => boolean) {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i]
      if (fn(menu)) {
        return menu
      } else {
        if (menu.children && Array.isArray(menu.children) && menu.children.length > 0) {
          const item = getItemCondition(menu.children!, fn) as AppRouteMenuItem | undefined
          if (item) {
            return item
          }
        }
      }
    }
  }

  function getItem(menus: AppRouteMenuItem[], index: string) {
    // for (let i = 0; i < menus.length; i++) {
    //   const menu = menus[i]
    //   if (menu.meta?.key === index) {
    //     return menu
    //   } else {
    //     if (menu.children && Array.isArray(menu.children) && menu.children.length > 0) {
    //       const item = getItem(menu.children!, index) as AppRouteMenuItem | undefined
    //       if (item) {
    //         return item
    //       }
    //     }
    //   }
    // }
    return getItemCondition(menus, (item) => item.meta?.key === index)
  }

  /**
   * 获取顶级菜单
   * @param menus
   */
  function getTopMenus(menus: AppRouteMenuItem[]) {
    const filteredMenus = filterAndOrderMenus(menus)
    return filteredMenus.map((item) => {
      delete item.children
      return item
    })
  }
  /**
   * 获取子菜单
   * @param menus
   */
  function getSubMenus(menus: AppRouteMenuItem[]) {
    //获取菜单的路由
    const route = useRoute()
    const path = computed(() => {
      if (route.path === '/') return '/'
      const rootPath = route.path.split('/')[1] ?? '/'
      return rootPath ? `/${rootPath}` : '/'
    })
    const filteredMenus = filterAndOrderMenus(menus)
    return filteredMenus.find((menu) => menu.path === path.value)?.children || []
  }
  /**
   * 获取当前菜单的父级菜单
   * @param menus
   */
  function getParentMenu(menus: AppRouteMenuItem[]): AppRouteMenuItem | undefined {
    //获取菜单的路由
    const route = useRoute()
    const path = computed(() => route.path)
    return getItemCondition(menus, (item) => {
      const arr = path.value.split('/')
      if (arr.length < 3) return false
      arr.pop()
      return arr.join('/') === item.name
    })
  }

  function getIndex(item: AppRouteMenuItem): string {
    return `${item.meta?.key}`
  }

  function menuHasChildren(item: AppRouteMenuItem): boolean {
    //有子菜单的判断：当前菜单没有被隐藏，当前菜单的children属性是数组，并且数组内容不为空
    return !item.meta?.hideMenu && Array.isArray(item.children) && item.children.length > 0
  }
  //是将函数名称暴漏出去
  return {
    generateMenuKeys,
    getTopMenus,
    getSubMenus,
    getItem,
    getParentMenu,
    getIndex,
    menuHasChildren
  }
}
