<script setup lang="ts">
    defineProps(["symbol", "isOn", "row", "col"])
</script>

<template>
    <div 
        class=" h-16 w-16 rounded-2xl bg-gray-900 font-black text-5xl text-center leading-[3.75rem] m-1 select-none" 
        :class="{'text-yellow-300': isOn, 'text-gray-800': !isOn, 'cursor-pointer': isOn, 'cursor-default': !isOn}"
        @click="$emit('lightOff', isOn, row, col)"
    >
        {{ symbol }}
    </div>
</template>