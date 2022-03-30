import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { GET_ALL_CATEGORY_API, SUBMIT_NEW_PROJECT } from '../../Redux/ReduxTypeList/typeList';
import Loading from '../../utilities/Loading';

function NewProject(props) {
    const editorRef = useRef(null);

    const categories = useSelector(state => state.JiraProjectStateReducer.arrProjectCategories);

    // Xu dung useEffect de gui request toi API lay gia tri de luu vao store chi khi NewPropject component duoc render lan dau
    // lam nhu se giam bot viec goi len API lien tuc
    // do da luu tren state thi khong so viec bi mat gia tri tru khi state thay doi
    const dispatch = useDispatch();
    useEffect(() => {
        // action se goi API nen se duoc luu ben trong saga action
        let action = {
            type: GET_ALL_CATEGORY_API,
        }
        dispatch(action);
    }, []);


    const editorText = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            // Set value for particular field (such as name, description, projectCategori) for the text editor
            setFieldValue("description", editorRef.current.getContent());
        }
    };

    // ---- Use Formik to get data
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = props;

    const renderProjectCategory = () => {
        return categories.map((cate, index) => {
            return <option value={cate.id} key={index}>{cate.projectCategoryName}</option>
        })
    };
    return (
       
        <div className='container mt-5'>
            <Loading></Loading>
            <h2>Create Project</h2>
            <form className='container' onSubmit={handleSubmit} onChange={handleChange} >
                <div>
                    <label>Project Name</label>
                    <input onChange={handleChange} type="text" className="form-control" name='projectName' id="projectName" placeholder='Enter Project Name' />
                </div>
                <div className='mt-4'>
                    <label htmlFor="description">Description</label>
                    <Editor
                        name='description'
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
                        onEditorChange={editorText}
                    />
                </div>
                <div className='mt-4'>
                    <label >Project Category</label>
                    <select className="form-control" name="categoryId" onChange={handleChange} id="project__categories">
                        {renderProjectCategory()}
                    </select>
                </div>
                {/* <Button className='mt-4' type='primary' htmlType='submit'>Create Project</Button> */}
                <button className='btn btn-primary' type='submit'>Create Project</button>
            </form>
        </div>
    )
}
// FORMIK su ly du lieu nguoi dung tao project
/**
 * Gia tri can truyen len API la:
 * projectName,description,categoryId,alias
 */
export const CreateProjectWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        console.log("props", props)
        return {
            // name nay can phai trung voi cac tag
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategories[0]?.id.toString(),
        }
    },
    validationSchema: Yup.object().shape({
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        //console.log(values);
        // Submit and send data
        let action = {
            type:SUBMIT_NEW_PROJECT,
            newProject: values
        }
        //dispatch to action saga (type in saga list)
        props.dispatch(action);
    },
    displayName: "JiraCloneTextEditor",
})(NewProject);

const mapStateToProps = (state) => {
    return {
        arrProjectCategories: state.JiraProjectStateReducer.arrProjectCategories
    }
    //console.log("mapState", arrProjectCategories);
}

export default connect(mapStateToProps)(CreateProjectWithFormik);