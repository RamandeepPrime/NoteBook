import React, {useContext} from 'react'
import noteContext from '../context/Note/NoteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote}=context;
    const { note } = props;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h6 className="card-title">{note.title}</h6>
                        <div style={{ marginLeft: "3.8rem", marginBlockEnd: "auto" }}>
                            <i className="far fa-trash-alt mx-1" onClick={()=>{deleteNote(note._id);}}></i>
                            <i className="far fa-edit mx-1"></i>

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