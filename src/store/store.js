import { createStore, combineReducers, applyMiddleware, compose  } from "redux";
import { persistStore, persistCombineReducers, persistReducer, REHYDRATE, autoRehydrate } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage"
import statusReducer from "./reducers/status.reducer";
import thunk from 'redux-thunk';

// const middleware = compose(
//   applyMiddleware(thunk),
//   autoRehydrate({log:true}),
// );

const persistConfig = {
    key : 'root',
    storage: AsyncStorage,
    whiteList: ['statusReducer']
}


const rootReducer = combineReducers({
    "statusReducer": persistReducer({key:'statusReducer', storage:AsyncStorage}, statusReducer)
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);