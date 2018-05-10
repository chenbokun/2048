import { combineReducers } from 'redux'
import * as actions from '../actions/game.js'

let initNums = [
    [0,0,0,0],
    [0,2,2,0],
    [0,2,4,0],
    [0,0,4,8]
]
function getStoreNums(){
    if(localStorage.getItem('initNums')){
        return JSON.parse(localStorage.getItem('initNums'));
    }else{
        return _initNums()
    }
}
function _initNums(){
    initNums = [
        [0,0,0,0],
        [0,2,2,0],
        [0,2,4,0],
        [0,0,4,8]
    ]
    for(let item of initNums){
        for(let i in item){
            item[i] = {
                num: 0,
                direction:null,
                from:0,
                new:false,
                merge:[],
                key: random()
            }
        }
    }
    makeCell(2,initNums,getSpace(initNums))
    return initNums
}
function isOver(nums,rest){
    if(rest.length>0){
        return false
    }

    let types = ['UP','DOWN','LEFT','RIGHT'], flag = true
    for(let type of types){
        if(computeNewNums(nums,type,true)){
            flag = false
        }
    }

    return flag

}
function save(nums){
    localStorage.initNums=JSON.stringify(nums);
}
function random(){
    return Math.floor(Math.random() * 10000) + 1;  
}
function copy(obj){
    return JSON.parse(JSON.stringify(obj))
}
function getSpace(nums){
    let arr = []
    for(let x=0;x<4;x++){
        for(let y=0;y<4;y++){
            if(nums[x][y].num === 0){
                arr.push({
                    x,y
                })
            }
        }
    }
    return arr
}
function makeCell(num=1, nums, rest){
    for(let i=0;i<num;i++){
        let r = Math.floor(Math.random()*rest.length)
        let cell = nums[rest[r].x][rest[r].y]
        cell.num = [2,4][Math.floor(Math.random()*2)]
        cell.new = true
    }
    return nums
}
function computeNewNums(old_num,type,isCheck){
    let nums = JSON.parse(JSON.stringify(old_num))
    if(type==='UP'){
        for(let y=0;y<4;y++){
            for(let x=0;x<3;x++){
                let k = x
                while(k+1<4&&nums[x][y].num!=0){
                    if(nums[x][y].num === nums[k+1][y].num){
                        let old_value = copy(nums[x][y])
                        let old_value2 = copy(nums[k+1][y])
                        nums[x][y].num = nums[k+1][y].num*2
                        nums[k+1][y].num = 0
                        nums[x][y].key = random()
                        nums[k+1][y].key = random()
                        nums[x][y].merge = [
                            old_value,
                            old_value2
                        ]
                        x=4 //用于退出外层循环
                        break;
                    }else if(nums[k+1][y].num!=0){
                        break;
                    }
                    k++
                }
            }
            for(let x=1;x<4;x++){
                let k = x
                while(k-1>=0&&nums[k-1][y].num===0){
                    if(nums[k][y].num!=0){
                        nums[k-1][y].num = nums[k][y].num
                        nums[k][y].num=0
    
                        nums[k-1][y].key = nums[k][y].key
                        nums[k][y].key = random()
                    }
                    k--
                }
            }
        }
    }else if(type === 'DOWN'){
        for(let y=3;y>=0;y--){
            for(let x=3;x>0;x--){
                let k = x
                while(k-1>=0 && nums[x][y].num!=0){
                    if(nums[x][y].num === nums[k-1][y].num){
                        let old_value = copy(nums[x][y])
                        let old_value2 = copy(nums[k-1][y])

                        nums[x][y].num = nums[k-1][y].num*2
                        nums[k-1][y].num = 0

                        nums[x][y].key = random()
                        nums[k-1][y].key = random()
                        nums[x][y].merge = [
                            old_value,
                            old_value2
                        ]
                        x=0
                        break;
                    }else if(nums[k-1][y].num!=0){
                        break;
                    }
                    k--
                }
            }

            for(let x=2;x>=0;x--){
                let k = x
                while(k+1<4&&nums[k+1][y].num===0){
                    if(nums[k][y].num!=0){
                        nums[k+1][y].num = nums[k][y].num
                        nums[k][y].num=0
    
                        nums[k+1][y].key = nums[k][y].key
                        nums[k][y].key= random()
                    }
                    k++
                }
            }
        }
    }else if(type === 'LEFT'){
        for(let x = 0;x<4;x++){
            for(let y=0; y<4;y++){
                let k = y
                while(k+1<4 &&nums[x][y].num != 0){
                    if(nums[x][y].num === nums[x][k+1].num){
                        let old_value = copy(nums[x][y])
                        let old_value2 = copy(nums[x][k+1])

                        nums[x][y].num = nums[x][k+1].num * 2
                        nums[x][k+1].num  = 0

                        nums[x][y].key = random()
                        nums[x][k+1].key = random()
                        nums[x][y].merge = [
                            old_value,
                            old_value2
                        ]
                        y=4
                        break;
                    }else if(nums[x][k+1].num!=0){
                        break;
                    }
                    k++
                }
            }
            for(let y=1;y<4;y++){
                let k = y
                while(k-1>=0 && nums[x][k-1].num === 0){
                    if(nums[x][k].num !=0){
                        nums[x][k-1].num = nums[x][k].num
                        nums[x][k].num = 0
    
                        nums[x][k-1].key = nums[x][k].key
                        nums[x][k].key = random()
                    }
                    k--
                }
            }
        }
    }else if(type === 'RIGHT'){
        for(let x=0;x<4;x++){
            for(let y=3;y>0;y--){
                let k = y
                while(k-1>=0 && nums[x][y].num != 0){
                    if(nums[x][y].num === nums[x][k-1].num){
                        let old_value = copy(nums[x][y])
                        let old_value2 = copy(nums[x][k-1])

                        nums[x][y].num = nums[x][k-1].num*2
                        nums[x][k-1].num = 0

                        nums[x][y].key = random()
                        nums[x][k-1].key = random()
                        nums[x][y].merge = [
                            old_value,
                            old_value2
                        ]
                        y=0
                        break;
                    }else if(nums[x][k-1].num!=0){
                        break;
                    }
                    k--
                }
            }
            for(let y=2;y>=0;y--){
                let k = y
                while(k+1<4&&nums[x][k+1].num===0){
                    if(nums[x][k].num != 0 ){
                        nums[x][k+1].num = nums[x][k].num
                        nums[x][k].num=0
    
                        nums[x][k+1].key = nums[x][k].key
                        nums[x][k].key= random()
                    }
                    k++
                }
            }
        }
    }
    let rest = getSpace(nums)
    if(JSON.stringify(nums)!=JSON.stringify(old_num)){
        if(isCheck){
            return true
        }else{
            nums = makeCell(1,nums,rest)
        }
    }else{
        if(isCheck){
            return false
        }
    }

    if(isOver(nums,getSpace(nums))){
        window.gameOver = true
    }

    save(nums)
    return nums
}
function nums(state=[], action){
    switch (action.type){
        case 'MOVE_UP':
        case 'MOVE_DOWN':
        case 'MOVE_LEFT':
        case 'MOVE_RIGHT':
            return [...computeNewNums(state,action.type.match(/MOVE_(.+)/)[1].toUpperCase())]
        default:
            return getStoreNums()
    }
}
function gameInfo(state={finish:false},action){
    switch (action.type){
        case 'FINISH_GAME':
            return Object.assign({},state,{finish:true})
        default:
            return state
    }
}


export default {
    nums,
    gameInfo
}