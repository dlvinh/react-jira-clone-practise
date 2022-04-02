import React from 'react'
import { NavLink } from 'react-router-dom'

export default function JiraMenu() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src='./assets/img/download.jfif' alt="..." />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card" />
                    <NavLink to="/jiraclone" activeClassName='active'>Cyber Board</NavLink>
                    {/* <span>Cyber Board</span> */}
                </div>
                <div>
                    <i className="fa fa-cog" />
                    <NavLink to="/createproject" activeClassName='active'>Create Project</NavLink>
                    {/* <span>Create Project</span> */}
                </div>
                <div>
                    <i className="fa fa-cog" />
                    <NavLink to="/projectmanagement" activeClassName='active'>Project Management</NavLink>
                    {/* <span>Create Project</span> */}
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>
    )
}
