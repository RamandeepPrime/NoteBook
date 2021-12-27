import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const [notes, setNotes] = useState([])

  // fetching all notes

  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNzU0YzFhODU5NGU3NzNjN2Q5YmFjIn0sImlhdCI6MTY0MDQ1MzMxM30.s0q8qwHb1SwifUqOSfDsEhHDrE7MFw4YHhqpPy3k_rs"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)

  }


  // Adding Notes

  const addNote = async(note) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNzU0YzFhODU5NGU3NzNjN2Q5YmFjIn0sImlhdCI6MTY0MDQ1MzMxM30.s0q8qwHb1SwifUqOSfDsEhHDrE7MFw4YHhqpPy3k_rs"
      },
      body:JSON.stringify(note.title, note.description, note.tag)
    });
        
    setNotes(notes.concat(note));
  }


  // Delete Notes

  const deleteNote = async(id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNzU0YzFhODU5NGU3NzNjN2Q5YmFjIn0sImlhdCI6MTY0MDQ1MzMxM30.s0q8qwHb1SwifUqOSfDsEhHDrE7MFw4YHhqpPy3k_rs"
      }
    });    


    setNotes(notes.filter((node) => { return node._id !== id }));

  }


  // Edit Notes

  const edditNote = async(id, title, tag, description) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNzU0YzFhODU5NGU3NzNjN2Q5YmFjIn0sImlhdCI6MTY0MDQ1MzMxM30.s0q8qwHb1SwifUqOSfDsEhHDrE7MFw4YHhqpPy3k_rs"
      },
      body: JSON.stringify({title, description, tag})
    });

    for (let index = 0; index < notes.length; index++) {
      if (notes[index]._id === id) {
        notes[index].title = title;
        notes[index].tag = tag;
        notes[index].description = description;
      }
    }

  }



  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, edditNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
