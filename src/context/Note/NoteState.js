import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const [notes, setNotes] = useState([])

  // fetching all notes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYTg1YmZkNDQ3YjBjZjE3N2QwYjJhIn0sImlhdCI6MTY0MDY2MjQ2M30.DEm6BNxFNj0Ada5wtUscwzpkwuaL9SRUefl7k9MIyWY"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)

  }


  // Adding Notes

  const addNote = async ({ title, tag, description }) => {

    let response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYTg1YmZkNDQ3YjBjZjE3N2QwYjJhIn0sImlhdCI6MTY0MDY2MjQ2M30.DEm6BNxFNj0Ada5wtUscwzpkwuaL9SRUefl7k9MIyWY"
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
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYTg1YmZkNDQ3YjBjZjE3N2QwYjJhIn0sImlhdCI6MTY0MDY2MjQ2M30.DEm6BNxFNj0Ada5wtUscwzpkwuaL9SRUefl7k9MIyWY"
      }
    });


    setNotes(notes.filter((node) => { return node._id !== id }));

  }


  // Edit Notes

  const edditNote = async (id, title, tag, description) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYTg1YmZkNDQ3YjBjZjE3N2QwYjJhIn0sImlhdCI6MTY0MDY2MjQ2M30.DEm6BNxFNj0Ada5wtUscwzpkwuaL9SRUefl7k9MIyWY"
      },
      body: JSON.stringify({ title, description, tag })
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
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, edditNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
