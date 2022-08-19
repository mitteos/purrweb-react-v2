import { AppDispatch } from "../store";
import {$authHost, $host} from "../../API";
import jwt_decode from "jwt-decode";
import {userSlice} from "../reducers/userSlice";
import {AuthResponse, IUser, TokenInfo} from "../../types/types";


const getUserInfo = async (token: string) =>  {
    const decoded = jwt_decode<TokenInfo>(token)
    const {data} = await $host.get<IUser>(`users/${decoded.userId}`)
    return data
}


export const login = (email: string, password: string) => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userFetching())
        const {data} = await $host.post<AuthResponse>('auth/login', {email, password})
        localStorage.setItem('token', data.accessToken)
        const userInfo = await getUserInfo(data.accessToken)
        dispatch(userSlice.actions.setUserSuccess(userInfo))
    } catch (e: any) {
        dispatch(userSlice.actions.setError(e?.response?.data?.message))
    }
}

//todo: IUser props
export const registration = (email: string, password: string, name: string, surname: string, phone: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await $host.post('auth/register', {email, password, name, surname, phone,})
        dispatch(userSlice.actions.userFetchingSuccess())
    } catch (e: any) {
        dispatch(userSlice.actions.setError(e?.response?.data?.message))
    }
}

export const check = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const {data} = await $authHost.get<AuthResponse>('auth/refresh')
        localStorage.setItem('token', data.accessToken)
        const userInfo = await getUserInfo(data.accessToken)
        dispatch(userSlice.actions.setUserSuccess(userInfo))
    } catch (e: any) {
        dispatch(userSlice.actions.setError(e?.response?.data?.message))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        await $authHost.post('auth/log-out')
        dispatch(userSlice.actions.userLogout())
    } catch (e: any) {
        dispatch(userSlice.actions.setError(e?.response?.data?.message))
    }
}