import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Button, Input, AutoComplete } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined ,LoadingOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { DELETE_USER, GET_ALL_MEMBERS, OPEN_EDIT_FORM } from '../../Redux/ReduxTypeList/typeList';
import { useSelector } from 'react-redux';
import CreateUserForm from '../../components/Form/CreateUserForm';
export default function UserManagement() {
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type:GET_ALL_MEMBERS,
            keyWords:""
        })
    },[])

    const {memberList,loadingShow} = useSelector(state=> {
        return state.UserStateReducer;
    });

    // "userId": 827,
    //   "name": "112313",
    //   "avatar": "https://ui-avatars.com/api/?name=112313",
    //   "email": "abcde@commm.xn--comqq-irb",
    //   "phoneNumber": "0387778722"
    const columns = [
        {
            title: 'Index',
            dataIndex: 'userId',
            key: `userId`,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Phone Number',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber',
            // render: tags => (
            //     <>
            //         {tags.map(tag => {
            //             let color = tag.length > 5 ? 'geekblue' : 'green';
            //             if (tag === 'loser') {
            //                 color = 'volcano';
            //             }
            //             return (
            //                 <Tag color={color} key={tag}>
            //                     {tag.toUpperCase()}
            //                 </Tag>
            //             );
            //         })}
            //     </>
            // ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} type="primary" ghost></Button>
                    <Button icon={<DeleteOutlined />} danger onClick={()=>{
                        dispatch({
                            type: DELETE_USER,
                            data: record.userId
                        })
                    }}></Button>
                </Space>
            ),
        },
    ];

    const handleOpenCreateUserForm =()=>{
        dispatch({
            type: OPEN_EDIT_FORM,
            title: "CREATE NEW USER",
            content: <CreateUserForm></CreateUserForm>
        })
    }
    return (
        <React.Fragment>
            <Button className='mb-3' type='primary' icon={<PlusCircleOutlined />} onClick={handleOpenCreateUserForm}>Create User</Button>
            {/* <CreateUserForm></CreateUserForm> */}
            
            <div>
                <AutoComplete
                 className='mb-3'
                    style={{ width: "100%" }}
                    onSelect={()=>{

                    }}
                    onSearch={()=>{

                    }}>
                     <Input.Search size="large" placeholder="input here" enterButton />
                </AutoComplete>
            </div>


            <Table columns={columns} dataSource={memberList} rowKey="userId" loading={{indicator: <LoadingOutlined />, spinning:loadingShow}}></Table>
        </React.Fragment>

    )
}
