import React from 'react'
import { useSelector} from 'react-redux'
import ContentMain from '../../components/Main/ContentMain'
import Header from '../../components/Main/Header'
import InfoContent from '../../components/Main/InfoContent'
import InfoModal from '../../components/Main/InfoModal'
import SearchModal from '../../components/Main/SearchModal'
import {useHistory} from 'react-router-dom'
export default function HomeJira(props) {
    const isLogin = useSelector(state=> state.UserStateReducer.isLogin);
    const history = useHistory();
    console.log("history",history);
    console.log(isLogin);
    console.log("props",props)
    if(!isLogin){
        alert("Please Login first")
        history.push('/login');
    }
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
