import { getFirstDayOfWeek, getEndDayOfWeek} from '../utils/utils'
import { SET_CURRENT_DATE } from '../actions/dateActions'

export const initialState = {
  currentDate: new Date(),
  weekStart: getFirstDayOfWeek(new Date()),
  weekEnd: getEndDayOfWeek(new Date()),
}

export default function dateReducer(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.payload,
        weekStart: getFirstDayOfWeek(action.payload),
        weekEnd: getEndDayOfWeek(action.payload)
      }
    default:
      return state
  }
}
