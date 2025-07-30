<script setup>
function handleBtnClick() {
  console.log("btn click");
}
</script>

<template>
  <p>
    <baize-button @click="handleBtnClick"> with throttle</baize-button>
    <baize-button :use-throttle="false" @click="handleBtnClick"
      >without throttle</baize-button
    >
  </p>
</template>
