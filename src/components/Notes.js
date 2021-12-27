import React, { useContext } from 'react'
import noteContext from "../context/Note/NoteContext"
import Noteitem from './NoteItem';


const Notes = () => {
	const context = useContext(noteContext);
	const { notes, setNotes } = context;
	return (
		<div className="container">
			<div className="row my-3">
				{notes.map((note) => {
					return <Noteitem key={note._id} note={note} />
				})}
			</div>
		</div>
	)
}

export default Notes

