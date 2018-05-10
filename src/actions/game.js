export function moveCeil(direction){
    return {
        type: 'MOVE_' + direction.toUpperCase()
    }
}
export function getNums(){
    return {
        type: 'GET_NUMS'
    }
}

export function FinishGame(){
    return {
        type: 'FINISH_GAME'
    }
}