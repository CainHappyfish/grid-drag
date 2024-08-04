<script setup lang="ts">
import CapDragGridItem from "./CapDragGridItem.vue";
import CapGridCard from "./CapGridCard.vue";
import {computed, onMounted, ref} from "vue";
import PreviewItem from "./CapPreviewItem.vue";
import { usePreviewStore } from "../store/preview.ts"

const previewStore = usePreviewStore();

const props = defineProps<{
  row: number,
  column: number

}>()

const CanvasWidth = ref(0)
const CanvasHeight = ref(0)
const ItemWidth = computed(()=> CanvasWidth.value / props.column)
const ItemHeight = computed(() => CanvasHeight.value / props.row)
const boardKey = ref(0) // 用于强制重新渲染画板的 key
const itemKey = ref(0)  // 强制渲染元素

// console.log("itemX ",itemWidth.value, "itemY ", itemHeight.value)
// console.log("Test boardX: ", CanvasWidth.value, "Test boardY: ", CanvasHeight.value)
const handleSize = () => {
  const board = document.getElementById("board")
  if (board) {
    CanvasWidth.value = board.offsetWidth - 40
    CanvasHeight.value = board.offsetHeight - 40
    // console.log("boardX: ", CanvasWidth.value, "boardY: ", CanvasHeight.value)
    boardKey.value++ // 增加 key 值，触发重新挂载
  }
}

onMounted(() => {
  handleSize()
  // console.log("boardX: ", CanvasWidth.value, "boardY: ", CanvasHeight.value)
  itemKey.value++
})


// 在拖动同时将放入的计算网格位置

const PreviewData = ref({
  X: 0,
  Y: 0,
  Top: 25,
  Left: 25,
  Width: ItemWidth.value,
  Height: ItemHeight.value,
})

const onDragOver = (event: DragEvent) => {
  // const DragArea = document.querySelector(".grid-container")
  event.preventDefault();
  previewStore.isPreviewed = false

  PreviewData.value.X = ( (event.target as HTMLElement).offsetLeft - 25 ) / ItemWidth.value
  PreviewData.value.Y = ( (event.target as HTMLElement).offsetTop - 25 ) / ItemHeight.value

  PreviewData.value.Left = (event.target as HTMLElement).offsetLeft
  PreviewData.value.Top = (event.target as HTMLElement).offsetTop



  // console.log("X: ", CurrentGrid.value.X, "Y: ",CurrentGrid.value.Y)
  // console.log(PreviewData)
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  // console.log("drop")
  previewStore.isPreviewed = true

  // console.log(event.dataTransfer)
  if (event.dataTransfer) {
    const id = event.dataTransfer.getData("dragging")
    // console.log("id: ", id)
    const GridItem = document.getElementById(id)
    const DragArea = document.querySelector(".grid-container")
    // console.log(GridItem, DragArea)
    if (GridItem && DragArea) {
      (event.target as HTMLElement).appendChild(GridItem);
    }
  }

}

const handleSizeChange = (width: number, height: number, figured: boolean) => {
  if (figured) {
    PreviewData.value.Width = width;
    PreviewData.value.Height = height;
    console.log(PreviewData)
    // console.log('卡片尺寸：', width, height);
  } else {
    PreviewData.value.Width = ItemWidth.value;
    PreviewData.value.Height = ItemHeight.value;
  }
};

</script>

<template>
  <div class="canvas-container">
    <div class="drag-board" id="board" :key="boardKey">
      <div class="drag-row" v-for="indexX in row" :key="indexX">
        <CapDragGridItem v-for="indexY in column" :key="indexY"
                     :row="row"
                     :column="column"
                     :canvasX="CanvasWidth"
                     :canvasY="CanvasHeight"
                     @dragover="onDragOver"
                     @drop="onDrop"
        />
      </div>
    </div>

    <CapGridCard :row="row"
                 :column="column"
                 :canvasX="CanvasWidth"
                 :canvasY="CanvasHeight"
                 :key="itemKey"
                 @size="handleSizeChange"
    />
    <PreviewItem :previewData="PreviewData"
                 :key="itemKey"
                 v-if="!previewStore.isPreviewed"/>

  </div>
</template>

<style scoped>
.canvas-container {
  margin: 10px;
  width: 1300px;
  height: 1000px;
  border-radius: 20px;

  background: #3c3f41;
  opacity: 0.7;

  overflow: hidden;
  position: relative;
}

.drag-board {
  margin: 20px;
  width: 100%;
  height: 100%;
}

.drag-row {
  display: flex;
}

.preview-card {
  border: solid 3px rgba(52, 132, 237, 0.6);
  border-radius: 10px;
}
</style>