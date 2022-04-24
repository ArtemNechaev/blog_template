import { useMemo } from 'react'
import { createStore, applyMiddleware, compose, combineReducers, Store } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {DrawerState, actionCreators, drawerReducer} from './drawer'
//import reducers from './reducers'


export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => AppState): void;
}

const reducers = combineReducers({
    drawer: drawerReducer
}) 

let store: Store<AppState>

export type AppState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch


function configureStore(initialState: AppState) {
    const middlewares = [
        thunkMiddleware,
    ]
    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    return createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middlewares), ...enhancers)
    )
}

export const initializeStore = (preloadedState: AppState) => {
    let _store = store ?? configureStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = configureStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState: AppState): Store<AppState> {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

