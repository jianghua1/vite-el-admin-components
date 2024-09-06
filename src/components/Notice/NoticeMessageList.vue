<template>
  <!-- tabs -->
  <el-tabs :class="wrapClass" :style="wrapStyle" @tab-click="handleClickTab">
    <el-tab-pane :label="tab.title" v-for="(tab, index) in lists" :key="index">
      <!-- tabs-content -->
      <ul v-if="tab.contents && tab.contents.length">
        <li v-for="(content, index2) in tab.contents" :key="index2">
          <el-row justify="center" align="middle" class="hover:bg-blue-200 py-2">
            <el-col :span="4" align="middle" @click="() => handleClickAvatar(content.avatar! as AvatarProps)"
              v-if="content.avatar">
              <!-- 头像 -->
              <el-avatar v-bind="Object.assign({ size: 'small' }, content.avatar)" />
            </el-col>
            <el-col :span="20" @click="() => handleClickItem(content)">
              <!-- 消息 -->
              <el-row align="middle" class="flex-nowrap! mb-2">
                <!-- 消息标题 -->
                <div class="text-base line-clamp-1">
                  {{ content.title }}
                </div>
                <el-tag v-if="content.tag" type="danger" size="small" class="ml-2" v-bind="content.tagProps">{{
                  content.tag }}</el-tag>
              </el-row>
              <el-row v-if="content.content">
                <!-- 消息正文 -->
                <div class="text-sm text-gray mb-2 line-clamp-2">
                  {{ content.content }}
                </div>
              </el-row>
              <el-row v-if="content.time">
                <!-- 消息时间 -->
                <div class="text-sm text-gray-500">{{ content.time }}</div>
              </el-row>
            </el-col>
          </el-row>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
  <!-- buttons -->
  <div class="flex w-full justify-around border-t">
    <div class="py-3 border-r flex-1 flex justify-center items-center hover:bg-sky-200 cursor-pointer"
      v-for="(action, index) in actions" :key="index" @click="action.click">
      <Iconify v-if="action.icon" :icon="action.icon" :color="action.color" :style="action.style"></Iconify>
      <span class="ml-2">{{ action.title }}</span>
    </div>
  </div>
</template>
<script setup lang='ts'>
import type { TabsPaneContext } from 'element-plus'

import type { AvatarProps } from 'element-plus'
import type { MessageListItem, NoticeMessageListProps } from './types'
// import { Iconify } from '../Icon/Iconify.vue';


const props = defineProps<NoticeMessageListProps>()
//事件传递
const emits = defineEmits<{
  clickAvatar: [avatar: AvatarProps]
  clickItem: [item: MessageListItem]
  clickTab: [tab: TabsPaneContext, event: Event]
}>()
const handleClickAvatar = (avatar: AvatarProps) => {
  emits('clickAvatar', avatar)
}
const handleClickItem = (item: MessageListItem) => {
  emits('clickItem', item)
}
const handleClickTab = (tab: TabsPaneContext, event: Event) => {
  emits('clickTab', tab, event)
}
</script>
<style scoped lang="scss">
:deep(.el-tabs__nav) {
  padding-left: 10px;
}

:deep(.el-tabs__content) {
  padding-left: 10px;
  padding-right: 10px;
}
</style>