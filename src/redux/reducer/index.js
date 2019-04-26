// src\redux\reducer\index.js
/*
 * Reducer: 数据处理
 */
import {type} from "../action";
const initalState = {
    menuName: ["/home"]
}

const ebikeData = (state = initalState,action)=>{
    switch (action.type) {
        case type.SWITCH_MENU:
        {
            return {
                ...state,
                menuName: action.menuName
            }
        }
        default:
            return {
                ...state
            }

    }
}


export default ebikeData;