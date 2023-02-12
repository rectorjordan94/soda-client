import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import NutritionForm from '../shared/NutritionForm'
import { createNutrition } from '../../api/nutritions'
import messages from '../shared/AutoDismissAlert/messages'

const NewNutritionModal = (props) => {
    const { soda, show, handleClose, msgAlert, triggerRefresh } = props

    const [nutrition, setNutrition] = useState({})

    const onChange = (e) => {
        e.persist()

        setNutrition(prevNutrition => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            
            if (updatedName === 'hasCaffeine' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'hasCaffeine' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedNutrition = {
                [updatedName] : updatedValue
            }

            return {
                ...prevNutrition, ...updatedNutrition
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createNutrition(soda.id, nutrition)
            // first we'll close the modal
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
                    message: 'ya failed',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <NutritionForm 
                    nutrition={nutrition}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${soda.name} some nutrition facts!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewNutritionModal