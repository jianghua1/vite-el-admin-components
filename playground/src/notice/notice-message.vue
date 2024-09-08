<template>
  <div>通知组件示例</div>
  <!-- <NoticeNotification value="1234" color="" size="9"></NoticeNotification> -->
  <Notice :actions="actions" :lists="lists" wrap-class="w-[300px]" @click-item="handleClickItem"
    @click-avatar="handleClickAvatar"></Notice>
</template>

<script setup lang='ts'>
import type { NoticeActionsItem, NoticeMessageListOptions } from "@/components/Notice/types";

const actions = ref<NoticeActionsItem[]>([
  { title: '清空', icon: 'ep:delete', click: () => console.log('清空') },
  { title: '更多', icon: 'ep:more', click: () => console.log('更多') }
])
const lists = ref<NoticeMessageListOptions[]>([
  {
    title: '通知1',
    contents: [
      { title: '通知标题', content: '通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文', time: '2022-12-12 12:12:12', tag: '紧急', tagProps: { type: 'danger' }, avatar: { src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' } },
      { title: '通知标题2', content: '通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文通知正文', time: '2022-12-12 12:12:12', tagProps: { type: 'danger' }, avatar: { src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' } }
    ]
  }, {
    title: '通知2',
    contents: [
      {
        title: '通知标题2', content: '通知正文2', time: '2022-12-12 12:12:12', tag: '重要', tagProps: { type: 'warning' }, avatar: {
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
      }
    ]
  }
])
const handleClickItem = (item: any) => {
  alert(111)
}
const handleClickAvatar = (avater: any) => {
  alert(222)
}
</script>
<style scoped></style>