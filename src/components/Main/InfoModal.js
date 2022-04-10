import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import htmlParser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { GET_ALL_TASK_STATUS, GET_PRIORITY_LIST } from '../../Redux/ReduxTypeList/typeList';
import { StaticRouter } from 'react-router-dom';
import { Slider } from 'antd';
export default function InfoModal(props) {
    console.log("Modal openning...");

    const taskModalDetail = useSelector(state => state.TaskStateReducer.taskDetailModal);
    const taskStatusList = useSelector(state => state.TaskStatusStateReducer.arrStatus);
    const taskPriority = useSelector(state => state.PriorityStateReducer.arrPriority);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_TASK_STATUS
        });
        dispatch({
            type: GET_PRIORITY_LIST
        })
    }, [])


    const renderAssigness = () => {
        return taskModalDetail.assigness?.map((item, index) => {
            return <div style={{ display: 'flex' }} className="item" key={index}>
                <div className="avatar">
                    <img src={item.avatar} alt="..." />
                </div>
                <p className="name">
                    {item.name}
                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                </p>
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
                                    <div className="description">
                                        <p>Description</p>
                                        <p>
                                            {htmlParser(taskModalDetail.description)}
                                        </p>
                                    </div>


                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src="./assets/img/download (1).jfif" alt="..." />
                                            </div>
                                            <div className="input-comment">
                                                <input type="text" placeholder="Add a comment ..." />
                                                <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                        to comment</span>
                                                </p>
                                            </div>
                                        </div>
                                        {/* ====== COMMENTS */}
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                <div className="display-comment" style={{ display: 'flex' }}>
                                                    <div className="avatar">
                                                        <img src="./assets/img/download (1).jfif" alt="..." />
                                                    </div>
                                                    <div>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lord Gaben <span>a month ago</span>
                                                        </p>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lorem ipsum dolor sit amet, consectetur
                                                            adipisicing elit. Repellendus tempora ex
                                                            voluptatum saepe ab officiis alias totam ad
                                                            accusamus molestiae?
                                                        </p>
                                                        <div>
                                                            <span style={{ color: '#929398' }}>Edit</span>
                                                            •
                                                            <span style={{ color: '#929398' }}>Delete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select" value={taskModalDetail.statusId}>
                                            {taskStatusList?.map((status, index) => {
                                                return <option key={index} value={status.statusId}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div style={{ display: 'flex', flexWrap: "wrap" }}>
                                            {renderAssigness()}
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select className='form-control' defaultValue={taskModalDetail.priorityTask.priority}>
                                            {taskPriority?.map((item, index) => {
                                                return <option value={item.priorityId} key={index}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" className="estimate-hours" defaultValue={taskModalDetail.originalEstimate} />
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
