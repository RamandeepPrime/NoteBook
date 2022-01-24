import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState({_id:"",title:"",tag:"",description:""});

  // fetching all notes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authToken": localStorage.getItem("token")
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)

  }


  // Adding Notes

  const addNote = async ({ title, tag, description }) => {
    
    if(!tag)tag="personal"

    let response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authToken": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    if (response.status === 200) {
      response = await response.json()
      console.log(response);
      setNotes(notes.concat(response));
    }

  }


  // Delete Notes

  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "authToken": localStorage.getItem("token")
      }
    });


    setNotes(notes.filter((node) => { return node._id !== id }));

  }


  // Edit Notes

  const editNote = async (id, title, tag, description) => {
    

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "authToken": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    let newNote=JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id === id) {
        newNote[index].title = title;
        newNote[index].tag = tag;
        newNote[index].description = description;
        break;
      }
    }
    setNotes(newNote);

  }



  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, currentNote,setCurrentNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
