<template>
  <ul class="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] border-l border-t rounded">
    <li :class="['border-b border-r flex flex-col justify-center items-center cursor-pointer ',
      itemClass]" v-for="(i, index) in iconData" :key="index" @click="handleClick(i, index)">
      <component :is="Icon" :icon="`${collection}:${i}`" :class="[iconClass, { [activeClass]: choose === index }]">
      </component>
      <div v-if="showText" class="text-sm mt-3">{{ i }}</div>
    </li>
  </ul>
</template>
<script setup lang='ts'>

import data from './icon-ep.json';
import { loadIcons, Icon } from '@iconify/vue';
import type { IconListType } from './types';

// import json from '@iconify/json/json/ep.json';
// console.log(Object.keys(json))
// const iconsKeyAndValue = json.icons;
// console.log(Object.keys(iconsKeyAndValue))


const props = withDefaults(defineProps<IconListType>(), {
  iconData: () => data,
  collection: 'ep',
  showText: false,
  itemClass: 'hover:bg-sky-200 py-4',
  iconClass: 'text-3xl',
  activeClass: ''
})


onBeforeMount(async () => {
  await loadIcons(props.iconData)
})

//回调钩子
const emits = defineEmits<{
  'click': [iconName: string]
}>()

const choose = ref(-1)
//点击事件
async function handleClick(iconName: string, index: number) {
  choose.value = index
  emits('click', iconName)
}

</script>
<style scoped></style>