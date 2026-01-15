import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import Note from '../../components/Note/Note.jsx';
import { useRecoilState } from 'recoil';
import { noteAtom } from '../../Atoms/noteAtom.js';





const Home = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [notes, setNotes] = useState([])
    let [deleteNoteError, setDeleteNoteError] = useState("")
    let [notesLength, setNotesLength] = useRecoilState(noteAtom)


    async function addNote(values) {
        await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
            headers: {
                token: `3b8ny__${localStorage.getItem("userToken")}`
            }
        })
            .then((response) => {
                if (response?.data?.msg == "done") {
                    handleClose()
                    values.title = ""
                    values.content = ""
                    getNotes()
                    console.log(response)

                }
            })
            .catch((error) => {
                console.log(error);

            })
    }

    async function getNotes() {
        setDeleteNoteError(null)
        await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
            headers: {
                token: `3b8ny__${localStorage.getItem("userToken")}`
            }
        })
            .then((response) => {

                setNotes(response?.data?.notes)
                setNotesLength(response?.data?.notes.length)
                console.log(response?.data?.notes);


            })
            .catch((error) => {
                console.log(error);
                setDeleteNoteError(error?.response?.data?.msg)
                setNotesLength(0)

            })
    }

    async function deleteNote(ID) {
        await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${ID}`, {
            headers: {
                token: `3b8ny__${localStorage.getItem("userToken")}`
            }
        })
            .then((response) => {
                console.log(response);
                getNotes()
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
        onSubmit: addNote
    })


    useEffect(() => {
        getNotes()
    }, [])

    return (
        <div className='container'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ِAdd Note</Modal.Title>
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
                        Add Note
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button onClick={handleShow} className='btn bg-primary text-white d-block ms-auto mt-3'>
                <FaPlus className="me-2" />
                Add Note
            </Button>
            {deleteNoteError ? <h4>{deleteNoteError}</h4> : <>
                <h2 className='mb-4'>Notes</h2>
                <div className='row g-4'>
                    {notes?.map((note) => {
                        return <Note key={note._id} note={note} deleteNote={deleteNote} ></Note>
                    })}
                </div>
                <h5 className='my-3 text-end'>Notes Number : {notesLength}</h5>
            </>}
        </div>
    )
}

export default Home
