<!-- 展示所有icon -->
<template>
  <el-switch v-model="copyTypeFlag" active-text="复制SVG图标数据" inactive-text="复制Icon名称">
  </el-switch>
  <IconList @click="handleClick" :collection="iconPrefix" :show-text="showTextFlag"></IconList>
</template>
<script setup lang='ts'>
import { loadIcon } from '@iconify/vue';
//可省略
import { useClipboard } from '@vueuse/core';
import { ref } from 'vue';


//开关 true - CopySvgData false - CopyIconName
const copyTypeFlag = ref(false)
const showTextFlag = ref(true)

const source = ref('')
const iconPrefix = ref('ep')
const { copied, copy } = useClipboard({
  source: source
})
async function handleClick(iconName: string) {
  if (copyTypeFlag.value) {
    const svgData = await loadIcon(iconPrefix.value + ":" + iconName)
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

function definePage(arg0: { meta: { title: string; icon: string; }; }) {
throw new Error('Function not implemented.');
}

function ElMessage(arg0: { message: string; type: string; }) {
throw new Error('Function not implemented.');
}
<style scoped></style>