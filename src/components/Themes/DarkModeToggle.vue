<template>
  <el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny"
    style="--el-switch-on-color:#333" />
</template>

<script setup lang='ts'>
const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['change'])

const Moon = () => h('i', {
  class: 'i-prime-moon'
})
const Sunny = () => h('i', {
  class: 'i-octicon-sun-24'
})
const isDark = useStorage('dark-mode-flag', props.dark)
// 在页面加载时设置为浅色主题
const preferredDark = usePreferredDark()

function toggleMode(flag: boolean) {
  if (flag) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

watch(isDark, () => {
  nextTick(() => {
    toggleMode(isDark.value)
    emits('change', isDark)
  })
}, {
  immediate: true
})

watch(preferredDark, () => {
  nextTick(() => {
    toggleMode(preferredDark.value)
    //当修改系统主题时，主题组件的颜色要跟着变
    isDark.value = preferredDark.value
  })
})

</script>
<style scoped></style>