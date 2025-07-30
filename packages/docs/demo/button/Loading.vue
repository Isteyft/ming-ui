<template>
  <div>
    <baize-button type="primary" loading>Loading</baize-button>
    <baize-button type="primary" loading-icon="circle-notch" loading
      >Loading</baize-button
    >
    <baize-button type="primary" loading>
      <template #loading>
        <baize-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </baize-button>
  </div>
</template>
