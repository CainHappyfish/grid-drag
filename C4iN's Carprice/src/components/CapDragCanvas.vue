<script setup lang="ts">
import CapDragGridItem from "./CapDragGridItem.vue";
import CapGridCard from "./CapGridCard.vue";
import { computed, onMounted, ref } from "vue";
import PreviewItem from "./CapPreviewItem.vue";
import { usePreviewStore } from "../store/preview.ts"
import { dragCards } from "../composables/drag.ts";
// import { ItemData } from "../composables/drag.ts";

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
const isDroppable = ref(true)
const CardPosition = ref({
  X: "25px",
  Y: "25px"
})
const CardPositionStyle = computed(() => `left: ${CardPosition.value.X}, top: ${CardPosition.value.Y} `)

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
  const CardRight = computed(() => (PreviewData.value.Left + PreviewData.value.Width - 15))
  const CardBottom = computed(() => (PreviewData.value.Top + PreviewData.value.Height - 15))
  // console.log("X: ", CardRight.value, CanvasWidth.value)
  // console.log("Y: ", CardBottom.value, CanvasHeight.value)
  previewStore.isPreviewed = false

  const CurrentElement = event.target as HTMLElement
  isDroppable.value = !(CardRight.value > CanvasWidth.value ||
      CardBottom.value > CanvasHeight.value ||
      CurrentElement.classList.contains('item-container')
  )
  // PreviewData.value.X = Math.ceil((CurrentElement.offsetLeft - 25) / ItemWidth.value)
  // PreviewData.value.Y = Math.ceil((CurrentElement.offsetTop - 25) / ItemHeight.value)

  const board: HTMLElement | null = document.querySelector(".drag-board")
  if (board) {
    PreviewData.value.X = Math.floor((event.clientX - board.getBoundingClientRect().x - 25) / ItemWidth.value)
    PreviewData.value.Y = Math.floor((event.clientY - board.getBoundingClientRect().y - 25) / ItemHeight.value)
  }

  PreviewData.value.Left = PreviewData.value.X * (ItemWidth.value) + 25
  PreviewData.value.Top = PreviewData.value.Y * (ItemHeight.value) + 25


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
    if (GridItem && isDroppable.value) {
      (event.target as HTMLElement).appendChild(GridItem);
      CardPosition.value.X = (event.target as HTMLElement).offsetLeft + 'px'
      CardPosition.value.Y = (event.target as HTMLElement).offsetTop + 'px'
    } else {
      PreviewData.value.Left = parseInt(CardPosition.value.X)
      PreviewData.value.Top = parseInt(CardPosition.value.Y)
    }

  }

}

const handleSizeChange = (width: number, height: number, figured: boolean) => {
  if (figured) {
    PreviewData.value.Width = width;
    PreviewData.value.Height = height;
    // console.log(PreviewData)
    console.log('卡片尺寸：', width, height);
  } else {
    PreviewData.value.Width = ItemWidth.value;
    PreviewData.value.Height = ItemHeight.value;
  }
};

const handleResizable = (resized: boolean) => {
  isDroppable.value = resized
}

const handlePosition = (left: string, top: string) => {
  // console.log(left, top)
  CardPosition.value.X = left
  CardPosition.value.Y = top
  PreviewData.value.Left = parseInt(left)
  PreviewData.value.Top = parseInt(top)
}

const Canvas = computed(() => ({
  row: <number>props.row,
  column: <number>props.column,
  width: <number>CanvasWidth.value,
  height: <number>CanvasHeight.value,
}))

const CardData = computed(() => ({
  id: <string>"card-item",
  position: {
    X: <number>parseInt(CardPosition.value.X),
    Y: <number>parseInt(CardPosition.value.Y),
  },
  size: {
    width: <number>CanvasWidth.value / props.column - 10,
    height: <number>CanvasHeight.value / props.row - 10
  },
  content: {
    title: <string>"",
    text: <string>"",
    url: <string>"",
    IMGurl: <string>""
  }
}))

previewStore.DragItemData.push(CardData.value)
previewStore.DragItemData.push(CardData.value)
// DragItemData.value.push(CardData.value)
// DragItemData.value.push(CardData.value)
// console.log(dragCards)

let index: number = 1
previewStore.DragItemData.forEach((item) => {
  item.id = "item-"+ index++
  console.log(item)
})
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

    <CapGridCard
      v-for="(item, index) in previewStore.DragItemData"
      :id="index+1"
      :isDroppable="isDroppable"
      :key="itemKey"
      :style="CardPositionStyle"
      :cardData="CardData"
      :gridData="Canvas"
      @size="handleSizeChange"
      @position="handlePosition"
      @resized="handleResizable"
    />

<!--    <CapGridCard-->
<!--      :isDroppable="isDroppable"-->
<!--      id="test"-->
<!--      :key="itemKey"-->
<!--      :style="CardPositionStyle"-->
<!--      :gridData="Canvas"-->
<!--      @size="handleSizeChange"-->
<!--      @position="handlePosition"-->
<!--    />-->


    <PreviewItem :previewData="PreviewData"
                 :droppable="isDroppable"
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