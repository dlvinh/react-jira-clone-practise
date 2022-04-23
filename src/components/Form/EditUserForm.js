import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { UserOutlined, PhoneOutlined, MailOutlined,LockOutlined,EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { withFormik } from 'formik';

import { useDispatch } from 'react-redux';
import { SET_SUBMIT_EDIT_USER, SUBMIT_EDIT_USER } from '../../Redux/ReduxTypeList/typeList';

export function EditUserForm(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
    } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_EDIT_USER,
            submitHandler: handleSubmit
        })
    }, [])
    //console.log(values)
    return (
        <>
            <form className='container' onSubmit={handleSubmit}>
                <div className='d-flex flex-column justify-content-center align-items-center pb-5'>
                    <h2>Edit User</h2>
                    <div className="text-center" style={{ width: "400px" }}>
                        <Input value={values.email} disabled onChange={handleChange} className='mt-3' name='email' size="large" placeholder="Email" prefix={<MailOutlined />} />
                        <div className='text-danger'>{errors.email}</div>
                        <Input.Password value={values.passWord} onChange={handleChange} className="mt-3" name='passWord' size="large" placeholder="Password" prefix={<LockOutlined />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        <div className='text-danger'>{errors.passWord}</div>
                        <Input value={values.name} onChange={handleChange} className='mt-3' name='name' size='large' placeholder='Username' prefix={<UserOutlined />}></Input>
                        <div className='text-danger'>{errors.name}</div>
                        <Input value={values.phoneNumber} onChange={handleChange} className="mt-3" name='phoneNumber' size='large' placeholder='Phone Number' prefix={<PhoneOutlined />}></Input>
                        <div className='text-danger'>{errors.phoneNumber}</div>
                    </div>
                </div>
            </form>
        </>
    )
}
const EditUserFromFormik = withFormik({
    // "id": "string",
    // "passWord": "string",
    // "email": "string",
    // "name": "string",
    // "phoneNumber": "string"
    enableReinitialize: true,
    // this will get email and password name from input to be props value (values above)
    // values.email = ....   values.password= .....
    mapPropsToValues: (props) => {
        return {
            id: props.editUser.userId,
            passWord: props.editUser.passWord,
            email: props.editUser.email,
            name: props.editUser.name,
            phoneNumber: props.editUser.phoneNumber,

        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please Enter username").min(3, 'Longer').max(15, 'Shorter'),
        phoneNumber: Yup.string().required("Please Enter Phone Number").min(10, "Must be 10 numbers").max(10, "Must be 1 numbers"),
        passWord: Yup
        .string()
        .required("Please Enter Password")
        // validate password with regex with yup
        // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
        .min(8, "Must be 8 characters")
        .max(32, "To long"),
    }),

    handleSubmit: (value, { props, setSubmitting }) => {
        // handleSubmit act as a props
        //props nay thuoc ve connect => co dispact va vi da duoc connect wrap HandleFormWithFormik
        // console.log(props);
        // console.log("history", props.history);
        // let action = LoginUserAction(value,props.history); // truyen history theo cach manually nhat
        //console.log("value", value);
        props.dispatch({
            type: SUBMIT_EDIT_USER,
            user: value
        })
        // let action = SignUpUserAction(value,"DO_NOT_REDIRECT");
        // props.dispatch(action);
    },
    displayName: 'EditUserFromFormik',
})(EditUserForm);
const mapStateToProps = (state) => {
    //console.log("edituser",state.UserStateReducer.editUser )
    return { editUser: state.UserStateReducer.editUser }
};
export default connect(mapStateToProps)(EditUserFromFormik); 
