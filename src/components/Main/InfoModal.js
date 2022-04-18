import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import htmlParser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { GET_ALL_TASK_STATUS, GET_PRIORITY_LIST, REMOVE_ASSIGNESS, UPDATE_ASSIGNESS, UPDATE_DESCRIPTION, UPDATE_ESTIMATE_TIME, UPDATE_PRIORITY, UPDATE_STATUS, UPDATE_TASK_TO_API } from '../../Redux/ReduxTypeList/typeList';

import { Editor } from '@tinymce/tinymce-react';
import { AutoComplete } from 'antd';
import Comments from './Comments';
export default function InfoModal(props) {
    //console.log("Modal openning...");
    const [descriptionEditorVisible, setDescriptionEditorVisible] = useState(false);
    const [showMemberOption, setShowMemberOption] = useState(false);

    const editorRef = useRef(null);
    const editorText = () => {
        if (editorRef.current) {
            //console.log(editorRef.current.getContent());
            // Set value for particular field (such as name, description, projectCategori) for the text editor
            // setFieldValue("descriptionForUpdateTask", editorRef.current.getContent());
        }
    };
    const taskModalDetail = useSelector(state => state.TaskStateReducer.taskDetailModal);
    const taskStatusList = useSelector(state => state.TaskStatusStateReducer.arrStatus);
    const taskPriority = useSelector(state => state.PriorityStateReducer.arrPriority);
    const { members } = useSelector(state => state.ProjectStateReducer.projectInfo);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_TASK_STATUS
        });
        dispatch({
            type: GET_PRIORITY_LIST
        });
    }, [])

    const renderDescription = () => {
        if (descriptionEditorVisible) {
            return <div className='descriptionEditor'>
                <Editor
                    name='descriptionForUpdateTask'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={taskModalDetail.description}
                    init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={editorText}
                />
                <div className='button-group mt-3 text-right' >
                    <button className='btn btn-primary' onClick={() => {
                        dispatch({
                            type: UPDATE_TASK_TO_API,
                            actionType: UPDATE_DESCRIPTION,
                            data: editorRef.current.getContent()
                        })
                        setDescriptionEditorVisible(false)
                    }}>Save</button>
                    <button className='btn btn-danger ml-2' onClick={() => {
                        setDescriptionEditorVisible(false)
                    }}>Cancel</button>
                </div>
            </div>
        } else {
            return <div className='descriptionReadOnly'>
                {htmlParser(taskModalDetail.description)}
                <div className='button-group mt-3 text-left'>
                    <button className='btn btn-primary' onClick={() => {
                        setDescriptionEditorVisible(true)
                    }}>Edit</button>
                </div>
            </div>
        }
    }

    const addMoreAssignessHandler = () => {
        if (!showMemberOption){
            setShowMemberOption(true);
        }else{
            setShowMemberOption(false);
        }
        //console.log("projectMember", members);
    
    }
    const removeAssignessHandler = (assignessId)=>{
        dispatch({
            type:UPDATE_TASK_TO_API,
            actionType: REMOVE_ASSIGNESS,
            data: assignessId
        })
       
    }
    const renderMemberOption = () => {
        if (showMemberOption) {
            return <div className='search__member__option' >
                <select name='lisUser' className='form-control' onChange={(e)=>{
                    //console.log(e.target.value);
                    if (e.target.value == "0"){
                        return ;
                    }
                    let newAssigness = members.find(member => member.userId == e.target.value);
                    console.log("newAssigness",newAssigness);
                    dispatch({
                        type: UPDATE_TASK_TO_API,
                        actionType: UPDATE_ASSIGNESS,
                        data: {
                            id: newAssigness.userId,
                            avatar: newAssigness.avatar,
                            name: newAssigness.name,
                            alias: ""
                        }
                    })
                    setShowMemberOption(false);
                }}>
                     <option value="0" >---Select Member---</option>
                    {members?.filter(mem => {
                        let index = taskModalDetail.assigness?.findIndex(us => us.id === mem.userId);
                        if (index !== -1){
                            return false;
                        }
                        return true;
                    }).map((member, index) => {
                        return <option key={index} value={member.userId}>
                            {member.name} 
                            </option>
                    })}
                    {/* {members?.map((member, index) => {
                        return <option key={index} value={member.userId}>
                            {member.name} 
                            </option>
                    })}  */}
                </select>
            </div>
        }

    }


    const renderAssigness = () => {
        return taskModalDetail.assigness?.map((item, index) => {
            return <div style={{ display: 'flex', alignItems: 'center', margin: "5px 0 5px 0" }} className="item" key={index}>
                <div className="avatar">
                    <img src={item.avatar} alt="..." />
                </div>
                <p className="name">
                    {item.name}
                </p>
                <i className="fa fa-times" style={{ marginLeft: "auto", marginRight: 10, color: "red", cursor: 'pointer' }} onClick={()=>{
                    console.log("onClick",item.id)
                    removeAssignessHandler(item.id);
                }} />
            </div>
        })
    }
    const renderProgressbar = () => {
        const max = Number(taskModalDetail.timeTrackingRemaining) + Number(taskModalDetail.timeTrackingSpent);
        const percent = Math.round(Number(taskModalDetail.timeTrackingSpent) / max * 100);
        return <div style={{ display: 'flex' }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>
                <div className="progress">
                    <div className="progress-bar" role="progressbar"
                        style={{ width: `${percent}%` }} aria-valuenow={Number(taskModalDetail.timeTrackingSpent)} aria-valuemin={Number(taskModalDetail.timeTrackingRemaining)}
                        aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{taskModalDetail.timeTrackingSpent}h logged</p>
                    <p className="estimate-time">{taskModalDetail.timeTrackingRemaining}h estimated</p>
                </div>
            </div>
        </div>
    }
    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <span>{taskModalDetail.taskId}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">{taskModalDetail.taskName}</p>
                                    {/* ============== TASK DESCRIPTION ========= */}
                                    <div className="description">
                                        <label htmlFor="descriptionForUpdateTask" >Description</label>
                                        {renderDescription()}
                                    </div>
                                    {/* =============== TASK COMMENT ============= */}
                                    <Comments ></Comments>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select" value={taskModalDetail.statusId} onChange={(e) => {
                                            console.log(e.target.value);
                                            dispatch({
                                                type: UPDATE_TASK_TO_API,
                                                actionType: UPDATE_STATUS,
                                                data: e.target.value
                                            })

                                            // dispatch(({
                                            //     type: UPDATE_STATUS_TO_API,
                                            //     newStatus: {
                                            //         statusId: e.target.value,
                                            //         taskId: taskModalDetail.taskId,
                                            //         projectId: taskModalDetail.projectId
                                            //     }
                                            // }))
                                        }}>
                                            {taskStatusList?.map((status, index) => {
                                                return <option key={index} value={status.statusId}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    {/* =============== TASK ASSIGNESS ============ */}
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div>
                                            {renderAssigness()}
                                            <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => {
                                                addMoreAssignessHandler();
                                            }}>
                                                <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                            </div>
                                            {renderMemberOption()}
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select className='form-control' value={taskModalDetail.priorityTask.priorityId} onChange={(e) => {
                                            console.log(e.target.value);
                                            let newPriority = taskPriority.find(priority => priority.priorityId == e.target.value);
                                            dispatch({
                                                type: UPDATE_TASK_TO_API,
                                                actionType: UPDATE_PRIORITY,
                                                data: newPriority
                                            });

                                        }}>
                                            {taskPriority?.map((item, index) => {
                                                return <option value={item.priorityId} key={index}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="number" className="estimate-hours" defaultValue={taskModalDetail.originalEstimate} onChange={(e) => {
                                            console.log(e.target.value);
                                            dispatch({
                                                type: UPDATE_TASK_TO_API,
                                                actionType: UPDATE_ESTIMATE_TIME,
                                                data: e.target.value
                                            })
                                        }} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderProgressbar()}
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
