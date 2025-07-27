<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
import { ref, provide, watch, watchEffect } from "vue";
import { COLLAPSE_CTX_KEY } from './constants';
import { debugWarn } from '@baize-ui/utils/error';


const COMP_NAME = "BaizeCollapse" as const;
defineOptions({
  name: COMP_NAME
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<CollapseItemName[]>(props.modelValue)
function handleItemClick(item: CollapseItemName) {
    let _activeNames = [...activeNames.value]
    if (props.accordion) {
        _activeNames = [_activeNames[0] === item ? '' : item]
        updateActiveNames(_activeNames)
        return
    }
    const index = _activeNames.indexOf(item)
    if (index > -1) {
        _activeNames.splice(index, 1)
    } else {
        _activeNames.push(item)
    }
    updateActiveNames(_activeNames)
}

function updateActiveNames(newNames: CollapseItemName[]) {
    activeNames.value = newNames
    emits('update:modelValue', newNames)
    emits('change', newNames)
}

watchEffect(()=>{
    if (props.accordion && activeNames.value.length > 1) {
        debugWarn(COMP_NAME, "Accordion mode only allows one active item at a time.")
    }
})

watch(
    () => props.modelValue, 
    (newNames) => {updateActiveNames(newNames)}
)
//依赖注入
provide(COLLAPSE_CTX_KEY, {
    activeNames,
    handleItemClick
})
</script>

<template>

<div class="baize-collapse">
    <slot></slot>
</div>

</template>

<style scoped>
@import "./style.css";
</style>