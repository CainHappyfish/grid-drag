<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  row: number,
  column: number,
  canvasX: number,
  canvasY: number,
}>()

const ItemWidth = computed(()=> props.canvasX / props.column)
const ItemHeight = computed(() => props.canvasY / props.row)

// console.log("row ", props.row, "column ", props.column)
// console.log("X: ", props.canvasX, "Y: ", props.canvasY)
// console.log("itemX: ", ItemWidth.value, "itemY: ", ItemHeight.value)

</script>

<template>
  <div class="grid-container" :style="{width: ItemWidth - 10 + 'px', height: ItemHeight - 10 + 'px'}"
       draggable="false"
  ></div>
</template>

<style scoped>
.grid-container {
  margin: 5px;
  border-radius: 10px;
  background: rgba(36, 36, 36, 0.3);
}
</style>