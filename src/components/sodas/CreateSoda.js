
import { useState } from 'react'
import { createSoda } from '../../api/sodas'
import SodaForm from '../shared/SodaForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateSoda = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [soda, setSoda] = useState({
        name: '',
        details: '',
        hasCaffeine: false
    })

    const onChange = (e) => {
        e.persist()
        
        setSoda(prevSoda => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'hasCaffeine' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'hasCaffeine' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedSoda = {
                [updatedName] : updatedValue
            }
            
            console.log('the soda', updatedSoda)

            return {
                ...prevSoda, ...updatedSoda
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createSoda(user, soda)
            // first we'll nav to the show page
            .then(res => { navigate(`/sodas/${res.data.soda.id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'created soda',
                    variant: 'success'
                })
            })
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
        <SodaForm 
            soda={soda}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new soda!"
        />
    )
}

export default CreateSoda