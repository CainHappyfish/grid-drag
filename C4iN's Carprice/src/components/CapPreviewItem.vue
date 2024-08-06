<script setup lang="ts">
import { PreviewData } from "../composables/drag.ts";
import {computed} from "vue";

const props = defineProps<{
  previewData: PreviewData,
  droppable: boolean
}>()

const UndroppableStyle = computed(() => props.droppable ? "" : "undroppable")

// console.log(props.previewData)
</script>

<template>
  <div class="preview-container"
       :class="UndroppableStyle"
       :style="{top: previewData.Top + 'px',left: previewData.Left+ 'px', width: previewData.Width - 5 + 'px', height: previewData.Height - 5 + 'px'}">

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

.undroppable {
  border: solid 3px rgb(237, 52, 52);
  background: rgba(255, 113, 113, 0.8);
}
</style>