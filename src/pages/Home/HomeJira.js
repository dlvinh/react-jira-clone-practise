import React from 'react'
import ContentMain from '../../components/Main/ContentMain'
import Header from '../../components/Main/Header'
import InfoContent from '../../components/Main/InfoContent'
import InfoModal from '../../components/Main/InfoModal'
import SearchModal from '../../components/Main/SearchModal'

export default function HomeJira() {
    return (
        <React.Fragment>
            <div className='main'>
                <Header></Header>
                <h3>Cyber Board</h3>
                <InfoContent></InfoContent>
                <ContentMain></ContentMain>
            </div>
            <SearchModal></SearchModal>
            <InfoModal></InfoModal>
        </React.Fragment>
    )
}
