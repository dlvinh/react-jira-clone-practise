import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../utilities/Loading';
import { Select, Slider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { GET_ALL_MEMBERS, GET_ALL_PROJECTS, GET_PRIORITY_LIST, GET_TASK_TYPE } from '../../Redux/ReduxTypeList/typeList';


export default function CreateTaskFrom(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        // call to get all projects when first load form
        dispatch({
            type: GET_ALL_PROJECTS,
        });
        dispatch({
            type: GET_TASK_TYPE,
        });
        dispatch({
            type: GET_PRIORITY_LIST,
        });
        dispatch({
            type: GET_ALL_MEMBERS,
            keyWords: " "// in order to get alls list from backend
        });

    }, []);


    const projectList = useSelector(state => state.ProjectManagementStateReducer.projectList);
    const taskTypeList = useSelector(state => state.TaskTypeStateReducer.arrTaskType);
    const priorityList = useSelector(state => state.PriorityStateReducer.arrPriority);
    const userList = useSelector(state => state.UserStateReducer.memberList);
    const userOptions = userList?.map((user, index) => {
        return { value: user.userId, label: user.name }
    });
    const { Option } = Select;
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm
    } = props;

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })


    const handleChangeAnt = (value) => {
        console.log(`selected ${value}`);
    }

    const editorRef = useRef(null);
    const editorText = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            // Set value for particular field (such as name, description, projectCategori) for the text editor
            setFieldValue("description", editorRef.current.getContent());
        }
    };
    // RenderAllProject
    const renderAllProjects = () => {
        return projectList?.map((project, index) => {
            return <option key={index} value={project.id}>{project.projectName}</option>
        })
    }
    // =========== Render Task Type ==============
    const renderTaskType = () => {
        return taskTypeList?.map((task, index) => {
            return <option key={index} value={task.id}>{task.taskType}</option>
        })
    }
    const renderPriorities = () => {
        return priorityList?.map((priority, index) => {
            return <option key={index} value={priority.id}>{priority.priority}</option>
        })
    }


    //

    return (
        <div className='container'>
            <Loading></Loading>
            <div className='form-group'>
                <p>Project</p>
                <select name='projectId' className='form-control'>
                    {renderAllProjects()}
                </select>
            </div>
            <div className='form-control'>
                <p>Description</p>
                <Editor
                    name='taskDescription'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
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
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Priority</p>
                        <select name='priorityId' className='form-control'>
                            {renderPriorities()}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task Type</p>
                        <select name='typeId' className='form-control'>
                            {renderTaskType()}
                        </select>
                    </div>
                </div>
            </div>
            <div className='from-group'>
                <p>Time Tracking</p>
                <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                <div className='row'>
                    <div className='col-6'>
                        <p>Time Remaining (hours)</p>
                        <input type='number' onChange={(e) => {
                            setTimeTracking({
                                ...timeTracking,
                                timeTrackingRemaining: e.target.value
                            })
                        }} defaultValue={0} className='form-control' name='timeTrackingRemaining' />
                    </div>
                    <div className='col-6'>
                        <p>Time Spending (hours)</p>
                        <input type="number" onChange={(e) => {
                            setTimeTracking({
                                ...timeTracking,
                                timeTrackingSpent: e.target.value
                            })
                        }} defaultValue={0} min="0" max="10" className='form-control' name='timeTrackingSpent' ></input>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <p>Original Estimate</p>
                        <input type="number" className='form-control' name='originalEstimate' ></input>
                    </div>

                </div>
            </div>
            <div className='form-group'>
                <p>Assign to</p>
                <Select
                    mode="multiple"
                    placeholder="Add member"
                    // options={[{value:'a12',label:"b12"}]}
                    onChange={handleChangeAnt}
                    optionFilterProp="label"
                    options={userOptions}
                    style={{ width: '100%' }}
                >
                    {children}
                </Select>
            </div>

        </div>
    )
}

export const CreateTaskWithFormik = withFormik({
    enableReinitialize: true, // giup thay doi gia tri cua input ben trong formik khi props thay doi

})