<template>
  <i :class="className"></i>
</template>

<script setup lang='ts'>
//格式： fontFamily prefix type
const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: 'iconfont-'
  },
  fontFamily: {
    type: String,
    default: 'iconfont'
  },
  type: {
    type: String,
    default: ''
  }
})

onBeforeMount(() => {
  // 异步获取字体并添加到页面
  if (props.url) {
    const existingLink = document.querySelector(`link[href="${props.url}"]`)
    if (existingLink) return
    const link = document.createElement('link')
    link.href = props.url
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
})

const className = computed(() => `${props.fontFamily} ${props.prefix} ${props.type}`)
</script>
<style scoped></style>