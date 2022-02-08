import { INIT_STATE } from './states'
import produce from "immer"
import {
    
} from './constant'
export default function bookingReducers(state = INIT_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            default:
                return state
        }
    })
}