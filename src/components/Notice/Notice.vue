<template>
  <div>
    <el-dropdown trigger="click">
      <span>
        <Notification v-bind="$props"></Notification>
      </span>
      <template #dropdown>
        <Lists :lists="lists" :actions="actions" :wrap-class="wrapClass" :wrap-style="wrapStyle" v-bind="$attrs">
        </Lists>
      </template>
    </el-dropdown>

  </div>
</template>

<script setup lang='ts'>
import type { AvatarProps, TabsPaneContext } from 'element-plus';
import Lists from './NoticeMessageList.vue'
import Notification from './Notification.vue'
import type { NoticeProps, MessageListItem } from './types'


const props = defineProps<NoticeProps>()
//事件传递
const emits = defineEmits<{
  clickAvatar: [avatar: AvatarProps]
  clickItem: [item: MessageListItem]
  clickTab: [tab: TabsPaneContext, event: Event]
}>()

const forwardedEvents = {
  clickAvatar: (avatar: AvatarProps) => emits('clickAvatar', avatar),
  clickItem: (item: MessageListItem) => emits('clickItem', item),
  clickTab: (tab: TabsPaneContext, event: Event) => emits('clickTab', tab, event)
}

const filterdProps = computed(() => {
  const { actions, lists, ...restProps } = props
  return [restProps]
})

</script>
<style scoped></style>