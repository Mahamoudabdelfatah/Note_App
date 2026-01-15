import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { FaTrash, FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const Note = ({ note, deleteNote, getNotes }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        formik.setValues({
            title: note.title,
            content: note.content
        });
        setShow(true);
    };



    async function updateNote(values) {
        await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, values, {
            headers: {
                token: `3b8ny__${localStorage.getItem("userToken")}`
            }
        })
            .then((response) => {
                console.log(response);
                getNotes()
                handleClose()
            })
            .catch((error) => {
                console.log(error);

            })

    }


    let validationSchema = Yup.object().shape({
        title: Yup.string().min(3, "Title min length 3").max(15, "Title Max Length 15").required("Title is Require"),
        content: Yup.string().min(5, "Content min length 5").max(50, "Content max length 50").required("Content is Require"),
    })


    let formik = useFormik({
        initialValues: {
            title: "",
            content: ""
        },
        validationSchema,
        onSubmit: updateNote
    })

    return (
        <div className="col-md-4">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <input value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='title' id='title' placeholder='Enter Note' className='form-control' />
                        {formik.errors.title && formik.touched.title && (<div className='alert alert-danger mt-4 mb-4 p-3'><strong>{formik.errors.title}</strong></div>)}
                        <textarea value={formik.values.content} onBlur={formik.handleBlur} onChange={formik.handleChange} name="content" id="content" className='form-control mt-2' placeholder='Enter Note Content' ></textarea>
                        {formik.errors.content && formik.touched.content && (<div className='alert alert-danger mt-4 mb-4 p-3'><strong>{formik.errors.content}</strong></div>)}

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={formik.handleSubmit}  >
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                        {note.content}
                    </Card.Text>

                    <div className='d-flex gap-2' >
                        <FaEdit className='text-primary fs-4  cursor-pointer' onClick={handleShow} />
                        <FaTrash className='text-primary fs-4 cursor-pointer ' onClick={() => deleteNote(note._id)} />
                    </div>




                </Card.Body>
            </Card>
        </div>
    )
}

export default Note
