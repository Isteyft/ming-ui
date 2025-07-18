<script setup lang="ts">
import { defineOptions, ref } from 'vue'
import type { ButtonProps } from "./types";
defineOptions({
  name: 'MingButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
});
const slots = defineSlots()
const _ref = ref<HTMLButtonElement>();
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
  :disabled="disabled || loading ? true : void 0">
  <slot></slot>
  </component>
</template>

<style>

</style>