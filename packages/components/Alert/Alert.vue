<script lang="ts" setup>
import type { AlertProps, AlertEmits, AlertInstance } from "./types";
import { typeIconMap } from "@baize-ui/utils"
import { computed, ref } from "vue";

import BaizeIcon from "../Icon/Icon.vue";

defineOptions({
  name: "BaizeAlert",
});
//定义默认参数
const props = withDefaults(defineProps<AlertProps>(), {
  effect: "light",
  type: "info",
  closable: true,
});
//定义自定义事件
const emits = defineEmits<AlertEmits>();
//定义插槽
const slots = defineSlots();
//定义可视
const visible = ref(true);
//计算目前类型给予图标样式
const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
//使用描述，如果props有description，则使用description，否则使用插槽
const withDescription = computed(() => props.description || slots.default)

//定义关闭方法
function close() {
    visible.value = false
    emits('close')
}
//定义打开方法
function open() {
    visible.value = true
}
//导出方法
defineExpose<AlertInstance>({
  close,
  open,
});
</script>

<template>
    <transition name="baize-alert-fade">
        <div
          v-show="visible"
          class="baize-alert"
          role="alert"
          :class="{
            [`baize-alert__${type}`]: type,
            [`baize-alert__${effect}`]: effect,
            'text-center': center,
          }">
            <baize-icon
                v-if="showIcon"
                class="baize-alert__icon"
                :class="{ 'big-icon': withDescription }"
                :icon="iconName"
            />
                  <div class="baize-alert__content">
                    <span
                    class="baize-alert__title"
                    :class="{ 'with-desc': withDescription }"
                    :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
                    >
                    <slot name="title">{{ title }}</slot>
                    </span>
                    <p class="baize-alert__description">
                    <slot>{{ description }}</slot>
                    </p>
                    <div class="baize-alert__close" v-if="closable">
                    <baize-icon @click.stop="close" icon="xmark" />
                    </div>
                </div>
        </div>
    </transition>
</template>

<style scoped>
@import "./style.css";
</style>