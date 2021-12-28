import React, { useContext,useEffect } from 'react'
import noteContext from "../context/Note/NoteContext"
import Noteitem from './NoteItem';
import AddNote from './AddNote'


const Notes = () => {
	const context = useContext(noteContext);
	const { notes,getNotes } = context;

	useEffect(() => {
		getNotes()
		
	}, [])
	const updateNote = (note) => {
		
	}
	return (
		<div className="container">
			<AddNote />

			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>


			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form >
								<div className="mb-3">
									<label htmlFor="exampleInputEmail1" className="form-label">Title</label>
									<input type="NotesTitle" className="form-control" id="NotesTitle" name="title" />
								</div>
								<div className="mb-3">
									<label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
									<input type="NotesTag" className="form-control" id="NotesTag" name="tag"/>
								</div>
								<div className="mb-3">
									<label htmlFor="exampleInputPassword1" className="form-label">Descrition</label>
									<textarea type="NotesDescrition" className="form-control" id="NotesDescrition" name="description"/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>


			<div className="row my-3">
				{notes.map((note) => {
					return <Noteitem key={note._id} updateNote={updateNote} note={note} />
				})}
			</div>
		</div>

	)
}

export default Notes

