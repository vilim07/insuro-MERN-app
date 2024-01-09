import React, { Dispatch, createContext, useReducer } from "react";
import { Action, AllPayload, DataContextState, UpdatePayload } from "../types";

export const DataContext = createContext<{
    state: DataContextState;
    dispatch: Dispatch<Action>;
}>({ state: {} as DataContextState, dispatch: () => { } });

export const dataReducer = (state: DataContextState, action: Action): DataContextState => {


    switch (action.type) {
        case 'SET_ALL':
            const payload = action.payload as AllPayload;

            return {
                formData: payload.formData,
                coverages: payload.coverages,
                discounts: payload.discounts,
                bill: payload.bill
            }
        case 'UPDATE': {
            const payload = action.payload as UpdatePayload;

            return {
                ...state,
                coverages: payload.coverages,
                discounts: payload.discounts,
                bill: payload.bill
            }
        }
        default:
            return state
    }
}

export const DataContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(dataReducer, {
        formData: {
            name: '',
            age: 0,
            city: '',
            power: 0,
            voucher: null,
            priceMatch: null
        },
        coverages: [],
        discounts: [],
        bill: null,
    }, (initialState: DataContextState) => initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}