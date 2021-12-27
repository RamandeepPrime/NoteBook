import React from 'react'
import CompForm from './CompForm'
import Notes from './Notes'

const Home = () => {
	return (
		<div className='container'>
			<h2 className='my-3 text-center'>Add Your Notes</h2>
			<CompForm/>
			<Notes/>
		</div>
	)
}

export default Home
