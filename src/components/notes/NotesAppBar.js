import React from 'react'
import { startSaveNote, StartUploading } from '../../actions/notes'
import {useDispatch,useSelector} from 'react-redux';
import moment from 'moment';

export const NotesAppBar = () => {

        
        const dispatch = useDispatch();
        const {active} = useSelector(state =>state.notes)
        const noteDate = moment(active.note)
        const handleSave= () =>{
            dispatch(startSaveNote(active))
        }
        const handlePictureClick = () =>{
            document.querySelector('#fileSelector').click();
        }
        const handleFileChange = (e)=>{
            const file = e.target.files[0]
            if(file){
                dispatch(StartUploading(file));
            }
        }
    return (
        <div className="notes__appbar">
            <span>Date: {noteDate.format('MMMM Do YYYY')}</span>
            <input id="fileSelector" name="file" type="file" style={{display:'none'}} onChange={handleFileChange} />
            <div>
                <button className="btn" onClick={handlePictureClick}> photo</button>
                <button className="btn" onClick={handleSave}> save</button>
            </div>
        </div>
    )
}
