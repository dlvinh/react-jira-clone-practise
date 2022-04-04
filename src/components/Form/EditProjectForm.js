import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';
import { SET_SUBMIT_EDIT_FORM, SUBMIT_EDITING_PROJECT} from '../../Redux/ReduxTypeList/typeList';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

export function EditProjectForm(props) {
    //console.log("Props lay tu Formik", props);
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
    const editorRef = useRef(null);
    const editorText = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            // Set value for particular field (such as name, description, projectCategori) for the text editor
            setFieldValue("description", editorRef.current.getContent());
        }
    };
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_EDIT_FORM,
            submitHandler: handleSubmit
        })
    }, [])

    //------ Render Project Categories
    const categories = useSelector(state => state.JiraProjectStateReducer.arrProjectCategories);
    const renderCategories = () => {
        return categories.map((category, index) => {
            // if (values.categoryId-1 === index){
            //     return <option key={index} value={category.id}>{category.projectCategoryName}</option>
            // }else{
            //     return <option key={index}>{category.projectCategoryName}</option>
            // }
            return <option key={index} value={category.id}>{category.projectCategoryName}</option>
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* ------ Project ID ------------ */}
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Project ID</label>
                    <br></br>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="id" defaultValue={values.id} onChange={handleChange}/>
                    </div>
                </div>
                {/* ------ Project Name ------------ */}
                <div className="form-group row">
                    <label htmlFor="projectName" className="col-sm-2 col-form-label">Project Name</label>
                    <br></br>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" id="projectName" value={values.projectName} onChange={handleChange}/>
                    </div>
                </div>
                {/* ------ Project Categories ------------ */}
                <div className="form-group ">
                    <label htmlFor="categoryId">Categories</label>
                    <br></br>
                    <select className="form-control" id="categoryId" value={values.categoryId} onChange={handleChange}>
                        {renderCategories()}
                    </select>
                </div>
                {/* ------ Project Description ------------ */}
                <div className="form-group">
                    <label htmlFor="descriptionForEditor" >Description</label>
                    <br></br>
                    <Editor
                        name='descriptionForEditor'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={values.descriptionForEditor}
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
            </form>
        </>
    )
}

// FORMIK su ly du lieu nguoi dung tao project
/**
 * Gia tri can truyen len API la:
 * projectName,description,categoryId,alias
 */
export const EditProjectWithFormik = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        console.log("Formik props", props)
        return {
            // name nay can phai trung voi cac tag
            id: props.projectEditProps.id,
            projectName: props.projectEditProps.projectName,
            descriptionForEditor: props.projectEditProps.description,
            categoryId: props.projectEditProps.categoryId
        }
    },
    validationSchema: Yup.object().shape({
    }),

    // THOSE HANDLE SUBMIT JUST FOR TEST
    // => ta se dung handle submit voi authorised API
    // handleSubmit: (values, { props, setSubmitting }) => {
    //     //console.log(values);
    //     // Submit and send data
    //     let action = {
    //         type:SUBMIT_NEW_PROJECT,
    //         newProject: values
    //     };
    //     //dispatch to action saga (type in saga list)
    //     props.dispatch(action);
    // },

    handleSubmit: (values, { props, setSubmitting }) => {
        // EDIT project
        console.log("value to submit", values);
        let action = {
            type: SUBMIT_EDITING_PROJECT, // saga action type
            newValue: values
        }
        // Dispact len SAGA action 
        props.dispatch(action);
    },
    displayName: "EditProjectEditor",
})(EditProjectForm); // truyen props cua formik to EditProjectForm component

const mapStateToProps = (state) => {
    return {
        projectEditProps: state.ProjectStateReducer.projectEdit
    }
    //console.log("mapState", arrProjectCategories);
}
export default connect(mapStateToProps)(EditProjectWithFormik) // truyen props cua mapStateToProps to EditPRojectWithFormik HOC