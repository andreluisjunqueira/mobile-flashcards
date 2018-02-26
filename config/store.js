import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import logger from 'redux-logger'
import rootReducer from '../redux'

const middewares = [];
middewares.push(ReduxThunk);

const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

if(__DEV__){
    middewares.push(logger);
}

const store = createStore(persistedReducer, applyMiddleware(...middewares)) ;
const persistor = persistStore(store);
//persistor.purge()
export {
    store,
    persistor
} 