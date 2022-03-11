import { db, collection } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { doc, updateDoc, addDoc, deleteDoc } from "@firebase/firestore"
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
    dispatch(activeNote(doc.id, newNote))
    dispatch(addNewNote(doc.id,newNote))

  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
})
export const addNewNote = (id,note) => ({
  type:types.notesAddNew,
  payload:{
    id, ...note 
  }
})
export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
}
export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!note.url) {
      delete note.url
    }

    const noteToFirestore = { ...note }
    delete noteToFirestore.id
    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
    await updateDoc(noteRef, noteToFirestore);
    Swal.fire('Saved', note.title, 'success');

    dispatch(refreshNote(note.id, note))
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: { id, note: { id, ...note } }
})

export const StartUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    const fileUrl = await fileUpload(file);
    Swal.fire({ title: 'Uploading', text: 'Please wait...', showCancelButton: false, showConfirmButton: false, willOpen: () => { Swal.showLoading() } });
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote))
    Swal.close();
  }
}

export const startDeleting = (id) =>{
  return async(dispatch,getState)=>{

    const uid = getState().auth.uid;
    const noteRef = doc(db, `${uid}/journal/notes/${id}`)
    await deleteDoc(noteRef);

    dispatch(deleteNote(id));
  }
}
export const deleteNote = (id) =>({
  type:types.notesDelete,
  payload:id
})

export const noteLogout = () =>({
  type:types.notesLogoutCleaning
})