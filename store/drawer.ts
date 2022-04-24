import { Reducer } from 'redux'

export interface DrawerState<T> {
    active: boolean,
    desctopOpen: boolean,
    mobileOpen: boolean,
    data: DrawerData<T>
}

export interface DrawerData<T> {
    mapper?: Mapper,
    tree: Array<T>
}

interface Mapper {
    level_0: string,
    level_1: string,
    level_2: string
}
export const actionCreators = {
    setActive: () => ({
        type: 'SETACTIVE'
    }) as const,
    setMobile: () => ({
        type: 'SETMOBILE'
    } as const),
    setDesctop: () => ({
        type: 'SETDESCTOP'
    } as const),
    putData: <T>(data: DrawerData<T>) => ({
        type: 'PUTDATA',
        data: data
    } as const),
    clear: () => ({
        type: 'CLEAR'
    } as const)
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
type actionTypes = ReturnType<InferValueTypes<typeof actionCreators>>

const initialState: DrawerState<string> = { active: false, desctopOpen: false, mobileOpen: false, data: { tree: [] } }

export const drawerReducer: Reducer<DrawerState<unknown>, actionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case 'SETACTIVE': {
            return {
                ...state,
                active: !state.active
            }
        }
        case 'SETDESCTOP': {
            return {
                ...state,
                desctopOpen: !state.desctopOpen
            }
        }
        case 'SETMOBILE': {
            return {
                ...state,
                mobileOpen: !state.mobileOpen
            }
        }
        case 'PUTDATA': {
            return {
                ...state,
                data: action.data
            }
        }
        case 'CLEAR': {
            return initialState;
        }
        default: {
            return state;
        }
    }
}