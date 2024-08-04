<script setup lang="ts">
defineProps<
  {
    url: string,
    sizeX: number | string,
    sizeY: number | string,
    infor: string
  }

>()
</script>

<template>
  <img :src="url" :alt="infor" :width="sizeX" :height="sizeY" class="picture"/>
</template>

<style scoped>
.picture {
  border-radius: 10px;
  object-fit: cover;
}
</style>