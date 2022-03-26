import React from 'react'
import { Button, Layout, Input } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup'; // help to validate easier
/**
 * use antd design to setup layout
 * https://ant.design/components/layout/
 */

export function Login(props) {

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
            <form onSubmit={handleSubmit} className='container' >
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
                        <i class="fab fa-facebook" style={{ fontSize: "35px", color: "#385898" }}></i>

                        <i class="fab fa-google ml-3" style={{
                            fontSize: "35px",
                            color: "#dd4b39"
                        }}></i>

                        <i class="fab fa-twitter ml-3" style={{ fontSize: "35px", color: "#385898" }}></i>
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
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
    }),

    handleSubmit:(e)=>{
        // handleSubmit act as a props
        console.log(e)
    },


    displayName: 'BasicForm',
})(Login);

export default HandleFormWithFormil;
