import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteNutrition } from '../../api/nutritions'
import EditNutritionModal from './EditNutritionModal'

const ShowNutrition = (props) => {
    const { nutrition, user, soda, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)

    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    const destroyNutrition = () => {
        deleteNutrition(user, soda.id, nutrition._id)
            .then(() => {
                msgAlert({
                    heading: 'Nutrition Deleted',
                    message: 'Bye Bye nutrition!',
                    variant: 'success'
                })
            })
            // then trigger a refresh of the parent component
            .then(() => triggerRefresh())
            // upon failure send an appropriate message
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(nutrition.condition)}>
                <Card.Header>{nutrition.name}</Card.Header>
                <Card.Body>
                    <small>{nutrition.description}</small><br/>
                    <small>
                        {nutrition.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {nutrition.condition}</small><br/>
                    {
                        user && soda.owner && user._id === soda.owner._id
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Nutrition
                            </Button>
                            <Button 
                                onClick={() => destroyNutrition()} 
                                variant="danger"
                                className="m-2"
                            >
                                Delete Nutrition
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditNutritionModal
                user={user}
                soda={soda}
                nutrition={nutrition}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowNutrition