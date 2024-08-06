<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import offLogo from "../assets/off.svg"
import resizeLogo from "../assets/resize-bottom-right.svg"
import { usePreviewStore } from "../store/preview.ts";

const previewStore = usePreviewStore();
const props = defineProps<{
  row: number,
  column: number,
  canvasX: number,
  canvasY: number,
  isDroppable: boolean
}>()

const emit = defineEmits<{
  size: [width: number, height: number, figured: boolean];
  position: [left: string, top: string]
}>()

const ItemWidth = computed(()=> props.canvasX / props.column)
const ItemHeight = computed(() => props.canvasY / props.row)



const BackGroundColor = ref("")
const BackGroundOpacity = ref(0.6)
const LineColor = ref("")
const Border = ref("")
const DefaultWidth = computed(()=> ItemWidth.value - 10 )
const DefaultHeight = computed(() => ItemHeight.value - 10)
const previewStyle = ref("")
// const CardWidth = computed(()=> ItemWidth.value - 10 - ShiftX.value)
// const CardHeight = computed(() => ItemHeight.value - 10 - ShiftY.value)

const MinWidth = DefaultWidth.value
const MinHeight = DefaultHeight.value

const DefaultPosition = ref("default-position")
const isResized = ref(false)

const PositionX = ref("25px")
const PositionY = ref("25px")

const onMouseDown = (event: MouseEvent) => {
  PositionX.value = (event.target as HTMLElement).offsetLeft + 'px'
  PositionY.value = (event.target as HTMLElement).offsetTop + 'px'
  // console.log(PositionX.value, PositionY.value)
}

const onDragStart = (event: DragEvent) => {

  if (event.dataTransfer) {

    event.dataTransfer.setData("dragging", "grid-item")
    // 需要延时，否则会出错
    setTimeout(() => {
      BackGroundOpacity.value = 0
      previewStyle.value = "translate(-99999px, -99999px)"
    })
    LineColor.value = "#1b80ac"
    emit('size', FinWidth.value, FinHeight.value, true);
    emit('position', PositionX.value, PositionY.value)
  }
}

const onDragEnd = () => {
  // console.log("drag end")
  BackGroundColor.value = ""
  BackGroundOpacity.value = 0.6
  BackGroundOpacity.value = 0.6
  LineColor.value = ""
  Border.value = ""
  if (props.isDroppable) {
    DefaultPosition.value = ""
  }
  previewStyle.value = ""
  // console.log("drag end")
}


const handleRemove = (event: any) => {
  const CurrentCard = event.currentTarget.parentElement
  // console.log(CurrentCard)
  CurrentCard.remove()
}

const resizeCol = ref(1)
const resizeRow = ref(1)

const ResizeWidth = ref(MinWidth)
const ResizeHeight = ref(MinHeight)

const FinWidth = ref(ItemWidth.value - 10)
const FinHeight = ref(ItemHeight.value - 10)


const handleResize = (event: MouseEvent) => {
  isResized.value = true
  event.stopPropagation()
  event.preventDefault()
  const CurrentCard = (event.currentTarget as HTMLElement).parentElement
  // console.log("currentX: ",event.pageX, " currentY: ",event.pageY)

  const mouseMoveHandler = (e: MouseEvent) => {
    if (CurrentCard) {
      ResizeWidth.value = e.pageX - CurrentCard.getBoundingClientRect().x;
      ResizeHeight.value = e.pageY - (CurrentCard.getBoundingClientRect().y + window.scrollY);

      if (ResizeWidth.value > props.canvasX) {
        FinWidth.value = props.canvasX - 10
      }
      else if (ResizeHeight.value > props.canvasY) {
        FinHeight.value = props.canvasY - 10
      }
      else {
        if (ResizeWidth.value > MinWidth) {
          resizeCol.value = Math.ceil(ResizeWidth.value / (ItemWidth.value + 10))
          CurrentCard.style.width = ResizeWidth.value + 'px';
          FinWidth.value = resizeCol.value * ItemWidth.value - 10
          // console.log("col: ", resizeCol.value - 1, "FinWidth:", FinWidth.value)
        } else {
          CurrentCard.style.width = MinWidth + 'px';
          FinWidth.value = MinWidth
        }

        if (ResizeHeight.value > MinHeight) {
          resizeRow.value = Math.ceil(ResizeHeight.value / (ItemHeight.value + 10))
          CurrentCard.style.height = ResizeHeight.value + 'px';
          FinHeight.value = resizeRow.value * ItemHeight.value - 10
        } else {
          CurrentCard.style.height = MinHeight + 'px';
          FinHeight.value = MinHeight;
        }

      }





      // console.log("FinX ", FinWidth.value, "FinY", FinHeight.value)
      emit('size', FinWidth.value, FinHeight.value, true);
      previewStore.isPreviewed = false

    }
  }

  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    if (CurrentCard) {

      CurrentCard.style.width = FinWidth.value + 'px'
      CurrentCard.style.height = FinHeight.value + 'px'

    }
    emit('size', FinWidth.value, FinHeight.value, false);
    previewStore.isPreviewed = true

  }

  if (event.target) {
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

}
const CardWidth = computed(()=> !isResized.value ? DefaultWidth.value : FinWidth)
const CardHeight = computed(() => !isResized.value ? DefaultHeight.value : FinHeight)

// console.log("CardX ", CardWidth.value, "CardY ", CardHeight.value)

</script>

<template>
  <div class="item-container"
       :style="{width: CardWidth + 'px', height: CardHeight + 'px', background: BackGroundColor, opacity: BackGroundOpacity, transform: previewStyle}"
       :class="DefaultPosition"
       draggable="true"
       id="grid-item"
       @dragstart="onDragStart"
       @dragend="onDragEnd"
       @mousedown="onMouseDown"
  >

    <div class="remove-card" @click="handleRemove">
      <img :src="offLogo" alt="off" class="off-button" />
    </div>
    <div class="resize-card" @mousedown="handleResize">
      <img :src="resizeLogo" alt="resize" class="resize-button" />
    </div>
  </div>
</template>

<style scoped>
.item-container {
  z-index: 3;
  /*margin: 5px;*/
  border-radius: 10px;
  background: rgba(166, 174, 174, 0.6);
  opacity: 0.6;
  position: absolute;

/*  width: v-bind(ResizeWidth);
  height: v-bind(ResizeHeight);*/

  cursor: pointer;

  /*transition: all 0.1s ease;*/


}

.default-position {
  top: 25px;
  left: 25px;
}

.moving {
  transform: translate(-9999px,-9999px);
}

.off-button {
  width: 20px;
  height: 20px;

  position: absolute;
  top: 5px;
  right: 5px;

  z-index: 5;
}

.resize-button {
  width: 50px;
  height: 50px;

  position: absolute;
  bottom: 5px;
  right: 5px;

  z-index: 5;

}

</style>