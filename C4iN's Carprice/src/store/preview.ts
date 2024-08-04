import { defineStore } from "pinia"
import {ref} from "vue";

export const usePreviewStore = defineStore("preview", () => {
    const isPreviewed = ref(true)
    return { isPreviewed }
})
