import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { withFormik } from 'formik';
import { GET_ALL_CATEGORY_API } from '../../Redux/ReduxTypeList/typeList';

export default function NewProject() {
    const editorRef = useRef(null);
    let categories = useSelector(state => state.JiraProjectStateReducer.arrProjectCategories);

    // Xu dung useEffect de gui request toi API lay gia tri de luu vao store chi khi NewPropject component duoc render lan dau
    // lam nhu se giam bot viec goi len API lien tuc
    // do da luu tren state thi khong so viec bi mat gia tri tru khi state thay doi
    const dispatch = useDispatch();
    useEffect(() => {
        // action se goi API nen se duoc luu ben trong saga action
        let action= {
            type: GET_ALL_CATEGORY_API,
        }
        dispatch(action)
    }, [])
    
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const renderProjectCategory = () =>{
        return categories.map((cate,index)=>{
            return  <option value={cate.id} key={index}>{cate.projectCategoryName}</option>
        })
    }
    return (
        <div className='container mt-5'>
            <h2>Create Project</h2>
            <div className='container'>
                <div className='form-group'>
                    <div>
                        <label htmlFor="projectName">Project Name</label>
                        <input type="text" className="form-control" name='projectname' id="projectName" aria-describedby="emailHelpId" placeholder />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="projectDescription">Description</label>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue=""
                            init={{
                                height: 500,
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
                        />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor>Project Category</label>
                        <select className="form-control" name id>
                            {renderProjectCategory()}
                        </select>
                    </div>



                    <Button className='mt-4' type='primary' onClick={log}>Create Project</Button>
                </div>


            </div>
        </div>
    )
}
// FORMIK su ly du lieu nguoi dung tao project

// const createProjectWithFormik = withFormik();
