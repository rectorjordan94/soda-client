import SodasIndex from './sodas/SodasIndex'
import Container from 'react-bootstrap/Container'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container className="m-2" style={{textAlign: 'center'}}>
			<h2>See All The Sodas</h2>
			<SodasIndex msgAlert={ props.msgAlert } />
		</ Container>
	)
}

export default Home