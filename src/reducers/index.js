import { combineReducers } from 'redux'
import dateReduer from './dateReducer'

const rootReducer = combineReducers({date: dateReduer})
export default rootReducer
