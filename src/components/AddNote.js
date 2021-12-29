import React, { useContext, useState } from 'react'
import noteContext from '../context/Note/NoteContext'


const AddNote = () => {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({title:"",tag:"",description:""});

	const onChange=(e)=>{

		setNote({...note,[e.target.name]:e.target.value});
	}

	const onSubmit = (e) => {
		
		e.preventDefault();
		addNote(note);
		setNote({title:"",tag:"",description:""});
	}


	return (
		<div>
			<h2 className='my-3 text-center'>Add Your Notes</h2>
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Title</label>
					<input type="NotesTitle" className="form-control" id="NotesTitle" value={note.title} name="title" onChange={onChange} minLength={5} required/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
					<input type="NotesTag" className="form-control" placeholder={"personal"} id="NotesTag" value={note.tag} name="tag"onChange={onChange}/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Descrition</label>
					<textarea type="NotesDescrition" className="form-control" id="NotesDescrition" value={note.description} name="description" onChange={onChange} minLength={5} required/>
				</div>
				<button type="submit" className="btn btn-primary">Add Note</button>
			</form>
		</div>
	)
}

export default AddNote
