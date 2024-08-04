<script setup lang="ts">
const props = defineProps<{
  isAlternating: boolean
}>()

import CapPicture from "./globals/CapPicture.vue";
import CapTitle from "./globals/CapTitle.vue";
import cover1 from "../assets/mygo.jpg"
import cover2 from "../assets/mygo2.jpg"
import cover3 from "../assets/mygo3.jpg"
// import cover4 from "../assets/mygo4.png"

import { onMounted, ref} from 'vue'
const title = ref("C4iN's Caprice")
const isTyping = ref(true)

onMounted(() => {
  const AlterPics = document.getElementById("pics")
  let currentTop: number = 0

  const altering = setInterval(()=>{
    const pic = document.querySelector(".alter-pic")
    // console.log("pic:", pic.clientHeight)
    if (AlterPics && pic && props.isAlternating) {
      // console.log("height 1 ", AlterPics.style.top)
      // console.log("currentTop", currentTop)
      // AlterPics.classList.toggle("switch")
      currentTop -= pic.clientHeight + 20
      AlterPics.style.top = currentTop + "px"
      // console.log("height 2 ", AlterPics.style.top)

      if (Math.abs(parseInt(AlterPics.style.top)) >= 3 * (pic.clientHeight + 20)) {
        AlterPics.style.top = "0"
        currentTop = 0
      }
    }
  }, 5000)
})

const slogan =ref(`\"还在go还在go\"`)



</script>

<template>
  <div class="cover-container">
    <div class="picture-container" id="pics">
      <CapPicture size-x="100%" :url="cover1" size-y="100%" infor="COVER" class="alter-pic" id="pic1"/>
      <CapPicture size-x="100%" :url="cover2" size-y="100%" infor="COVER" class="alter-pic" id="pic1"/>
      <CapPicture size-x="100%" :url="cover3" size-y="100%" infor="COVER" class="alter-pic" id="pic1"/>
<!--      <CapPicture size-x="100%" :url="cover4" size-y="100%" infor="COVER" class="alter-pic"/>-->
    </div>
    <CapTitle :content="title" size="96" :is-typing="isTyping"/>
  </div>
<!--  <h2 class="slogan">{{ slogan }}</h2>-->
</template>

<style scoped>
.cover-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  border-radius: 20px;
  overflow: hidden;
}

.picture-container {
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  position: relative;
  transition: all 1s ease-in-out;
}

.alter-pic {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  margin-bottom: 20px;
  padding: 0;
  /*animation: 10s switching 2s infinite;*/
  position: relative;
  top: 0;
  left: 0;



}

.switch {
  animation: 5s switching 2s infinite;

}

.alter {

}

@keyframes switching {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes alternating {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>