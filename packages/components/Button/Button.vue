<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { throttle } from "lodash-es";
import MingIcon from "../Icon/Icon.vue";
defineOptions({
  name: 'MingButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 500,
});
const emits = defineEmits<ButtonEmits>();
const slots = defineSlots();
const _ref = ref<HTMLButtonElement>();
// const size = computed(() => buttonGroupCtx?.size ?? props.size ?? "");
// const type = computed(() => buttonGroupCtx?.type ?? props.type ?? "");
// const disabled = computed(
//   () => props.disabled || buttonGroupCtx?.disabled || false
// );
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));
const handleBtnClick = (e: MouseEvent) => {
  emits("click", e);
};
const handlBtneCLickThrottle = throttle(handleBtnClick, props.throttleDuration);
defineExpose<ButtonInstance>({
  ref: _ref,
  // disabled,
  // size,
  // type,
});
</script>

<template>
  <component
  :is="props.tag"
  :ref="_ref"
  class="ming-button"
  :class="{
    [`ming-button--${type}`]: type,
    [`ming-button--${size}`]: size,
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
        <ming-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <ming-icon
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