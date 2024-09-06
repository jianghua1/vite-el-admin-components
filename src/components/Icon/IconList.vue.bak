<template>
  <div>
    <el-switch v-model="copyTypeFlag" active-text="复制SVG图标数据" inactive-text="复制Icon名称">
    </el-switch>
  </div>
  <ul class="flex flex-wrap border rounded">
    <li @click="clickHandler(i)"
      class="w-1/8 border-b border-r flex flex-col justify-center items-center cursor-pointer hover:bg-sky-200"
      v-for="(i, index) in iconData" :key="index">
      <component :is="Icon" :icon="'ep:' + i" class="text-3xl mb-3"></component>
      <div>{{ i }}</div>
    </li>
  </ul>
</template>
<script setup lang='ts'>
import { loadIcons, Icon, loadIcon } from '@iconify/vue';
import iconData from './icon-ep.json';
import { useClipboard } from '@vueuse/core';
// import json from '@iconify/json/json/ep.json';
// console.log(Object.keys(json))
// const iconsKeyAndValue = json.icons;
// console.log(Object.keys(iconsKeyAndValue))
onBeforeMount(async () => {
  await loadIcons(iconData)
})
//icon前缀
const prefix = 'ep:'
//开关 true - CopySvgData false - CopyIconName
const copyTypeFlag = ref(false)

const source = ref('')
const { copy, copied } = useClipboard({ source });
//点击事件
async function clickHandler(iconName: string) {
  if (copyTypeFlag.value) {
    const svgData = await loadIcon(prefix + iconName)
    source.value = objectToSvg(svgData);
  } else {
    source.value = iconName;
  }
  copy()
  copied && ElMessage({
    message: '复制工程',
    type: 'success',
  })
}


function objectToSvg(svgObject: any) {
  const { body, hFtip, height, left, rotate, top, vFtip, width } = svgObject
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" 
  transform="translate(${left},${top})
  rotate (${rotate}) ${hFtip ? ' scale(—1,1)' : ''}
                     ${vFtip ? ' scale(1,-1)' : ''}">
          ${body}
  </svg>`
  return svgString
}

</script>
<style scoped></style>