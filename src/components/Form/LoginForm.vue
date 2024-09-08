<template>
  <!-- <div class="self-center bg-white shadow rounded p-4"> -->
  <!-- title -->
  <!-- <div class="text-2xl mb-10"> {{ title }}</div> -->
  <!-- 表单 -->
  <el-form :model="form" class="min-w-[450px]" :rules="rules" ref="formRef">
    <el-form-item prop="username" trim>
      <el-input v-model="form.username" placeholder="请输入手机号/账号" :prefix-icon="getIcon('ep:user')" />
    </el-form-item>
    <el-form-item prop="password" trim>
      <el-input v-model="form.password" placeholder="请输入密码" :prefix-icon="getIcon('ep:lock')" type="password" />
    </el-form-item>
    <el-form-item prop="repassword" trim>
      <el-input v-model="form.repassword" placeholder="请再次输入密码" :prefix-icon="getIcon('ep:lock')" type="password" />
    </el-form-item>
    <el-row class="items-center justify-between">
      <el-form-item prop="remeber">
        <el-checkbox label="记住账号" name="type" v-model="form.remeber"></el-checkbox>
      </el-form-item>
      <el-link type="primary">注册账号</el-link>
    </el-row>
    <!-- 登录 -->
    <el-form-item>
      <el-button type="primary" class="w-full mt-4" @click="onSubmit()">登录</el-button>
    </el-form-item>
  </el-form>
  <!-- 第三方登录 -->
  <!-- 第三方登录的做法就是贴图标，然后图标上绑定跳转连接就可以了 -->
  <el-divider direction="horizontal" class="mt-10">
    <span class="text-gray-500">其他登录方式</span>
  </el-divider>
  <div class="flex justify-around">
    <Iconify :icon="item.icon" class="cursor-pointer text-2xl text-gray-200 hover:text-sky-500"
      v-for="(item, index) in loginItems" :key="index" @click="handleClickItem(item)"></Iconify>
  </div>
  <!-- </div> -->
</template>

<script setup lang='tsx'>
import Iconify from '../Icon/Iconify.vue'
import type { LoginFormInterface, LoginFormProps, LoginItem } from './types';
import type { FormInstance, FormRules } from 'element-plus'

withDefaults(defineProps<LoginFormProps>(), {

})

const formRef = ref<FormInstance>()
const form = reactive<LoginFormInterface>({
  username: '',
  password: '',
  repassword: '',
  phone: '',
  email: '',
  code: '',
  remeber: false
})

const rules = reactive<FormRules<LoginFormInterface>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 6, max: 16, message: '用户名的长度在6-10位之间', trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    { min: 6, max: 32, message: '密码最少6位', trigger: ['blur', 'change'] }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: ['blur', 'change'] },
    { validator: (rule: any, value: string) => value === form.password, message: '两次输入的密码不一致', trigger: ['blur'] }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur' }
  ],
  remeber: [
    { type: 'boolean', required: true, message: '请记住账号', trigger: 'change' }
  ]
})

const onSubmit = (form: any) => {
  if (formRef.value) {
    formRef.value.validate((valid: any) => {
      if (valid)
        emits('submit', form)
    })
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const emits = defineEmits(['clickIcon', 'submit'])

function getIcon(icon: string) {
  return () => <Iconify icon={icon} > </Iconify>
}

const handleClickItem = (item: LoginItem) => {
  // window.open(url)
  emits('clickIcon', item.url)
}

</script>
<style lang="scss" scoped>
:deep(.el-form-item__content) {
  margin-left: 0px !important;
}
</style>