import { INIT_STATE } from './states'
import produce from "immer"
import {
} from './constants'
export default function accountReducers(state = INIT_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            default:
                return state
        }
    })
}