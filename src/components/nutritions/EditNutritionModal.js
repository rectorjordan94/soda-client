import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import NutritionForm from '../shared/NutritionForm'
import { updateNutrition } from '../../api/nutritions'

const EditNutritionModal = (props) => {
    const { user, soda, show, handleClose, msgAlert, triggerRefresh } = props

    const [nutrition, setNutrition] = useState(props.nutrition)

    const onChange = (e) => {
        e.persist()
        
        setNutrition(prevNutrition => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'hasCaffeine' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'hasCaffeine' && !e.target.checked) {
                updatedValue = false
            }

            const updatedNutrition = {
                [updatedName] : updatedValue
            }
            
            console.log('the nutrition', updatedNutrition)
            console.log('the nutrition (state)', nutrition)

            return {
                ...prevNutrition, ...updatedNutrition
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateNutrition(user, soda.id, nutrition)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The nutrition is better than ever',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
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
                    heading="Update The Nutrition"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditNutritionModal