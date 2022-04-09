import React from 'react'

export default function InfoContent(props) {

    console.log("infoContent",props.members);
    const renderAvatarGroup = () => {
        return props.members?.map((member,index) => {
            return <>
                <div className="avatar" key={index}>
                    <img src={member.avatar} alt="..." />
                    {/* <h2>{member.name}</h2> */}
                </div>
            </>
        })
    }
    return (
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {/* RENDER avatar group contents */}
                {renderAvatarGroup()}
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
    )
}
