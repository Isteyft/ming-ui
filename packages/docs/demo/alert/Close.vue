<script setup>
import { BaizeMessage } from "baize-ui";

function handleClose() {
  ErMessage.info("close callback");
}
</script>
<template>
  <div class="basic block">
    <baize-alert title="Unclosable alert" type="success" :closable="false" />
    <baize-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
