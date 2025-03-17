import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { Form, Input, Button, Card } from "antd";
import useAuth from '../../../hooks/useAuth';
import "./login.scss"
function Login() {

    const [username, setUsername] = useState('muhammadazim');
    const [password, setPassword] = useState('123456');   
    const { loginMutation} = useAuth();
    if (localStorage.getItem('token')) {
        return <Navigate to="/" replace />
    }
    const handleSubmit = () => {
        loginMutation.mutate({ username, password });
    };

    return (
        <Card className='logins' >
            <p className='logins-text'>Sign In</p>
            <Form>
                <Form.Item label="Username">
                    <Input placeholder="Enter username" value={username}  onChange={(e) => setUsername(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Password">
                    <Input.Password placeholder="Enter password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>
                <p className='logins-textes'>
                    Don't you have an account? <Link to="/register">Register</Link>
                </p>
                <Button className='logins-btn' type="primary" onClick={handleSubmit} >
                    Sign In
                </Button>
            </Form>
            <Card className="newCard">
                <div className="newImage">
                    <img src="/public/icons/blog-solid (1).svg" alt="" />
                    <br />
                    <h5>Welcome back to</h5>
                    <h1>Shopping List</h1>
                </div>
            </Card>
        </Card>
    );
};

export default Login;