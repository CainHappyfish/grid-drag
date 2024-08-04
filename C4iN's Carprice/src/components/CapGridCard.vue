<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import offLogo from "../assets/off.svg"
import resizeLogo from "../assets/resize-bottom-right.svg"

const props = defineProps<{
  row: number,
  column: number,
  canvasX: number,
  canvasY: number,
}>()

const emit = defineEmits<{
  size: [width: number, height: number, resized: boolean];
}>()

const ItemWidth = computed(()=> props.canvasX / props.column)
const ItemHeight = computed(() => props.canvasY / props.row)



const BackGroundColor = ref("")
const BackGroundOpacity = ref(0.6)
const LineColor = ref("")
const Border = ref("")
const ShiftX = ref(0)
const ShiftY = ref(0)
const DefaultWidth = computed(()=> ItemWidth.value - 10 - ShiftX.value)
const DefaultHeight = computed(() => ItemHeight.value - 10 - ShiftY.value)
// const CardWidth = computed(()=> ItemWidth.value - 10 - ShiftX.value)
// const CardHeight = computed(() => ItemHeight.value - 10 - ShiftY.value)

const MinWidth = DefaultWidth.value
const MinHeight = DefaultHeight.value

const DefaultPosition = ref("default-position")


const ResizeWidth = ref(MinWidth)
const ResizeHeight = ref(MinHeight)
const onDragStart = (event: DragEvent) => {
  // (event.target as HTMLElement).style.removeProperty("top")
  // (event.target as HTMLElement).classList.add("moving")
  if (event.dataTransfer) {
    // console.log("drag start")
    event.dataTransfer.setData("dragging", "grid-item")
    // console.log(event.dataTransfer)
    // console.log(event.dataTransfer.getData("dragging"))

    LineColor.value = "#1b80ac"
    BackGroundOpacity.value = 0.3
    // console.log("Current", ResizeWidth.value)
    emit('size', ResizeWidth.value, ResizeHeight.value, true);

  }
}

const onDragEnd = () => {
  // console.log("drag end")
  BackGroundColor.value = ""
  BackGroundOpacity.value = 0.6
  BackGroundOpacity.value = 0.6
  LineColor.value = ""
  Border.value = ""
  ShiftX.value = 0
  ShiftY.value = 0
  DefaultPosition.value = ""
  // console.log("drag end")
}


const handleRemove = (event: any) => {
  const CurrentCard = event.currentTarget.parentElement
  // console.log(CurrentCard)
  CurrentCard.remove()
}


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
      if (ResizeWidth.value > MinWidth) {
        CurrentCard.style.width = ResizeWidth.value + 'px';
      } else {
        CurrentCard.style.width = MinWidth + 'px';
      }

      if (ResizeHeight.value > MinHeight) {
        CurrentCard.style.height = ResizeHeight.value + 'px';
      } else {
        CurrentCard.style.height = MinHeight + 'px';
      }
      emit('size', ResizeWidth.value, ResizeHeight.value, true);
    }
  }

  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }

  if (event.target) {
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

}
const isResized = ref(false)
const CardWidth = computed(()=> !isResized.value ? ItemWidth.value - 10 - ShiftX.value : ResizeWidth)
const CardHeight = computed(() => !isResized.value ? ItemHeight.value - 10 - ShiftY.value : ResizeHeight)



</script>

<template>
  <div class="item-container"
       :style="{width: CardWidth + 'px', height: CardHeight + 'px', background: BackGroundColor, opacity: BackGroundOpacity}"
       :class="DefaultPosition"
       draggable="true"
       id="grid-item"
       @dragstart="onDragStart"
       @dragend="onDragEnd"
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