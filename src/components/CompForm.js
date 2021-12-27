import React from 'react'

const CompForm = () => {
	const onSubmit=()=>{

	}
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Title</label>
					<input type="NotesTitle" className="form-control" id="NotesTitle"/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
					<input type="NotesTag" className="form-control" id="NotesTag"/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Descrition</label>
					<textarea type="NotesDescrition" className="form-control" id="NotesDescrition"/>
				</div>
				<button type="submit" className="btn btn-primary">Add Note</button>
			</form>
		</div>
	)
}

export default CompForm
