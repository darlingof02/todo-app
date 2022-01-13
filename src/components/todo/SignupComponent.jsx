import React, {Component, useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthenticationService from "./AuthenticationService";
import axios from "axios";

function SignupComponent() {
    const [username, setUsername] = useState("")
    const [password, setPW] = useState("")
    const [ShowSuccess, setSuccess] = useState(false)
    const [showFailure, setFailure] = useState(false)

    // useEffect(() => {
        
    // }) 

    return (
        <div className='container'>
            {showFailure && <div className='alert alert-warning'>Username Has Been Used</div>}
            {ShowSuccess && <div>Sign Up Successful</div>}
            <h1>Sign Up</h1>
                    <Formik
                    onSubmit={(values) => 
                        {
                            setUsername(values.username)
                            setPW(values.password)
                            // console.log(username + ":" + password)

                            AuthenticationService.signup(values.username, values.password)
                            .then(
                                (Response) => {
                                    if (Response.data === "Created Success") {
                                        setSuccess(true)
                                        setFailure(false)
                                    } else {
                                        setSuccess(false)
                                        setFailure(true)
                                    }
                                }
                            )

                        }}
                    enableReinitialize={true}
                    initialValues={{username, password}}>
                        <Form>
                            <div>
                                <fieldset className='mb-3'>
                                    <label>username:&nbsp;&nbsp;</label>
                                    <Field className="form" type='text' name="username"></Field>
                                </fieldset>
                            </div>
                            <div>
                                <fieldset className='mb-3'>
                                    <label>password:&nbsp;&nbsp;</label>
                                    <Field className="form" type='password' name="password"></Field>
                                </fieldset>
                            </div>
                            <button className='btn btn-success'>Sign Up</button>
                        </Form>
                    </Formik>

                    
                </div>
    )
}

// function signupClicked(values) {
//     console.log(values.username + " : " +  values.password)
//     AuthenticationService.signup(values.username, values.password)
//     .then()

//     // setUsername(values.username)

// }

export default SignupComponent;

// function validate(values) {
//     // console.log(values)
//     let errors = {}
//     if (AuthenticationService.)
//     else if (!values.password) {
//         errors.description = 'Enter a password'
//     } else if (values.description.length < 5) {
//         errors.description = 'Enter at least 5 Characters in Description'
//     }

//     if (!moment(values.targetDate).isValid()) {
//         errors.targetDate = 'Enter a valid Target Date'
//     }

//     return errors
// }