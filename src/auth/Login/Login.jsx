import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {

    let navigate = useNavigate()
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(values) {
        setIsLoading(true)
        await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
            .then((response) => {
                if (response?.data?.msg == "done") {
                    setIsLoading(false)
                    // console.log(response?.data);
                    localStorage.setItem("userToken", response?.data?.token)
                    navigate("/")
                }
            })
            .catch((error) => {
                setIsLoading(false)
                // console.log(error);
                setApiError(error?.response.data.msg)
            })
    }

    let validationSchema = Yup.object().shape({
        email: Yup.string().email("Email is Invalid").required("Email is Required"),
        password: Yup.string().matches(/^(?=.*[A-Z]).{6,}$/, "Invalid Password").required("password is Required")
    })


    let formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: handleLogin
    })




    return (
        <div className="container py-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-5 order-lg-0 order-1">
                    <div className="p-4 shadow-sm bg-white rounded-4">
                        <h3 className="mb-4 fw-semibold">Login Now:</h3>

                        {apiError && (
                            <div className="alert alert-danger"><strong>{apiError}</strong></div>
                        )}

                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3" controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email address" name="email"
                                    value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                {formik.errors.email && formik.touched.email && (
                                    <div className="alert alert-danger mt-2"><strong>{formik.errors.email}</strong></div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password"
                                    value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                {formik.errors.password && formik.touched.password && (
                                    <div className="alert alert-danger mt-2"><strong>{formik.errors.password}</strong></div>
                                )}
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 py-2 mb-3">
                                {isLoading ? <FaSpinner className="spinner" /> : "Login"}
                            </Button>

                            <p className="text-center">Don't have an account? <Link to="/register">Register</Link></p>
                        </Form>
                    </div>
                </div>

                <div className="col-md-5 mb-4 mb-md-0">
                    <img src="/signin-image.jpg" className="w-100 rounded-4 shadow-sm" alt="" />
                </div>
            </div>
        </div>
    )

}

export default Login
