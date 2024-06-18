<script setup lang="ts">
defineProps<{ event: LSFEvent }>();
</script>

<template>
  <LMap
    style="height: 300px; width: 100%; z-index: 10;"
    :zoom="16"
    :center="[event.latitude, event.longitude]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      layer-type="base"
      name="OpenStreetMap"
    />
    <LMarker :lat-lng="[event.latitude, event.longitude]"></LMarker>
  </LMap>
</template>
