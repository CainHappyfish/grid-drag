<script setup lang="ts">
import {computed, ref} from "vue";
import offLogo from "../assets/off.svg"
import resizeLogo from "../assets/resize-bottom-right.svg"
import { usePreviewStore } from "../store/preview.ts";
import {CanvasData, dragCards, ItemData} from "../composables/drag.ts";

const previewStore = usePreviewStore();
const props = defineProps<{
  gridData: CanvasData
  cardData: ItemData
  isDroppable: boolean
}>()

const emit = defineEmits<{
  size: [width: number, height: number, figured: boolean];
  position: [left: string, top: string]
  resized: [resizable: boolean]
}>()

const dragData = props.cardData
const resizable = ref(true)

const BackGroundColor = ref("")
const BackGroundOpacity = ref(0.6)
const Border = ref("")
/**
 * 初始化卡片尺寸
 * */
const DefaultWidth = computed(()=> props.gridData.width / props.gridData.column - 10)
const DefaultHeight = computed(() => props.gridData.height / props.gridData.row - 10)
const previewStyle = ref("")

const MinWidth = dragData.size.width
const MinHeight = dragData.size.height

const DefaultPosition = ref("default-position")
const isResized = ref(false)

const PositionX = ref("25px")
const PositionY = ref("25px")

/**
 * 拖曳临时数据
 * */


const onMouseDown = (event: MouseEvent) => {
  PositionX.value = (event.target as HTMLElement).offsetLeft + 'px'
  PositionY.value = (event.target as HTMLElement).offsetTop + 'px'

  const currentCard = event.target as HTMLElement
  dragData.id = currentCard.id
  dragData.size.width = parseInt(currentCard.style.width)
  dragData.size.height = parseInt(currentCard.style.height)
  dragData.position.X = (event.target as HTMLElement).offsetLeft
  dragData.position.Y = (event.target as HTMLElement).offsetTop

  dragCards.set(currentCard.id, dragData)
  console.log(dragCards)
}

const onDragStart = (event: DragEvent) => {
  const id = (event.target as HTMLElement).id
  if (event.dataTransfer) {

    event.dataTransfer.setData("dragging", id)
    // 需要延时，否则会出错
    setTimeout(() => {
      BackGroundOpacity.value = 0
      previewStyle.value = "translate(-99999px, -99999px)"
    })
    emit('size', FinWidth.value, FinHeight.value, true);
    emit('position', PositionX.value, PositionY.value)
  }
}

const onDragEnd = (event: DragEvent) => {
  // console.log("drag end")
  const currentCard = event.target as HTMLElement
  BackGroundColor.value = ""
  BackGroundOpacity.value = 0.6
  BackGroundOpacity.value = 0.6
  Border.value = ""
  if (props.isDroppable) {
    DefaultPosition.value = ""
    dragData.position.X = currentCard.offsetLeft
    dragData.position.Y = currentCard.offsetTop
    dragCards.set(currentCard.id, dragData)
  }
  previewStyle.value = ""
  // console.log("drag end")
}


const handleRemove = (event: any) => {
  const CurrentCard = event.currentTarget.parentElement
  // console.log(CurrentCard)
  CurrentCard.remove()
  dragCards.remove((event.currentTarget as HTMLElement).id)
}

  const resizeCol = ref(1)
  const resizeRow = ref(1)

  const ResizeWidth = ref(MinWidth)
  const ResizeHeight = ref(MinHeight)

  const FinWidth = ref(dragData.size.width)
  const FinHeight = ref(dragData.size.height)


  const handleResize = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    isResized.value = true
    resizable.value = true
    console.log(resizable.value)

    const CurrentCard = (event.currentTarget as HTMLElement).parentElement
    // console.log("currentX: ",event.pageX, " currentY: ",event.pageY)
    if (CurrentCard) {
      PositionX.value = CurrentCard.offsetLeft + 'px'
      PositionY.value = CurrentCard.offsetTop + 'px'
      emit('position', PositionX.value, PositionY.value)
    }
    const mouseMoveHandler = (e: MouseEvent) => {
      if (CurrentCard) {
        ResizeWidth.value = e.pageX - CurrentCard.getBoundingClientRect().x;
        ResizeHeight.value = e.pageY - (CurrentCard.getBoundingClientRect().y + window.scrollY);
        // 这一大坨的if应该可以优化，但我懒
        // 长宽超过最大值

        if (ResizeWidth.value > props.gridData.width) {
          FinWidth.value = props.gridData.width - 10
        }
        else if (ResizeHeight.value > props.gridData.height) {
          FinHeight.value = props.gridData.height - 10
        }
        // 缩放时超出容器
        else if (CurrentCard.offsetLeft + ResizeWidth.value - 15> props.gridData.width ||
            CurrentCard.offsetTop + ResizeHeight.value - 10> props.gridData.height) {
            // 什么也不干
        }
        else {
          // console.log(CurrentElement)
          // if (CurrentElement.classList.contains('item-container')) {
          //   resizable.value = !(CurrentCard.getBoundingClientRect().right > CurrentElement.getBoundingClientRect().left)
          //   // console.log(resizable.value)
          // }
          const cards = document.querySelectorAll('.item-container')
          if (cards) {
            cards.forEach((e) => {
              if (e.id !== CurrentCard.id) {
                resizable.value = !((CurrentCard.getBoundingClientRect().right > e.getBoundingClientRect().left ||
                     CurrentCard.getBoundingClientRect().top > e.getBoundingClientRect().bottom
                    ) &&
                    (CurrentCard.getBoundingClientRect().left < e.getBoundingClientRect().right ||
                     CurrentCard.getBoundingClientRect().bottom < e.getBoundingClientRect().top
                    ))
                console.log(resizable.value)
              }
            })
          }
          if (ResizeWidth.value > MinWidth) {
            resizeCol.value = Math.ceil(ResizeWidth.value / (DefaultWidth.value + 10))
            CurrentCard.style.width = ResizeWidth.value + 'px';
            FinWidth.value = resizeCol.value * (DefaultWidth.value) + 10 * (resizeCol.value - 1)
            // console.log("col: ", resizeCol.value - 1, "FinWidth:", FinWidth.value)
          } else {
            CurrentCard.style.width = MinWidth + 'px';
            FinWidth.value = MinWidth
          }

          if (ResizeHeight.value > MinHeight) {
            resizeRow.value = Math.ceil(ResizeHeight.value / (DefaultHeight.value + 10))
            CurrentCard.style.height = ResizeHeight.value + 'px';
            FinHeight.value = resizeRow.value * (DefaultHeight.value) + 10 * (resizeRow.value - 1)
          } else {
            CurrentCard.style.height = MinHeight + 'px';
            FinHeight.value = MinHeight;
          }

        }

        dragData.size.width = FinWidth.value
        dragData.size.height = FinHeight.value
        dragCards.set(dragData.id, dragData)
        previewStore.isPreviewed = false
        emit('size', FinWidth.value, FinHeight.value, true);
        if (!resizable.value) {
          console.log("not resized")
          FinWidth.value = props.cardData.size.width
          FinHeight.value = props.cardData.size.height
          emit('resized', resizable.value)
        } else {
          emit('resized', resizable.value)
        }
      }
    }

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      if (CurrentCard) {

        CurrentCard.style.width = FinWidth.value + 'px'
        CurrentCard.style.height = FinHeight.value + 'px'

      }
      // console.log(PositionX.value, PositionY.value)
      emit('size', FinWidth.value, FinHeight.value, false);
      emit('position', PositionX.value, PositionY.value)

      previewStore.isPreviewed = true

    }

    if (event.target) {
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }

  }
  const CardWidth = computed(()=> !isResized.value ? DefaultWidth.value : FinWidth)
  const CardHeight = computed(() => !isResized.value ? DefaultHeight.value : FinHeight)


</script>

<template>
  <div class="item-container"
       :style="{width: CardWidth + 'px', height: CardHeight + 'px', background: BackGroundColor, opacity: BackGroundOpacity, transform: previewStyle}"
       :class="DefaultPosition"
       draggable="true"
       :id="cardData.id"
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

  cursor: pointer;


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