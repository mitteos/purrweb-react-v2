import {IUser} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface stateProps {
    userInfo: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: stateProps = {
    userInfo: {} as IUser,
    isAuth: false,
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true
        },
        userFetchingSuccess(state) {
            state.isLoading = false
            state.error = ''
        },
        setUserSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false
            state.error = ''
            state.isAuth = true
            state.userInfo = action.payload
        },
        setUserInfo(state, action: PayloadAction<IUser>) {
            state.userInfo = action.payload
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        userLogout(state) {
            state.userInfo = {} as IUser
            state.isLoading= false
            state.isAuth = false
            localStorage.removeItem('token')
        }
    }
})

export default userSlice.reducer;