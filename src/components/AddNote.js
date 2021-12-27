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
	}


	return (
		<div>
			<h2 className='my-3 text-center'>Add Your Notes</h2>
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Title</label>
					<input type="NotesTitle" className="form-control" id="NotesTitle" name="title" onChange={onChange}/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
					<input type="NotesTag" className="form-control" id="NotesTag" name="tag"onChange={onChange}/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Descrition</label>
					<textarea type="NotesDescrition" className="form-control" id="NotesDescrition" name="description" onChange={onChange}/>
				</div>
				<button type="submit" className="btn btn-primary">Add Note</button>
			</form>
		</div>
	)
}

export default AddNote
