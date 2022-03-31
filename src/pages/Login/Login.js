import React from 'react';
import { Button, Layout, Input } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup'; // help to validate easier\
import { connect } from 'react-redux';
import { LOGIN_USER_API } from '../../Redux/ReduxTypeList/typeList';
import { LoginUserAction } from '../../Redux/ReduxActionList/ActionList';
import { useSelector } from 'react-redux';
/**
 * use antd design to setup layout
 * https://ant.design/components/layout/
 */

export  function Login(props) {

    // Delcare variables that Formik return back as a props.
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className='container'>
                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                    <h1 className='text-center'>Login</h1>
                    <div className="text-center" style={{width:"400px"}}>
                        <Input onChange={handleChange} className='mt-3' name='email' size="large" placeholder="Username" prefix={<UserOutlined />} />
                        <div className='text-danger'>{errors.email}</div>
                        <Input.Password onChange={handleChange}  className="mt-3" name='password' size="large" placeholder="Password" prefix={<LockOutlined />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        <div className='text-danger'>{errors.password}</div>
                    </div>
                    <Button  htmlType='submit' className='mt-3' width="" type='Primary' size='large' shape='round'>Login</Button>

                    <div className='social-button mt-5' >
                        <i className="fab fa-facebook" style={{ fontSize: "35px", color: "#385898" }}></i>

                        <i className="fab fa-google ml-3" style={{
                            fontSize: "35px",
                            color: "#dd4b39"
                        }}></i>

                        <i className="fab fa-twitter ml-3" style={{ fontSize: "35px", color: "#385898" }}></i>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}


const HandleFormWithFormil = withFormik({
    // this will get email and password name from input to be props value (values above)
    // values.email = ....   values.password= .....
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema:Yup.object().shape({
        email: Yup
        .string()
        .email("Invalid Email")
        .required("Please Enter Email"),
        
        password: Yup
        .string()
        .required("Please Enter Password")
        // validate password with regex with yup
        // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
        .min(8,"Must be 8 characters")
        .max(32,"To long")
    }),

    handleSubmit:(value,{props,setSubmitting})=>{
        // handleSubmit act as a props
        //props nay thuoc ve connect => co dispact va vi da duoc connect wrap HandleFormWithFormik
        // console.log(props);
        // console.log("history", props.history);
       // let action = LoginUserAction(value,props.history); // truyen history theo cach manually nhat
       console.log(value);
        let action = LoginUserAction(value)
      props.dispatch(action);
    },


    displayName: 'BasicForm',
})(Login); // vi withFormik () wrap (Login) nen cac props cuar login se la cac gia tri cua withFormik

export default connect()(HandleFormWithFormil); // tuuong tu nhu tren thi props cua HandleFormWithFormik se la cac gia tri cua connect redux (vi du nhu dispact) => ta co the su dung dispact ben trong HandleFormWithFormil ma ko gap loi
