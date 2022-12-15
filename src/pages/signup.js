import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";

const SignUp = () => {
    const [Email, updateEmail] = useState('')
    const [Phone, updatePhone] = useState('')
    const [FirstName, updateFirstName] = useState('')
    const [LastName, updateLastName] = useState('')
    const [Password, updatePassword] = useState('')
    const [confirmPassword, updateconfirmPassword] = useState('')
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

        const validateMobile = () => {
            const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
            return mobileRegex.test(Phone)
        }

        if (Email !== '' || Phone !== '' || FirstName !== '' || LastName !== '') {
            if (!validateEmail()) {
                toast.error('Please enter a Valid Email ID !!!!')
                return
            }

            if (!validatePassword()) {
                toast.error('Please enter a Valid Password !')
                return
            }

            if (!validateMobile()) {
                toast.error('Please enter a Valid Contact Number !!!!')
                return
            }

            if (confirmPassword !== Password) {
                toast.error('Password and Confirm Password does not match !!!!')
                return
            }

            const newuser = {
                FirstName: FirstName,
                LastName: LastName,
                Password: Password,
                Email: Email,
                Phone: Phone,
                UserType: UserType
            }
            addNewUser(newuser)
        } else {
            toast.error('Please enter all fields !!!!');
        }
    }

    const addNewUser = async (newuser) => {
        await axios.post('https://amsserver.herokuapp.com/user/register', newuser).then((response) => {
            if (response.status === 201) {
                toast.success('User Created Successfully !!!');
                setTimeout(() => { window.location.href = '/login' }, 2000)
            }
        })
    }

    return (<div className="body signup_bg">
        <div className="login-box">
            <i className="fas fa-user fa-3x"></i>
            <h1>Sign Up here</h1>
            <div className="text-box">
                <span>Email</span>
                <input type="text" placeholder="Enter Email" value={Email} onChange={(event) => updateEmail(event.target.value)} />
            </div>
            <div className="text-box">
                <span>First Name</span>
                <input type="text" placeholder="Enter First Name" value={FirstName} onChange={(event) => updateFirstName(event.target.value)} />
            </div>
            <div className="text-box">
                <span>Last Name</span>
                <input type="text" placeholder="Enter Last Name" value={LastName} onChange={(event) => updateLastName(event.target.value)} />
            </div>
            <div className="text-box">
                <span>Phone</span>
                <input type="text" placeholder="Enter Phone" value={Phone} onChange={(event) => updatePhone(event.target.value)} />
            </div>
            <div className="text-box">
                <span>Password</span>
                <input type="password" placeholder="Enter Password" value={Password} onChange={(event) => updatePassword(event.target.value)} />
            </div>
            <div className="text-box">
                <span>Confirm Password</span>
                <input type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(event) => updateconfirmPassword(event.target.value)} />
            </div>
            <div className="text-box" style={{ marginBottom: '20px' }}>
                <span>User Role</span>
                <select name="userrole" id="userrole" value={UserType} onChange={(event) => updateUserType(event.target.value)}>
                    <option value="PROFESSOR">Professor</option>
                    <option value="STUDENT">Student</option>
                </select>
            </div>
            <div className="text-box">
                <input type="submit" value="SignUp" onClick={(event) => validateSignup(event)} />
            </div>
            <a href="/login">Already have an account ?</a>
        </div>
    </div>)
}

export default SignUp