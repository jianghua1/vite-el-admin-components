<template>
  <el-breadcrumb :separator-icon="ArrowRight" class="ml-4" ref="breadcrumbRef">

    <transition-group name="breadcrumb">
      <!-- <transition-group name="breadcrumb" @enter="onEnter" :css="false"> -->
      <el-breadcrumb-item :to="{ path: item.name }" v-for="(item, index) in breadcrumnData" :key="item.name"
        :data-index="index">
        <span>
          {{ item.meta?.title }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang='tsx'>
import { useRoute } from 'vue-router/auto'
import gsap from 'gsap'
//获取页面路由
const route = useRoute()
const localData = ref()
const change = ref(-1)
//右箭头
const ArrowRight = () => <i class="i-ep:arrow-right"></i>

const breadcrumnData = ref<any>([])

const breadcrumbRef = ref()

function getBreadcrumnData() {
  breadcrumnData.value = route.matched.filter(item => item.name && item.meta && item.meta.title)
  localData.value = route.matched.filter(item => item.name && item.meta && item.meta.title)
}
//当高度超过两行，就删除面包屑数组当中的一个根元素
useResizeObserver(breadcrumbRef, (entires) => {
  const { height } = entires[0].contentRect
  if (height > 14) {
    breadcrumnData.value.shift()
  }
})
//当宽度处于扩大趋势时
const oldWidth = ref(-1)
//放抖动处理
const fn = useThrottleFn(entires => {
  const { width } = entires[0].contentRect
  if (oldWidth.value === -1) oldWidth.value = width
  //屏幕处于扩大趋势时
  if (width > oldWidth.value) {
    if (breadcrumbRef.value.$el.offsetHeight <= 14) {
      let item
      if (breadcrumnData.value.length > 0) {
        const index = localData.value.findIndex(item => item === breadcrumnData.value[0])
        item = localData.value[index - 1 <= 0 ? 0 : index - 1]
      } else {
        //我们这里不存在，作者的页面时可以压到面包屑元素都没有的
        item = localData.value[localData.value.length - 1]
      }
      //若当前元素不在面包屑数组当中，就添加
      if (breadcrumnData.value.indexOf(item) === -1) {
        breadcrumnData.value.unshift(item)
      }
    }
  }
  oldWidth.value = width
}, 500)

useResizeObserver(document.body, fn)

function onEnter(el, done) {
  let index = el.dataset.index
  if (change.value === 1) {
    index = 1
  }
  gsap.fromTo(
    el,
    {
      opacity: 0,
      x: 30
    }, {
    opacity: 1,
    x: 0,
    delay: index * 0.15,
    onComplete: done
  })
}

watch(route, () => {
  getBreadcrumnData()
},
  { immediate: true }
)

watch(breadcrumnData, (newValue, oldValue) => {
  change.value = 0
  for (let i = 0; i < Math.max(newValue.length, oldValue.length); i++) {
    if (newValue.length < i || oldValue.length < i || newValue[i] == oldValue[i]) {
      change.value++
    }
  }
})
</script>
<style scoped lang="scss">
.breadcrumb-move,
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>