import { Form, Button, Container } from 'react-bootstrap'

const NutritionForm = (props) => {
    const { nutrition, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the name?"
                        name="name"
                        id="name"
                        value={ nutrition.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control 
                        placeholder="How much?"
                        name="amount"
                        id="amount"
                        type="number"
                        value={ nutrition.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Unit:</Form.Label>
                    <Form.Control 
                        placeholder="Grams or ounces?"
                        name="unit"
                        id="unit"
                        value={ nutrition.unit }
                        onChange={handleChange}
                    />
                </Form.Group>
                
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default NutritionForm