import { createStore } from "redux";
import {counterReducer} from '../reducers/reducers'

const counterStore = createStore(counterReducer)
export {
counterStore
} ;