import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

// api function from our api file
import { getAllSodas } from '../../api/sodas'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const SodasIndex = (props) => {
    const [sodas, setSodas] = useState(null)
    const [error, setError] = useState(false)

    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    useEffect(() => {
        getAllSodas()
            .then(res => setSodas(res.data.sodas))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting sodas',
                    message: 'Could not find any sodas',
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!sodas) {
        // if no sodas loaded yet, display 'loading'
        return <p>...loading ...please wait</p>
    } else if (sodas.length === 0) {
        return <p>No sodas yet, go add some!</p>
    }

    // once we have an array of sodas, loop over them
    // produce one card for every soda
    const sodaCards = sodas.map(soda => (
        <Card key={ soda._id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ soda.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/sodas/${soda._id}`} className="btn btn-info">View { soda.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the sodaCards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { sodaCards }
        </div>
    )
}

// export our component
export default SodasIndex