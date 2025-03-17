import React from 'react'
import Login from '../components/pages/Login/login';
import Register from '../components/pages/Register/register';
import Group from '../components/pages/Group/group';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Profile from '../components/pages/Profile/profile';
import { Header } from 'antd/es/layout/layout';
import CustomText from '../components/pages/CustomText/CustomText';
function Index() {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Profile />} />
                <Route path="/group" element={<Group />} /> 
                <Route path="/header" element={<Header />} />
                <Route path="/customtext" element={<CustomText />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default Index;
