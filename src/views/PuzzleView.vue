<script setup lang="ts">
    import Light from "../components/Light.vue";
    import { storeToRefs } from 'pinia'
    import { usePuzzleStore } from '../stores/puzzle'
    import { useRouter, useRoute } from 'vue-router'
    import { ref, watch } from 'vue'
    import swal from 'sweetalert';

    const { puzzleMap, steps } = storeToRefs(usePuzzleStore())
    const { switchPuzzle, lightOff } = usePuzzleStore()
    const route = useRoute()
    const router = useRouter()
    
    const pikachuSteps: {[key: string]: number;} = {
        '4': 18,
        '5': 9,
    }

    switchPuzzle(route.query.id!.toString())
    watch(
        () => route.query.id,
        () => {
            switchPuzzle(route.query.id!.toString())
        }
    )

    function click(isOn: boolean, row: number, col: number) {
        if (!isOn){
            return
        }
        steps.value += 1

        const isAllOff = lightOff(row, col)
        if (!isAllOff){
            return
        }
        
        const currentId = route.query.id!.toString()
        switch (currentId) {
            case '0':
                swal("Good job!", "初窥门径！开始认识更多的灯吧！", "success", {
                    buttons: {
                        defeat: {text: "下一关"}
                    }, 
                    closeOnClickOutside: false
                }).then(()=>{
                    router.push({ name: 'puzzle', query: { id: '1' } })
                })
                break;
            case '1':
                swal("Good job!", "小有所成！继续认识更多的灯吧！", "success", {
                    buttons: {
                        defeat: {text: "下一关"}
                    }, 
                    closeOnClickOutside: false
                }).then(()=>{
                    router.push({ name: 'puzzle', query: { id: '2' } })
                })
                break;
            case '2':
                swal("Good job!", "渐入佳境！继续吧！", "success", {
                    buttons: {
                        defeat: {text: "下一关"}
                    }, 
                    closeOnClickOutside: false
                }).then(()=>{
                    router.push({ name: 'puzzle', query: { id: '3' } })
                })
                break;
            case '3':
                swal("Good job!", "炉火纯青！开始愉快地游戏吧！", "success", {
                    buttons: {
                        defeat: {text: "下一关"}
                    }, 
                    closeOnClickOutside: false
                }).then(()=>{
                    router.push({ name: 'puzzle', query: { id: '4' } })
                })
                break;
            
            case '5':
            if (steps.value < pikachuSteps[currentId]){
                    swal("Good job!", `恐怖如斯，只用了${steps.value}步，成功暴打某人`, "success", {
                        buttons: {
                            defeat: {text: "晚安"}
                        }, 
                        closeOnClickOutside: false
                    })
                }else if (steps.value == pikachuSteps[currentId]){
                    swal("Good job!", `不错不错，用了${steps.value}步，和某人水平相当`, "success", {
                        buttons: {
                            defeat: {text: "晚安"}
                        },
                        closeOnClickOutside: false
                    })
                }else{
                    swal("Good job!", `用了${steps.value}步，可惜，还是不如某人的${pikachuSteps[currentId]}步`, "success", {
                        buttons: {
                            catch: {text: "重试！暴打某人！", value: "retry"},
                            defeat: {text: "晚安"}
                        },
                        closeOnClickOutside: false
                    }).then((value)=>{
                        switch (value) {
                            case "retry":
                                switchPuzzle(currentId)
                                break;
                            default:
                                break;
                        }
                    })
                }
                break;
            default:
                if (steps.value < pikachuSteps[currentId]){
                    swal("Good job!", `恐怖如斯，只用了${steps.value}步，成功暴打某人`, "success", {
                        buttons: {
                            defeat: {text: "下一关"}
                        },
                        closeOnClickOutside: false
                    }).then(()=>{
                        router.push({ name: 'puzzle', query: { id: parseInt(currentId) + 1 } })
                    })
                }else if (steps.value == pikachuSteps[currentId]){
                    swal("Good job!", `不错不错，用了${steps.value}步，和某人水平相当`, "success", {
                        buttons: {
                            defeat: {text: "下一关"}
                        }, 
                        closeOnClickOutside: false
                    }).then(()=>{
                        router.push({ name: 'puzzle', query: { id: parseInt(currentId) + 1 } })
                    })
                }else{
                    swal("Good job!", `用了${steps.value}步，可惜，还是不如某人的${pikachuSteps[currentId]}步`, "success", {
                        buttons: {
                            catch: {text: "重试！暴打某人！", value: "retry"},
                            defeat: {text: "下一关"}
                        },
                        closeOnClickOutside: false
                    }).then((value)=>{
                        switch (value) {
                            case "defeat":
                                router.push({ name: 'puzzle', query: { id: parseInt(currentId) + 1 } })
                                break;
                            case "retry":
                                switchPuzzle(currentId)
                                break;
                            default:
                                break;
                        }
                    })
                }
                break;
        }
    }
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen bg-gray-950">
        <div class="flex flex-row" v-for="(row, r) in puzzleMap">
            <Light :symbol="item.symbol" :is-on="item.isOn" :row="r" :col="c" v-for="(item, c) in row" @light-off="click"/>
        </div>
    </div>
</template>
  
