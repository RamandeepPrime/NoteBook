import React, {useContext} from 'react'
import noteContext from '../context/Note/NoteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote,setCurrentNote}=context;
    const { note } = props;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h6 className="card-title" style={{width:"8.9rem"}}>{note.title}</h6>
                        <div style={{marginBlockEnd: "auto",position:"relative" }}>
                            <i className="far fa-trash-alt mx-1" onClick={()=>{deleteNote(note._id);props.showAlert("Note Succefully Deleted","success");}}></i>
                            {/* this below statement call modal from update note don't know how :) but it works*/}
                            <i className="far fa-edit mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setCurrentNote({_id:note._id,title:note.title,tag:note.tag,description:note.description})}></i>
                        </div>
                    </div>
                    <div className="d-flex">
                        <p style={{ fontSize: "x-small" }}>{note.tag}</p>
                        <i className="fas fa-tag" style={{
                            fontSize: "0.7rem",
                            margin: " 5px 10px"
                        }}></i>

                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem