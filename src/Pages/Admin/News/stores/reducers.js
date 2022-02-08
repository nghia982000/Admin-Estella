import { INIT_STATE } from './states'
import produce from "immer"
import {
    SAVE_DETAIL_NEWS
} from './constants'
export default function newsReducers(state = INIT_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SAVE_DETAIL_NEWS:
                draft.dataDetailNews = action.payload
                break
            default:
                return state
        }
    })
}