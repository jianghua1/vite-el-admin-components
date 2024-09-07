import type { FormProps } from './types'

export function useForm(props: FormProps) {
  const model = ref<any>()
  const localRules = ref<any>()

  const isUpdatingInternalModel = ref(false)
  const internalModel = ref<any>({})

  onBeforeMount(() => {
    model.value = setForm(props.schema || [])
  })
  function setForm(arr: any[], level = 0) {
    const obj = {}
    let i = 0
    arr.forEach((item) => {
      if (!item.prop) {
        item.prop = `form${level}-${i}`
      }
      if (item.value) {
        obj[item.prop] = item.value
      } else if (item.schema && item.schema.length) {
        obj[item.prop] = setForm(item.schema, level + 1)
        i++
      } else {
        obj[item.prop] = undefined
      }
    })
    return obj
  }

  function setRules(arr: any[]) {
    let formRules = {}
    arr.forEach((item) => {
      if (item.prop && item.rules) {
        formRules[item.prop] = item.rules
      }
      if (item.schema && item.schema.length) {
        formRules = { ...formRules, ...setRules(item.schema) }
      }
    })
    return formRules
  }

  function flatObj(obj) {
    let result = {}
    if (typeof obj !== 'object') return result
    for (const key in obj) {
      if (
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key]) &&
        Object.keys(obj[key]).length
      ) {
        result = { ...result, ...flatObj(obj[key]) }
      } else {
        if (!key.startsWith('form')) {
          result[key] = obj[key]
        }
      }
    }

    return result
  }

  // 初始化schema 变化来更新internalModel
  watch(
    () => props.schema,
    (newSchema) => {
      if (!newSchema) return
      const newModel = setForm(newSchema)
      localRules.value = setRules(props.schema || [])
      isUpdatingInternalModel.value = true
      internalModel.value = newModel
      nextTick(() => {
        isUpdatingInternalModel.value = false
      })
    },
    {
      deep: true,
      immediate: true
    }
  )

  watch(
    model,
    (newValue) => {
      if (!isUpdatingInternalModel.value) {
        // isUpdatingInternalModel - false
        // 说明model的更新来自外侧
        isUpdatingInternalModel.value = true
        internalModel.value = newValue
        nextTick(() => {
          isUpdatingInternalModel.value = false
        })
      }
    },
    {
      deep: true
    }
  )

  watch(
    internalModel,
    (newModel) => {
      if (!isUpdatingInternalModel.value) {
        model.value = newModel
      }
    },
    {
      deep: true
    }
  )

  return {
    model,
    internalModel,
    rules: localRules,
    setForm,
    setRules,
    formValue: computed(() => flatObj(model.value))
  }
}
