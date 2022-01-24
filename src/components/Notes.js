import React, { useContext,useEffect } from 'react'
import noteContext from "../context/Note/NoteContext"
import Noteitem from './NoteItem';
import AddNote from './AddNote'
import UpdateNote from './UpdateNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
	const context = useContext(noteContext);
	const { notes,getNotes } = context;
	let navigate=useNavigate();
	useEffect(() => {
		if(localStorage.getItem('token'))getNotes()

		else navigate("/login");
		
	}, [])

	return (
		<div className="container">
			<AddNote showAlert={props.showAlert}/>
			<UpdateNote showAlert={props.showAlert}/>
			<h3 className='my-3'>Your Notes</h3>
			{notes.length===0&&<h6 className='mx-2 my-2'>No notes to display</h6>}
			<div className="row my-4">
				{notes.map((note) => {
					return <Noteitem key={note._id} note={note} showAlert={props.showAlert}/>
				})}
			</div>
		</div>

	)
}

export default Notes

