import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {
    const [Email, updateEmail] = useState('')
    const [Password, updatePassword] = useState('')
    const [UserType, updateUserType] = useState('PROFESSOR')

    const validateSignup = (event) => {
        event.preventDefault();
        const validateEmail = () => {
            const re = /\S+@\S+\.\S+/;
            return re.test(Email);
        };

        const validatePassword = () => {
            const pwdRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
            return pwdRegex.test(Password)
        }

        if (Email !== '' || Password !== '') {
            if (!validateEmail()) {
                toast.error('Please enter a Valid Email ID !!!!')
                return
            }

            if (!validatePassword()) {
                toast.error('Please enter a Valid Password !')
                return
            }

            const user = {
                Password: Password,
                Email: Email,
                UserType: UserType
            }
            loginUser(user)
        } else {
            toast.error('Please enter all fields !!!!');
        }
    }

    const loginUser = async (user) => {
        await axios.post('https://amsserver.herokuapp.com/user/login', user).then((response) => {
            if (response.status === 200) {
                if (response.data) {
                    toast.error('User Logged In Successfully !!!');
                    localStorage.setItem('userdetails', JSON.stringify(response.data))
                    if (response.data.UserType === 'PROFESSOR') {
                        setTimeout(() => { window.location.href = '/professionaldashboard' }, 2000)
                    } else {
                        setTimeout(() => { window.location.href = '/studentdashboard' }, 2000)
                    }
                } else {
                    toast.error('User Invalid Credentials !!!');
                }
            } else {
                toast.error('Something Went Wrong ! Please try again later !');
            }
        })
    }


    return (<div className="body login_bg">
        <div className="login-box">
            <i className="fas fa-user fa-3x"></i>
            <h1>login here</h1>
            <div className="text-box">
                <span>Email</span>
                <input type="text" placeholder="Enter Email" value={Email} onChange={(event) => updateEmail(event.target.value)} />
            </div>
            <div className="text-box">
                <span>password</span>
                <input type="password" placeholder="Enter Password" value={Password} onChange={(event) => updatePassword(event.target.value)} />
            </div>
            <div className="text-box" style={{ marginBottom: '20px' }}>
                <span>User Role</span>
                <select name="userrole" id="userrole" value={UserType} onChange={(event) => updateUserType(event.target.value)}>
                    <option value="PROFESSOR">Professor</option>
                    <option value="STUDENT">Student</option>
                </select>
            </div>
            <div className="text-box">
                <input type="submit" value="Login" onClick={(event) => validateSignup(event)} />
            </div>
            <a href="/signup">Don't have an account ?</a>
        </div>
    </div>)
}

export default Login