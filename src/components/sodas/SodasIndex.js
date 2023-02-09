import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

// api function from our api file
import { getAllSodas } from '../../api/sodas'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object, they're a quick easy way to add focused css properties to our react componenets
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const SodasIndex = (props) => {
    const [sodas, setSodas] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    useEffect(() => {
        getAllSodas()
        .then(res => setSodas(res.data.sodas))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting sodas',
                    message: 'blah blah blah',
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    if(error) {
        return <p>Loading...</p>
    }

    if (!sodas) {
        return <p>Loading...</p>
    } else if (sodas.length === 0) {
        return <p>No sodas yet, go add some!</p>
    }

    const sodaCards = sodas.map(soda => (
        <Card key={soda.id} style={{ width: '30%', margin: 5 }}>
            <Card.Header>{soda.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                <Link to={`/sodas/${soda.id}`}>View { soda.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className='container-md' style={cardContainerStyle}>
            {sodaCards}
        </div>
    )
}

export default SodasIndex