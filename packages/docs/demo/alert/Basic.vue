<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <baize-alert type="success">Success alert</baize-alert>
    <baize-alert type="info">Info alert</baize-alert>
    <baize-alert type="warning">Warning alert</baize-alert>
    <baize-alert type="danger">Error alert</baize-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <baize-alert type="success" title="Success alert" />
    <baize-alert type="info" title="Info alert" />
    <baize-alert type="warning" title="Warning alert" />
    <baize-alert type="danger" title="Error alert" />
  </div>
</template>
