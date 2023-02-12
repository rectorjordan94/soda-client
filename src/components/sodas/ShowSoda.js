import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneSoda, removeSoda, updateSoda } from '../../api/sodas'

import EditSodaModal from './EditSodaModal'
import ShowNutrition from '../nutritions/ShowNutrition'
import NewNutritionModal from '../nutritions/NewNutritionModal'


const nutritionCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowSoda = (props) => {
    const [soda, setSoda] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [nutritionModalShow, setNutritionModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props

    useEffect(() => {
        getOneSoda(id)
            .then(res => setSoda(res.data.soda))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting sodas',
                    message: 'failed',
                    variant: 'danger'
                })
            })
    }, [updated])

    const setSodaFree = () => {
        removeSoda(user, soda.id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'hooray',
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'nope',
                    variant: 'danger'
                })
            })
    }

    let nutritionCards
    if (soda) {
        if (soda.nutritionFacts.length > 0) {
            nutritionCards = soda.nutritionFacts.map(nutrition => (
                <ShowNutrition
                    key={nutrition.id} 
                    nutrition={nutrition}
                    user={user}
                    soda={soda}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if(!soda) {
        return <p>Loading....</p>
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ soda.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Details: { soda.details }</small></div>
                            <div>
                                <small>
                                    Has Caffeine: { soda.hasCaffeine ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            className="m-2" variant="info"
                            onClick={() => setNutritionModalShow(true)}
                        >
                            Give {soda.name} a nutrition!
                        </Button>
                        {
                            soda.owner && user && soda.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {soda.name}
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setSodaFree()}
                                >
                                    Set {soda.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className="m-2" style={nutritionCardContainerLayout}>
                {nutritionCards}
            </Container>
            <EditSodaModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateSoda={updateSoda}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                soda={soda}
            />
            <NewNutritionModal 
                soda={soda}
                show={nutritionModalShow}
                handleClose={() => setNutritionModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowSoda