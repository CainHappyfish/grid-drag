import { defineStore } from "pinia"
import {Ref, ref, UnwrapRef} from "vue";
import {ItemData} from "../composables/drag.ts";


export const usePreviewStore = defineStore("preview", () => {
    const isPreviewed = ref(true)
    const DragItemData: Ref<UnwrapRef<ItemData[]>, UnwrapRef<ItemData[]> | ItemData[]> = ref([])
    return { isPreviewed, DragItemData }
})
