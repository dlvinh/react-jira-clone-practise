import React from 'react';
import { NavLink } from 'react-router-dom'
export default function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="#">Jira Clone</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/home">Home<span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home">Jira</NavLink>
                    </li>
                </ul>
                <NavLink className='nav-link' to="/login"><i class="fas fa-user-circle" style={{color:"white", fontSize:"40px"}}></i></NavLink>
                
            </div>
        </nav>

    )
}
