<script setup lang="ts">
import CapDragItem from "./CapDragGridItem.vue";
import CapGragLeftSideBar from "./CapGragLeftSideBar.vue";
import CapDragCanvas from "./CapDragCanvas.vue";
import {ref} from "vue";

const RowNum = ref(5)
const ColumnNum = ref(5)


</script>

<template>
  <div class="drag-container">
    <CapGragLeftSideBar />
    <CapDragCanvas :row="RowNum" :column="ColumnNum"/>
  </div>

</template>

<style scoped>
.drag-container {
  width: 100%;
  min-width: 1000px;
  height: 1000px;
  display: flex;
  justify-content: center;

}
</style>