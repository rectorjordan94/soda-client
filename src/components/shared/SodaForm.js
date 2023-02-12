
import { Form, Button, Container } from 'react-bootstrap'

const SodaForm = (props) => {

    const { soda, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the soda's name?"
                        name="name"
                        id="name"
                        value={ soda.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Details:</Form.Label>
                    <Form.Control 
                        placeholder="Details?"
                        name="details"
                        id="details"
                        value={ soda.details }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Does this soda have caffeine?"
                        name="hasCaffeine"
                        defaultChecked={ soda.hasCaffeine }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default SodaForm