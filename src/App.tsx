import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import {authRoutes, publicRoutes} from "./routes";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {check} from "./store/asyncActions/fetchUser";
import SnackBar from "./components/UI/SnackBar/SnackBar";

function App() {

    const dispatch = useAppDispatch()
    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(check())
        }
    }, [])

    const {isAuth} = useAppSelector(state => state.UserReducer)

    return (
      <BrowserRouter>
          <NavBar />
          <SnackBar />
          <Routes>
              {isAuth && authRoutes.map(route =>
                  <Route key={route.path} path={route.path} element={route.element} />
              )}
              {!isAuth && publicRoutes.map(route =>
                  <Route key={route.path} path={route.path} element={route.element} />
              )}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
