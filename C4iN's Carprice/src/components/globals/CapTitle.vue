<script setup lang="ts">
const props = defineProps<{
  isTyping?: boolean,
  content: string,
  size: number | string,
}>()

import {ref, computed, onMounted} from "vue";

const Typing = ref(props.isTyping)
const TypeClass = computed( ()=>{
  return Typing.value ? "typing" : ""
})

onMounted(() => {
  // const TypingContent = document.querySelector(".typing")
  const TypingContent = document.getElementById("typing-content")
  // console.log(TypingContent)
  let TypingWidth: number = 0
  if (TypingContent) {
    TypingContent.style.width = TypingWidth + 'ch'
    // console.log(props.content.length)
    const typing = setInterval(() => {TypingContent.style.width = (TypingWidth++) + 1 + 'ch'}, 300)
    setTimeout(() => { clearInterval(typing) }, 300 * props.content.length)
  }
})
</script>

<template>
  <div class="title-container">
    <h1 :style="{fontSize: size + 'px'}" :class="TypeClass" id="typing-content">{{ content }}</h1>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Hand:wght@400..700&family=Sankofa+Display&display=swap');
.title-container {
  width: 100%;
  display: flex;
  justify-content: center;
  top: 30%;
  position: absolute;
  z-index: 2;
  font-family: "Edu AU VIC WA NT Hand", cursive;
}

.typing {
  padding: 2px;
  border-right: 3px solid;
  overflow: hidden;
  animation: blink 1s infinite;
  white-space: nowrap;
  font-family: monospace;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent
  }
}
</style>