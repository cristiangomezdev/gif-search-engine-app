import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch,useSelector } from 'react-redux';
import { logoutAction } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import logo from '../../img/book.svg';

export const Sidebar = () => {
    const dispatch = useDispatch()
    const {name} = useSelector(state =>state.auth)
    const handleLogout = () =>{
        dispatch(logoutAction())
    }
    const handleAddNew = () =>{
        dispatch(startNewNote());
    }
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span>You are: {name}</span> 
                </h3>
                <img className="journal__logo_entries" src={logo} alt="asdsad" />
                <button className="btn" onClick={handleLogout}>Logout</button>
                <div className='journal__new-entry' onClick={handleAddNew}>
                    <i className="far fa-calendar-plus fa-5x"></i>
                    <p className="mt-5"> Add new entry</p>
                </div>
            </div>
            <JournalEntries/>
        </aside>
    )
}
