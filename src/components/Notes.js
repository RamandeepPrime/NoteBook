import React, { useContext,useEffect } from 'react'
import noteContext from "../context/Note/NoteContext"
import Noteitem from './NoteItem';
import AddNote from './AddNote'
import UpdateNote from './UpdateNote';


const Notes = () => {
	const context = useContext(noteContext);
	const { notes,getNotes } = context;

	useEffect(() => {
		getNotes()
		
	}, [])
	
	return (
		<div className="container">
			<AddNote />
			<UpdateNote />

			<div className="row my-3">
				{notes.map((note) => {
					return <Noteitem key={note._id} note={note} />
				})}
			</div>
		</div>

	)
}

export default Notes

