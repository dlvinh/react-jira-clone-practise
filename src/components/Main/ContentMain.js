import Avatar from 'antd/lib/avatar/avatar';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import InfoModal from '../../components/Main/InfoModal'
import { GET_TASK_DETAIL_BY_ID } from '../../Redux/ReduxTypeList/typeList';
import { getTaskDetailById } from '../../Redux/Saga/SagaActionList/ActionTaskSagaList';

export default function ContentMain(props) {
   
    const projectDetail = useSelector(state => state.ProjectStateReducer.projectInfo);
    const dispacth = useDispatch();
    // ==== renderBackLog =====
    const renderCardTaskList = () => {
        return projectDetail.lstTask?.map((taskList, index) => {
            return <div key={index} className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    {taskList.statusName}
                </div>
                <ul className="list-group list-group-flush">
                    {taskList.lstTaskDeTail?.map((item, index) => {
                        return <li key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }} onClick={()=>{
                            dispacth({
                                type: GET_TASK_DETAIL_BY_ID,
                                id: item.taskId
                            })

                        }}>
                            <p className='font-weight-bold'>
                                {item.taskName}
                            </p>
                            <div className="block" style={{ display: 'flex' }}>
                                <div className="block-left">
                                    {item.priorityTask.priority}
                                </div>
                                <div className="block-right">
                                    <div className="avatar-group" style={{ display: 'flex' }}>
                                        {
                                            item.assigness.slice(0, 3).map((member, index) => {
                                                return <div className="avatar" key={index}>
                                                    <img src={member.avatar} alt="..." />
                                                </div>
                                            })
                                          
                                        }
                                        {item.assigness.length > 3 ? <Avatar>...</Avatar> : ''}
                                </div>
                            </div>
                        </div>
                       
                        </li>
                    })}
            </ul>
            </div >
        })
    }
return (
    <div className="content" style={{ display: 'flex' }}>
        {renderCardTaskList()}
        {/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    SELECTED FOR DEVELOPMENT 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    IN PROGRESS 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    DONE 3
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
    </div>*/}
   
    </div>

)
}
