<script lang="ts" setup>
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { createPopper, type Instance } from "@popperjs/core";
import { bind, debounce, isNil, type DebouncedFunc } from "lodash-es";
import { ref, watchEffect, watch, computed, onUnmounted, type Ref, onMounted } from "vue";
import { BaizeTooltip } from ".";
import { useClickOutside } from "@baize-ui/hooks";

interface _TooltipProps extends TooltipProps {
  virtualRef?: HTMLElement | void;
  virtualTriggering?: boolean;
}

defineOptions({
  name: "BaizeTooltip",
});

const props = withDefaults(defineProps<_TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  transition: "fade",
  showTimeout: 0,
  hideTimeout: 200,
});

const emits = defineEmits<TooltipEmits>();
const visible = ref(false);

//事件
const events:Ref<Record<string, EventListener>> = ref({});
//外层的事件
const outerEvents: Ref<Record<string, EventListener>> = ref({});
//content层的事件
const dropdownEvents: Ref<Record<string, EventListener>> = ref({});

// container节点
const containerNode = ref<HTMLElement>();
// 弹出节点
const popperNode = ref<HTMLElement>();
// 触发节点
const triggerNode = ref<HTMLElement>();

const popperOptions = computed(() => ({
  //弹出方向
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}));
// 打开延迟
const openDelay = computed(() =>
  props.trigger === "hover" ? props.showTimeout : 0
);
// 关闭延迟
const closeDelay = computed(() =>
  props.trigger === "hover" ? props.hideTimeout : 0
);
// 打开关闭防抖
let openDebounce: DebouncedFunc<() => void> | void;
let closeDebounce: DebouncedFunc<() => void> | void;

function openFinal() {
  closeDebounce?.cancel(); // 取消正在等待执行的 closeDebounce
  openDebounce?.(); // 执行 openDebounce
}

function closeFinal() {
  openDebounce?.cancel(); // 取消正在等待执行的 openDebounce
  closeDebounce?.(); // 执行 closeDebounce
}

//弹出判断
function togglePopper() {
  visible.value ? closeFinal() : openFinal();
}

// 显示隐藏
function setVisible(val: boolean) {
  if (props.disabled) return;
  visible.value = val;
  emits("visible-change", val);
}

function attachEvents() {
  if (props.disabled || props.manual) return;
  if (props.trigger === "hover") {
    events.value["mouseenter"] = openFinal;
    outerEvents.value["mouseleave"] = closeFinal;
    dropdownEvents.value["mouseenter"] = openFinal;
    return;
  }
  if (props.trigger === "click") {
    events.value["click"] = togglePopper;
    return;
  }
  if (props.trigger === "contextmenu") {
    events.value["contextmenu"] = (e) => {
      e.preventDefault();
      openFinal();
    };
    return;
  }
}

let popperInstance: null | Instance;

//对于popperInstance的删除
function destroyPopperInstance() {
  if (isNil(popperInstance)) return;

  popperInstance.destroy();
  popperInstance = null;
}

//重置事件
function resetEvents() {
  events.value = {};
  outerEvents.value = {};
  dropdownEvents.value = {};

  attachEvents();
}

// 显示
const show: TooltipInstance["show"] = openFinal;
//隐藏
const hide: TooltipInstance["hide"] = function () {
  openDebounce?.cancel();
  setVisible(false);
};
watch(visible, (val) => { 
  //为空返回
    if (!val) return;
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      );
      console.log(popperInstance)
    }
  },
  { flush: "post" }
)
watch(() => props.manual, (isManual) => {
    if (isManual) {
      resetEvents();
      return;
    }
    attachEvents();
})

watch(
  () => props.trigger,
  (val, oldVal) => {
    if (val === oldVal) return;
    openDebounce?.cancel();
    visible.value = false;
    emits("visible-change", false);
    resetEvents();
  }
);
// 监听visible
watchEffect(() => {
  // 非手动模式
  if (!props.manual) {
    attachEvents();
  }
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});
// 
useClickOutside(containerNode, () => {
  emits("click-outside");
  if (props.trigger === "hover" || props.manual) return;

  visible.value && closeFinal();
});
//卸载时触发
onUnmounted(() => { 
  console.log("unmount",popperInstance);
  destroyPopperInstance();
});
//给两个暴露出去
defineExpose<TooltipInstance>({
  show,
  hide,
});
</script>

<template>
  <div class="baize-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="baize-tooltip__trigger"
      ref="triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="baize-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>