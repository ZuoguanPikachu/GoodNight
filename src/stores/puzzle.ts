import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep } from "lodash";


function updateMap(
    puzzleMap: {symbol: string; isOn: boolean;}[][],
    row: number, col: number
): {symbol: string; isOn: boolean;}[][] {
    const symbol = puzzleMap[row][col].symbol
    switch (symbol) {
        case '▢':
            puzzleMap[row][col].isOn = !puzzleMap[row][col].isOn
            break;
        case '—':
            for (let index = 0; index < puzzleMap[row].length; index++) {
                puzzleMap[row][index].isOn = !puzzleMap[row][index].isOn
            }
            break;
        case '丨':
            for (let index = 0; index < puzzleMap.length; index++) {
                puzzleMap[index][col].isOn = !puzzleMap[index][col].isOn
            }
            break;
        case '▷':
            puzzleMap[row][col].isOn = !puzzleMap[row][col].isOn

            if (col+1 < puzzleMap[row].length){
                puzzleMap[row][col+1].isOn = !puzzleMap[row][col+1].isOn
            }
            
            if (row-1 >= 0 ){
                puzzleMap[row-1][col].isOn = !puzzleMap[row-1][col].isOn
            }
            
            if (row+1 < puzzleMap.length){
                puzzleMap[row+1][col].isOn = !puzzleMap[row+1][col].isOn
            }
            
            break;
        case '◁':
            puzzleMap[row][col].isOn = !puzzleMap[row][col].isOn

            if (col-1 >= 0){
                puzzleMap[row][col-1].isOn = !puzzleMap[row][col-1].isOn
            }
            
            if (row-1 >= 0 ){
                puzzleMap[row-1][col].isOn = !puzzleMap[row-1][col].isOn
            }
            
            if (row+1 < puzzleMap.length){
                puzzleMap[row+1][col].isOn = !puzzleMap[row+1][col].isOn
            }
            
            break;
        case '×':
            const maxStep = Math.max(puzzleMap.length, puzzleMap[row].length)
            const ds = [[1, 1], [1, -1], [-1, 1], [-1, -1]]

            ds.forEach(d => {
                for (let index = 1; index < maxStep; index++) {
                    const dx = d[0]
                    const dy = d[1]

                    if (row + dy*index < 0 || row + dy*index >= puzzleMap.length || col + dx*index < 0 || col + dx*index >= puzzleMap[row].length){
                        break
                    }
                    puzzleMap[row + dy*index][col + dx*index].isOn = !puzzleMap[row + dy*index][col + dx*index].isOn
                }
            })
            puzzleMap[row][col].isOn = !puzzleMap[row][col].isOn
            // puzzleMap[row][col].isOn = !puzzleMap[row][col].isOn

            // if (row-1 >= 0 && col-1 >= 0){
            //     puzzleMap[row-1][col-1].isOn = !puzzleMap[row-1][col-1].isOn
            // }
            
            // if (row-1 >= 0 && col+1 < puzzleMap[row].length){
            //     puzzleMap[row-1][col+1].isOn = !puzzleMap[row-1][col+1].isOn
            // }
            
            // if (row+1 < puzzleMap.length && col-1 >= 0){
            //     puzzleMap[row+1][col-1].isOn = !puzzleMap[row+1][col-1].isOn
            // }

            // if (row+1 < puzzleMap.length && col+1 < puzzleMap[row].length){
            //     puzzleMap[row+1][col+1].isOn = !puzzleMap[row+1][col+1].isOn
            // }
            
            break;
        case '+':
            for (let index = 0; index < puzzleMap[row].length; index++) {
                puzzleMap[row][index].isOn = !puzzleMap[row][index].isOn
            }
            for (let index = 0; index < puzzleMap.length; index++) {
                puzzleMap[index][col].isOn = !puzzleMap[index][col].isOn
            }
            puzzleMap[row][col].isOn = !puzzleMap[row][col].isOn
            // puzzleMap[row][col].isOn = !puzzleMap[row][col].isOn

            // if (row-1 >= 0){
            //     puzzleMap[row-1][col].isOn = !puzzleMap[row-1][col].isOn
            // }
            
            // if (col+1 < puzzleMap[row].length){
            //     puzzleMap[row][col+1].isOn = !puzzleMap[row][col+1].isOn
            // }
            
            // if (col-1 >= 0){
            //     puzzleMap[row][col-1].isOn = !puzzleMap[row][col-1].isOn
            // }

            // if (row+1 < puzzleMap.length){
            //     puzzleMap[row+1][col].isOn = !puzzleMap[row+1][col].isOn
            // }
            
            break;
        default:
            break;
    }
    return puzzleMap
}

function isAllOff(
    puzzleMap: {symbol: string; isOn: boolean;}[][],
): boolean{
    for (const row of puzzleMap) {
        for (const item of row) {
            if (item.isOn){
                return false
            }
        }
    }

    return true
}

const puzzleMaps: {[key: string]: {symbol: string; isOn: boolean;}[][];} = {
    '0': [
        [{'symbol': '▢', 'isOn': true}, {'symbol': '▢', 'isOn': true}],
        [{'symbol': '▢', 'isOn': true}, {'symbol': '▢', 'isOn': true}],
    ],
    '1': [
        [{'symbol': '▢', 'isOn': true}, {'symbol': '▢', 'isOn': false}, {'symbol': '▷', 'isOn': true}, {'symbol': '▢', 'isOn': true}],
        [{'symbol': '▢', 'isOn': false}, {'symbol': '▷', 'isOn': true}, {'symbol': '▷', 'isOn': false}, {'symbol': '◁', 'isOn': true}],
        [{'symbol': '▢', 'isOn': true}, {'symbol': '▢', 'isOn': false}, {'symbol': '◁', 'isOn': true}, {'symbol': '▢', 'isOn': true}],
        [{'symbol': '▢', 'isOn': false}, {'symbol': '◁', 'isOn': true}, {'symbol': '◁', 'isOn': false}, {'symbol': '▷', 'isOn': true}],
    ],
    '2': [
        [{'symbol': '▢', 'isOn': true}, {'symbol': '▢', 'isOn': true}, {'symbol': '◁', 'isOn': true}, {'symbol': '▢', 'isOn': true}],
        [{'symbol': '▢', 'isOn': true}, {'symbol': '▷', 'isOn': true}, {'symbol': '▢', 'isOn': true}, {'symbol': '—', 'isOn': true}],
        [{'symbol': '▷', 'isOn': true}, {'symbol': '◁', 'isOn': false}, {'symbol': '丨', 'isOn': true}, {'symbol': '—', 'isOn': true}],
        [{'symbol': '▢', 'isOn': false}, {'symbol': '▢', 'isOn': true}, {'symbol': '▷', 'isOn': true}, {'symbol': '—', 'isOn': true}],
    ],
    '3': [
        [{'symbol': '丨', 'isOn': true}, {'symbol': '丨', 'isOn': true}, {'symbol': '▢', 'isOn': true}, {'symbol': '▢', 'isOn': false}],
        [{'symbol': '丨', 'isOn': false}, {'symbol': '▢', 'isOn': true}, {'symbol': '—', 'isOn': false}, {'symbol': '▢', 'isOn': true}],
        [{'symbol': '▢', 'isOn': false}, {'symbol': '×', 'isOn': true}, {'symbol': '▷', 'isOn': true}, {'symbol': '▢', 'isOn': true}],
        [{'symbol': '+', 'isOn': true}, {'symbol': '◁', 'isOn': false}, {'symbol': '▷', 'isOn': false}, {'symbol': '▢', 'isOn': true}],
    ],
    '4': [
        [{'symbol': '▷', 'isOn': true}, {'symbol': '▢', 'isOn': true}, {'symbol': '—', 'isOn': false}, {'symbol': '▢', 'isOn': true}, {'symbol': '◁', 'isOn': true}],
        [{'symbol': '▢', 'isOn': true}, {'symbol': '◁', 'isOn': true}, {'symbol': '+', 'isOn': true}, {'symbol': '▷', 'isOn': true}, {'symbol': '▢', 'isOn': true}],
        [{'symbol': '丨', 'isOn': true}, {'symbol': '+', 'isOn': true}, {'symbol': '×', 'isOn': false}, {'symbol': '+', 'isOn': true}, {'symbol': '丨', 'isOn': true}],
        [{'symbol': '▢', 'isOn': true}, {'symbol': '◁', 'isOn': true}, {'symbol': '+', 'isOn': true}, {'symbol': '▷', 'isOn': true}, {'symbol': '▢', 'isOn': true}],
        [{'symbol': '▷', 'isOn': true}, {'symbol': '▢', 'isOn': true}, {'symbol': '—', 'isOn': true}, {'symbol': '▢', 'isOn': true}, {'symbol': '◁', 'isOn': false}],
    ],
    '5': [
        [{'symbol': '▢', 'isOn': true}, {'symbol': '—', 'isOn': true}, {'symbol': '丨', 'isOn': true}, {'symbol': '▷', 'isOn': true}, {'symbol': '◁', 'isOn': true}],
        [{'symbol': '×', 'isOn': true}, {'symbol': '+', 'isOn': true}, {'symbol': '▢', 'isOn': true}, {'symbol': '—', 'isOn': true}, {'symbol': '丨', 'isOn': true}],
        [{'symbol': '▷', 'isOn': true}, {'symbol': '◁', 'isOn': true}, {'symbol': '×', 'isOn': true}, {'symbol': '+', 'isOn': false}, {'symbol': '▢', 'isOn': true}],
        [{'symbol': '—', 'isOn': true}, {'symbol': '丨', 'isOn': true}, {'symbol': '▷', 'isOn': false}, {'symbol': '◁', 'isOn': true}, {'symbol': '×', 'isOn': true}],
        [{'symbol': '+', 'isOn': false}, {'symbol': '▢', 'isOn': true}, {'symbol': '—', 'isOn': true}, {'symbol': '丨', 'isOn': true}, {'symbol': '▷', 'isOn': true}],
    ]
}

export const usePuzzleStore = defineStore('puzzle', () => {    
    const puzzleMap = ref(puzzleMaps["0"])
    const steps = ref(0)

    function switchPuzzle(id: string){
        puzzleMap.value = cloneDeep(puzzleMaps[id])
        steps.value = 0
    }

    function lightOff(row: number, col: number): boolean{
        const updatedMap = updateMap(puzzleMap.value, row, col)
        puzzleMap.value = updatedMap

        return isAllOff(updatedMap)
    }

  return { puzzleMap, steps, switchPuzzle, lightOff }
})
