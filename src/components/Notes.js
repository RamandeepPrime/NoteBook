import React, { useContext } from 'react'
import noteContext from "../context/Note/NoteContext"
import Noteitem from './NoteItem';
import AddNote from './AddNote'


const Notes = () => {
	const context = useContext(noteContext);
	const { notes} = context;
	return (
		<div className="container">
			<AddNote />
			<div className="row my-3">
				{notes.map((note) => {
					return <Noteitem key={note._id} note={note} />
				})}
			</div>
		</div>

	)
}

export default Notes

