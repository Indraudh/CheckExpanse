import React from 'react';
import {Form, message} from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from 'antd/lib/input/Input';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Password from 'antd/lib/input/Password';

function Login() {

    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();

    const onFinish=async(values)=>{
        try {
            setLoading(true);
            const response=await axios.post('/api/users/login',values);
            localStorage.setItem('checkSpense',JSON.stringify({...response.data,password:''}));
            setLoading(false);
            message.success('Login successful');
            navigate('/');
        } catch (error) {
            setLoading(false);
            message.error('Login failed');
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('checkSpense')){
            navigate('/');
        }
    })

    return (  
        <div className='register'>

            {loading&&<Spinner />}
            
            <div className='row justify-content-center align-items-center w-100 h-100'>

                <div className='col-md-4'>

                    <Form layout='vertical' onFinish={onFinish}>

                        <h1>Welcome back!</h1>

                        <hr></hr>

                        <Form.Item label='E-mail' name='email'>
                            <Input/>
                        </Form.Item>

                        <Form.Item label='Password' name='password'>
                            <Input type='password'/>
                        </Form.Item>

                        <div className='d-flex justify-content-between align-items-center'>

                            <Link to='/register'>Not registered yet? Click here to register!</Link>

                            <button className='secondary' type='submit'>LOG IN</button>

                        </div>

                    </Form>

                </div>

                <div className='col-md-5'>

                    <div className='lottie'>

                        <lottie-player 
                            src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"  
                            background="transparent"  
                            speed="1" 
                            loop 
                            autoplay>

                        </lottie-player>

                    </div>

                </div>

            </div>
            
        </div>
    );
}

export default Login;