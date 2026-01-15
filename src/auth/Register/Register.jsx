import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';





const Register = () => {

    let navigate = useNavigate()
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    async function handleRegister(values) {
        setIsLoading(true)

        await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
            .then((response) => {
                if (response?.data?.msg == "done") {
                    setIsLoading(false)
                    console.log(response);
                    navigate("/login");
                }

            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
                setApiError(error?.response.data.msg)
            })
    }

    let validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Name Length is 3").max(12, "Name Max Length is 12").required("Name is Required"),
        email: Yup.string().email("Email is Invalid").required("Email is Required"),
        password: Yup.string().matches(/^(?=.*[A-Z]).{6,}$/, "Invalid Password").required("password is Required"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Phone Not Egyption Number").required("Phone is Required"),
        age: Yup.number().min(16, "too young").max(62, "too old").required("Age is Require")
    })

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            age: "",
            phone: ""
        },
        validationSchema: validationSchema,
        onSubmit: handleRegister
    })




   return (
  <div className="container py-5">
    <div className="row justify-content-center align-items-center">
      <div className="col-md-5 mb-4 mb-md-0">
        <img src="/signup-image.jpg" className="w-100 rounded-4 shadow-sm" alt="" />
      </div>

      <div className="col-md-5">
        <div className="p-4 shadow-sm bg-white rounded-4">
          <h3 className="mb-4 fw-semibold">Register Now:</h3>

          {apiError && (
            <div className="alert alert-danger"><strong>{apiError}</strong></div>
          )}

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" name="name"
                value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              {formik.errors.name && formik.touched.name && (
                <div className="alert alert-danger mt-2"><strong>{formik.errors.name}</strong></div>
              )}
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="Age">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" placeholder="Age" name="age"
                value={formik.values.age} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              {formik.errors.age && formik.touched.age && (
                <div className="alert alert-danger mt-2"><strong>{formik.errors.age}</strong></div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="Phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Phone Number" name="phone"
                value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              {formik.errors.phone && formik.touched.phone && (
                <div className="alert alert-danger mt-2"><strong>{formik.errors.phone}</strong></div>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2 mb-3">
              {isLoading ? <FaSpinner className="spinner" /> : "Register"}
            </Button>

            <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
          </Form>
        </div>
      </div>
    </div>
  </div>
)

}

export default Register
