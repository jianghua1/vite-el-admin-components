<template>
  <v-chart v-bind="props" :style="computedStyle" />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import * as Charts from 'echarts/charts'
import * as ChartsComponents from 'echarts/components'
import * as ChartsFeatures from 'echarts/features'
import VChart from "vue-echarts"
import type { VueEchartsProps } from "./types"
import { CHARTS_MAP, COMPONENTS_MAP } from "./const"



const props = withDefaults(defineProps<VueEchartsProps>(), {
  autoresize: true,
  theme: 'default',
  height: '400px'
  // components: () => [
  //   'TitleComponent',
  //   'TooltipComponent',
  //   'LegendComponent',
  //   'AriaComponent',
  //   'GridComponent'
  // ]
})

const computedStyle = computed(() => {
  let style = {} as Record<string, any>
  if (props.theme && props.theme.startsWith('#')) {
    style = { backgroundColor: props.theme }
  }
  style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  return { ...style, ...props.style }
})

if (import.meta.env.MODE !== 'production') {
  onBeforeMount(() => {
    let deps: string[] = []
    if (props.option) {
      Object.keys(props.option).forEach(key => {
        if (COMPONENTS_MAP[key]) {
          deps.push(COMPONENTS_MAP[key]);
        }
      })
    }

    if (props.components) {
      deps = props.components
    }

    let type = 'pie'
    let series = Array.isArray(props.option.series) ? props.option.series[0] : props.option.series
    type = series.type

    let features: string[] = []
    if (series.labelLayout) {
      features.push('labelLayout')
    }
    if (series.universalTransition) {
      features.push('UniversalTransition')
    }
    use([
      CanvasRenderer,
      Charts[CHARTS_MAP[type]], ...deps.map((o) => ChartsComponents[o]), ...features.map(f => ChartsFeatures[f])
    ])
  })
}

</script>

<style scoped></style>
