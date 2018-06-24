import { combineReducers,createStore,applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// import {createLogger}  from 'redux-logger';
// const logger = createLogger();

import {Redux as Login} from "@/contents/Login";
import {Redux as Supplier} from "@/contents/Supplier"; 
import {Redux as Supplier_create } from "@/contents/Supplier_create";
import {Redux as Supplier_update } from "@/contents/Supplier_update";

import {Redux as Temp} from "@/contents/Temp"; 
import {Redux as Temp_create} from "@/contents/Temp_create"; 
import {Redux as Temp_update} from "@/contents/Temp_update"; 

import {Redux as Home} from "@/contents/Home"; 

import {Redux as Changepwd} from "@/contents/Changepwd"; 

import {Redux as Register} from "@/contents/Register"; 

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    Home,
    Login,
    Supplier,
    Supplier_create,
    Supplier_update,
    Temp,
    Temp_create,
    Temp_update,
    Changepwd,
    Register
})


export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )

  return store
}
