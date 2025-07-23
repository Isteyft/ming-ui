<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { BUTTON_GROUP_CTX_KEY } from "./constants";
import { throttle } from "lodash-es";
import BaizeIcon from "../Icon/Icon.vue";
// defineOptions   主要用于定义组件的选项，比如组件的名称（  name  ）、继承（  inheritAttrs  ）、自定义指令（  directives  ）等
defineOptions({
  name: 'BaizeButton'
})
//defineProps   用于定义组件的   props  ，即父组件传递给子组件的属性。
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 500,
});
//defineEmits 用于定义组件可以触发的事件。
const emits = defineEmits<ButtonEmits>();
//defineSlots 它可以帮助你检查插槽是否存在，从而在模板中动态地渲染内容。
const slots = defineSlots();
//inject 用于从父组件注入数据到子组件
const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0);
//ref   是响应式的，当它的值发生变化时，Vue 会自动更新 DOM。
const _ref = ref<HTMLButtonElement>();
const size = computed(() => buttonGroupCtx?.size ?? props.size ?? "");
const type = computed(() => buttonGroupCtx?.type ?? props.type ?? "");
const disabled = computed(
  () => props.disabled || buttonGroupCtx?.disabled || false
);
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));
const handleBtnClick = (e: MouseEvent) => {
  emits("click", e);
};
//throttle节流；限制函数的执行频率。
const handlBtneCLickThrottle = throttle(handleBtnClick, props.throttleDuration);
// defineExpose   用于将组件的内部属性暴露给父组件
defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type,
});
</script>

<template>
  <component
  :is="props.tag"
  :ref="_ref"
  class="baize-button"
  :class="{
    [`baize-button--${type}`]: type,
    [`baize-button--${size}`]: size,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled,
    'is-loading': loading,
  }"
  :type="tag === 'button' ? nativeType : void 0"
  :disabled="disabled || loading ? true : void 0"
  :autofocus="autofocus"
  @click="
  (e: MouseEvent) =>
    useThrottle ? handlBtneCLickThrottle(e) : handleBtnClick(e)
  ">
    <template v-if="loading">
      <slot name="loading">
        <baize-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <baize-icon
      :icon="icon"
      size="1x"
      :style="iconStyle"
      v-if="icon && !loading"
    />
    <slot></slot>
  </component>
</template>

<style>
@import './style.css';
</style>