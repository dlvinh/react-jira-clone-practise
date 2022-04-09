
import React, { useEffect } from 'react'
import { useSelector} from 'react-redux'
import ContentMain from '../../components/Main/ContentMain'
import Header from '../../components/Main/Header'
import InfoContent from '../../components/Main/InfoContent'
import InfoModal from '../../components/Main/InfoModal'
import SearchModal from '../../components/Main/SearchModal'
import {useHistory, useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GET_PROJECT_INFO_BY_ID } from '../../Redux/ReduxTypeList/typeList'
export default function ProjectMain(props) {
    //thong thuong ta se lay param = props.match.params nhung vi khiong dung duoc nen ta dung useParams
    let param = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        //GET VALUE FOR THE FIRST TIME PAGE LOAD
        dispatch({
            type: GET_PROJECT_INFO_BY_ID,
            projectId: param.projectId
        })
    },[])
    const projectInfo = useSelector(state => state.ProjectStateReducer.projectInfo);
    console.log(projectInfo);
    if (projectInfo === undefined){
        return <>
            <div className='main'>
                <h3>Can not find project</h3>
            </div>
        </>
    }
    return (
        <React.Fragment>
            <div className='main'>
                <Header projectDetail={projectInfo}></Header>
                <header><h4>{projectInfo.projectName}</h4></header>
                {/* we can render desctiption here but we should use Htmlparser to convert the format */}
                {/* Show all member assigned to the task (project) */}
                <InfoContent members={projectInfo.members}></InfoContent>
                <ContentMain projectDetail={projectInfo}></ContentMain>
            </div>
        </React.Fragment>
    )
}

