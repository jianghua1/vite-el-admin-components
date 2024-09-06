<template>
  <div>
    <router-view />
  </div>
  <AvatarList :images="images"></AvatarList>
</template>
<script setup lang="ts">
import { AvatarList } from 'el-admin-components';

const images = ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg']
</script>

<style scoped></style>
