import { INIT_STATE } from './states'
import produce from "immer"
import {
    SAVE_GET_ALL,
    SAVE_GET_ALL_BOOKING
} from './constants'
export default function facilityBookingReducers(state = INIT_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SAVE_GET_ALL:
                console.log(action.payload)
                draft.dataFacilityBooking = action.payload
                break
            case SAVE_GET_ALL_BOOKING:
                console.log(action.payload)
                draft.dataBooking = action.payload
                break
            default:
                return state
        }
    })
}