<template>
  <div>
    <VpAudioPlayer :title="title" :options="options" ref="audioRef" @next="handleNext" @prev="handlePrev"
      @mode="handleMode"></VpAudioPlayer>
  </div>
</template>

<script setup lang="ts">
import { useAudioPlayer } from 'el-admin-components'
// import { Howler } from 'howler'
import { ref, watch } from 'vue'

const audioRef = ref<any>()
const title = ref('')

// 音乐列表
const lists = ref([
  {
    src: 'https://toimc-online.static.toimc.com/vue-toimc-admin/music/%E5%A6%82%E6%84%BF.mp3',
    title:
      '如愿 - Cover王菲,如愿 - Cover王菲如愿 - Cover王菲如愿 - Cover王菲如愿 - Cover王菲如愿 - Cove.. - Co----123123123'
  },
  {
    src: 'https://toimc-online.static.toimc.com/vue-toimc-admin/music/%E5%AD%A4%E5%8B%87%E8%80%85.mp3',
    title:
      '孤勇者 - Cover陈奕迅孤勇者 - Cover陈奕迅孤勇者 - Cover陈奕迅孤勇者 - Cover陈奕迅1111_____-孤勇者 - Cover陈奕迅孤勇者 - Cover陈奕迅孤勇者 - Cover陈奕迅'
  },
  {
    src: 'https://toimc-online.static.toimc.com/vue-toimc-admin/music/%E7%88%B1%E4%BD%A0.mp3',
    title: '爱你 - 王心凌'
  },
  {
    src: 'https://toimc-online.static.toimc.com/vue-toimc-admin/music/%E9%9D%92%E9%B8%9F%EF%BC%88%E3%83%95%E3%82%99%E3%83%AB%E3%83%BC%E3%83%8F%E3%82%99%E3%83%BC%E3%83%88%E3%82%99%EF%BC%89.mp3',
    title: '青鸟（ブルーバード） - 生物股长'
  },
  {
    src: 'https://toimc-online.static.toimc.com/vue-toimc-admin/music/%E5%85%89%E8%BE%89%E5%B2%81%E6%9C%88.mp3',
    title: '光辉岁月 - Beyond'
  }
])

const options = ref({
  src: ''
} as any)

const { current, handleMode, handleNext, handlePrev } = useAudioPlayer(lists.value)

watch(
  current,
  (newVal: number) => {
    options.value.src = lists.value[newVal || 0].src
    title.value = lists.value[newVal || 0].title
  },
  {
    immediate: true
  }
)
</script>

<style scoped></style>
