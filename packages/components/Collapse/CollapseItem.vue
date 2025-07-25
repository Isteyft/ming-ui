<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { inject, computed } from "vue";
import { COLLAPSE_CTX_KEY } from "./constants";
import BaizeIcon from "../Icon/Icon.vue";
// import transitionEvents from "./transitionEvents";

//定义组件名
defineOptions({
  name: 'BaizeCollapseItem'
})
//defineProps   用于定义组件的   props  ，即父组件传递给子组件的属性。
const props = defineProps<CollapseItemProps>()
//inject 用于从父组件注入数据到子组件
const ctx = inject(COLLAPSE_CTX_KEY)
const isActive = computed(() => {
  return ctx?.activeNames.value?.includes(props.name)
})
function handleClick() {
  if (props.disabled) return
  ctx?.handleItemClick(props.name)
}
</script>

<template>

<div
class="baize-collapse-item"
:class="{
    'is-disabled': disabled,
}"
>
<div
    class="baize-collapse-item__header"
    :id="`item-header-${name}`"
    :class="{
    'is-disabled': disabled,
    'is-active': isActive,
    }"
    @click="handleClick"
>
    <span class="baize-collapse-item__title">
    <slot name="title">
        {{ title }}
    </slot>
    </span>
    <baize-icon icon="angle-right" class="header-angle" />
</div>
<!-- <transition name="slide" v-on="transitionEvents"> -->
    <div class="baize-collapse-item__wapper" v-show="isActive">
    <div class="baize-collapse-item__content" :id="`item-content-${name}`">
        <slot></slot>
    </div>
    </div>
<!-- </transition> -->
</div>

</template>

<style scoped>
@import "./style.css";
</style>