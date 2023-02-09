import { useState, useEffect } from 'react'

// useParams from react-router-dom allows us to see our route parameters
import { useParams } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

import { getOneSoda } from '../../api/sodas'

import messages from '../shared/AutoDismissAlert/messages'

// we need to get the soda's id from the route parameters
// then we need to make a request to the api
// when we retrieve a soda from the api, we'll render the data on screen

const ShowSoda = (props) => {
    const [soda, setSoda] = useState(null)
    
    const { id } = useParams()

    const { user, msgAlert } = props
    console.log('user in ShowSoda props:', user)
    console.log('msgAlert in ShowSoda props:', msgAlert)

    useEffect(() => {
        getOneSoda(id)
            .then(res => setSoda(res.data.soda))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting sodas',
                    message: 'some error message',
                    variant: 'danger'
                })
            })
    }, [])

    if(!soda) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container>
                <Card>
                    <Card.Header>{soda.name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Type: { soda.details }</small></div>
                            <div>
                                <small>
                                    Has Caffeine: {soda.hasCaffeine ? 'yes' : 'no'}
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowSoda