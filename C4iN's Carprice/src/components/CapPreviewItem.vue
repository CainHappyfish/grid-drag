<script setup lang="ts">
import { PreviewData } from "../composables/drag.ts";

const props = defineProps<{
  previewData: PreviewData,
}>()


// console.log(props.previewData)
</script>

<template>
  <div class="preview-container" :style="{top: previewData.Top + 'px',left: previewData.Left+ 'px', width: previewData.Width - 5 + 'px', height: previewData.Height - 5 + 'px'}">

  </div>
</template>

<style scoped>
.preview-container {
  border: solid 3px rgba(52, 132, 237, 1);
  background: rgba(99, 178, 248, 0.8);
  border-radius: 10px;
  z-index: -1;
  position: absolute;

  transition: all 0.3s ease-in-out;
}
</style>