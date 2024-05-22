<script setup lang="ts">
    import { useRoute, useRouter, RouterView } from 'vue-router'
    import { usePuzzleStore } from './stores/puzzle'
    import { range } from "lodash";
    const { switchPuzzle } = usePuzzleStore()
    const route = useRoute()
    const router = useRouter()

    const puzzles = range(6)

    function refresh(){
        switchPuzzle(route.query.id!.toString())
    }
</script>

<template>
    <div class="absolute right-4 top-4 text-2xl select-none cursor-pointer" @click="refresh">
        🔄
    </div>
    <RouterView />
    
    <div class="absolute bottom-4 text-center w-screen">
        <div 
            v-for="i in puzzles" 
            class="inline-block m-1 border px-2 rounded-lg text-gray-100 select-none font-semibold"
            :class="{
                'bg-gray-100': i.toString()==route.query.id,
                'text-gray-950': i.toString()==route.query.id
                }"
            @click="router.push({ name: 'puzzle', query: { id: i } })"
        >
            {{ i }}
        </div>
    </div>

</template>

<style scoped></style>