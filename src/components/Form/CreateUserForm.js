import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Layout, Input, Modal } from 'antd';
import { withFormik } from 'formik';
import { SignUpUserAction } from '../../Redux/ReduxActionList/ActionList';
import { useDispatch } from 'react-redux';
import { SET_SUBMIT_EDIT_FORM } from '../../Redux/ReduxTypeList/typeList';

export function CreateUserForm(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type: SET_SUBMIT_EDIT_FORM,
            submitHandler: handleSubmit
        })
    },[])
    
   // console.log("props", props);
    return (
        <>
            <form onSubmit={handleSubmit} className='container'>
                <div className='d-flex flex-column justify-content-center align-items-center pb-5'>
                    <div className="text-center" style={{ width: "400px" }}>
                        <Input onChange={handleChange} className='mt-3' name='email' size="large" placeholder="Email" prefix={<MailOutlined />} />
                        <div className='text-danger'>{errors.email}</div>
                        <Input.Password onChange={handleChange} className="mt-3" name='password' size="large" placeholder="Password" prefix={<LockOutlined />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        <div className='text-danger'>{errors.password}</div>
                        <Input onChange={handleChange} className='mt-3' name='name' size='large' placeholder='Username' prefix={<UserOutlined />}></Input>
                        <div className='text-danger'>{errors.name}</div>
                        <Input onChange={handleChange} className="mt-3" name='phone' size='large' placeholder='Phone Number' prefix={<PhoneOutlined />}></Input>
                        <div className='text-danger'>{errors.phone}</div>

                    </div>
                </div>
            </form>
        </>
    )
}

const SignUpFormik = withFormik({
    // this will get email and password name from input to be props value (values above)
    // values.email = ....   values.password= .....
    // mapPropsToValues: () => ({
    //     email: '',
    //     password: '',
    //     phone: "",
    // }),
    validationSchema: Yup.object().shape({
        email: Yup
            .string()
            .email("Invalid Email")
            .required("Please Enter Email"),
        password: Yup
            .string()
            .required("Please Enter Password")
            // validate password with regex with yup
            // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
            .min(8, "Must be 8 characters")
            .max(32, "To long"),
        name: Yup.string().required("Please Enter username").min(3,'Longer').max(15,'Shorter'),
        phone: Yup.string().required("Please Enter Phone Number").min(10,"Must be 10 numbers").max(10, "Must be 1 numbers"),
    }),

    handleSubmit: (value, { props, setSubmitting }) => {
        // handleSubmit act as a props
        //props nay thuoc ve connect => co dispact va vi da duoc connect wrap HandleFormWithFormik
        // console.log(props);
        // console.log("history", props.history);
        // let action = LoginUserAction(value,props.history); // truyen history theo cach manually nhat
        console.log("value", value);
        let action = SignUpUserAction(value,"DO_NOT_REDIRECT");
        props.dispatch(action);
    },
    displayName: 'SignUpForm',
})(CreateUserForm);
export default connect()(SignUpFormik); 
