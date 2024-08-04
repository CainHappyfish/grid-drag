<script setup lang="ts">
import Cover from "./components/Cover.vue"
import CapDrag from "./components/CapDrag.vue";
import {ref} from "vue";

const isAlter = ref(true)
</script>

<template>
  <Cover class="cover-container" :isAlternating="isAlter"/>
  <CapDrag />

</template>

<style scoped>
.cover-container {
  width: 100%;
  max-height: 100vh;
}
</style>
