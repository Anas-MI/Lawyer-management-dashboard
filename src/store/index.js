import { createStore , applyMiddleware } from 'redux';
import reducer from './reducer'
import thunk from 'redux-thunk';
import {persist} from './persist'
import {throttle} from 'lodash'
import { composeWithDevTools } from 'redux-devtools-extension'

//Create Store
const store = createStore(reducer , composeWithDevTools(applyMiddleware(thunk)));


//Listener
const listener = throttle(() => {
    let state = store.getState()
    persist(state, 'user') //Persist state.user
  }, 2000)

  
store.subscribe(listener)
  
export default store