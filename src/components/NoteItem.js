import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <div style={{ marginLeft: "3.8rem", marginBlockEnd: "auto" }}>
                            <i className="far fa-trash-alt mx-1"></i>
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