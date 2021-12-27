import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

	const notesInitial = [
        {
          "_id": "61322f195153781a8ca8d0e06",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personalfgafgasrdfgads",
          "date": "2021-09-03T14:20:09.509Z",
          "__v": 0
        },
        {
          "_id": "61322f195531781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "61322f19553781a8ca8d0e081",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "61322f19553781a8ca8d0e082",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "61322f195537812a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "613222f19553781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
        {
          "_id": "61322f119553781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
      ]

      const [notes, setNotes] = useState(notesInitial)


      // Adding Notes

      const addNote=(note)=>{
        console.log(note);
        // TODO Api call
        // const note={
        //   "_id": "61322f119553781a8rca8d0e08",
        //   "user": "6131dc5e3e4037cd4734a066",
        //   "title": "My Title added",
        //   "description": "Please wake up early",
        //   "tag": "personal",
        //   "date": "2021-09-03T14:20:09.668Z",
        //   "__v": 0
        // }
        setNotes(notes.concat(note));
      }


      // Delete Notes

      const deleteNote=(id)=>{

        setNotes(notes.filter((node)=>{return node._id!==id}));
        
      }


      // Edit Notes

      const edditNote=()=>{
        
      }



	return (
		<NoteContext.Provider value={{notes, setNotes,addNote,deleteNote,edditNote}}>
            {props.children}
        </NoteContext.Provider>
	)
}

export default NoteState;
