import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SodaForm from '../shared/SodaForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditSodaModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateSoda, msgAlert, triggerRefresh } = props

    const [soda, setSoda] = useState(props.soda)

    const onChange = (e) => {
        e.persist()
        
        setSoda(prevSoda => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'hasCaffeine' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'hasCaffeine' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedSoda = {
                [updatedName] : updatedValue
            }
            

            return {
                ...prevSoda, ...updatedSoda
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateSoda(user, soda)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'noice',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'failed',
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <SodaForm 
                    soda={soda} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Soda"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditSodaModal