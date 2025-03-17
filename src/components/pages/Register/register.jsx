import React, { useRef, useState } from 'react';
import { Card, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import "./register.scss"
function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const usernameRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();

    const { registerMutation } = useAuth();
    const handleSubmit = () => {
        registerMutation.mutate({ username, password, name });
    }
    return (
        <Card className='register' style={{ margin: "0 auto", marginTop: '100px' }}>
            <p className='register-texts'> Register </p>
            <Form className='form'>
                <Form.Item label="Username">
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} ref={usernameRef} placeholder="Enter username" />
                </Form.Item>
                <Form.Item label="Name">
                    <Input value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} placeholder="Enter your name" />
                </Form.Item>
                <Form.Item label="Password">
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef} placeholder="Enter password" />
                </Form.Item>
                <p className='register-text' style={{ marginTop: 10 }}>
                    Do you have an account? <Link to="/login">Login</Link>
                </p>
                <Button className='register-btn' type="primary" onClick={handleSubmit}>
                    Register
                </Button>
            </Form>
            <Card className="newCards">
                <div className="newImages">
                    <img src="/public/icons/blog-solid (1).svg" alt="" />
                    <br />
                    <h5>Welcome back to</h5>
                    <h1>Shopping List</h1>
                </div>
            </Card>
        </Card>
    );
};

export default Register;
