import React from 'react'
import Card from 'react-bootstrap/Card';
import { FaTrash, FaEdit } from "react-icons/fa";


const Note = ({ note }) => {
    return (
        <div className="col-md-4">
            <Card>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                        {note.content}
                    </Card.Text>

                    <div className='d-flex gap-2' >
                        <FaEdit className='text-primary fs-4  cursor-pointer' />
                        <FaTrash className='text-primary fs-4 cursor-pointer ' />
                    </div>




                </Card.Body>
            </Card>
        </div>
    )
}

export default Note
