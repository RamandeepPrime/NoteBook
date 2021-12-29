import React, { useContext,useRef } from 'react'
import noteContext from "../context/Note/NoteContext"

const UpdateNote = () => {
	const context = useContext(noteContext);
	const refClose = useRef(null)
	const { editNote,currentNote,setCurrentNote } = context;
	const onChange=(e)=>{
		setCurrentNote({...currentNote,[e.target.name]:e.target.value});
		
	}

	const handleClick=()=>{
		editNote(currentNote._id,currentNote.title,currentNote.tag,currentNote.description)
		refClose.current.click();
	}
	
	return (
		<div>
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Edit Your Note</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form >
								<div className="mb-3">
									<label htmlFor="exampleInputEmail1" className="form-label">Title</label>
									<input type="NotesTitle" className="form-control" value={currentNote.title} id="NotesTitle" name="title" onChange={onChange}/>
								</div>
								<div className="mb-3">
									<label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
									<input type="NotesTag" className="form-control" value={currentNote.tag} id="NotesTag" name="tag" onChange={onChange}/>
								</div>
								<div className="mb-3">
									<label htmlFor="exampleInputPassword1" className="form-label">Descrition</label>
									<textarea type="NotesDescrition" className="form-control" value={currentNote.description} id="NotesDescrition" name="description" onChange={onChange}/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button disabled={currentNote.title.length<5 || currentNote.description.length<10} type="button" className="btn btn-primary"  onClick={handleClick}>Update Note</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default UpdateNote
