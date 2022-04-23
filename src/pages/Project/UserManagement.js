import React, { useEffect, useRef, useState } from 'react'
import { Table, Tag, Space, Button, Input, AutoComplete } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, LoadingOutlined,SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { DELETE_USER, GET_ALL_MEMBERS, OPEN_DRAWER, OPEN_EDIT_FORM, SEARCH_USER, SELECT_EDIT_USER } from '../../Redux/ReduxTypeList/typeList';
import { useSelector } from 'react-redux';
import CreateUserForm from '../../components/Form/CreateUserForm';
import EditUserForm from '../../components/Form/EditUserForm';
export default function UserManagement() {
    console.log("table")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_MEMBERS,
            keyWords: ""
        })
    }, [])

    const { memberList, memberListOption } = useSelector(state => {
        return state.UserStateReducer;
    });
    const {tableLoading} = useSelector(state=> state.TableLoadingState)
    const [option, setOption] = useState();

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
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} type="primary" ghost onClick={()=>{
                         dispatch({
                            type: OPEN_EDIT_FORM,
                            title: "EDIT USER",
                            content: <EditUserForm></EditUserForm>
                        })
                        dispatch({
                            type: SELECT_EDIT_USER,
                            user: record
                        })
                       
                    }}></Button>
                    <Button icon={<DeleteOutlined />} danger onClick={() => {
                        dispatch({
                            type: DELETE_USER,
                            data: record.userId
                        })
                    }}></Button>
                </Space>
            ),
        },
    ];

    const handleOpenCreateUserForm = () => {
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

            <div className='d-flex'>
                <AutoComplete
                    className='mb-3'
                    value={option?.label}
                    onChange={(text) => {
                        // console.log("onChange",text)
                        setOption(text);
                    }}
                    options={
                        memberListOption?.map((option, index) => {
                            return {
                                label: option.name,
                                value: option.userId.toString()
                            }
                        })
                    }
                    style={{ width: "100%" }}
                    onSelect={(value, option) => {
                        // {label: 'naruto', value: '1641'}
                        dispatch({
                            type: GET_ALL_MEMBERS,
                            keyWords: option.label
                        })
                        setOption(option);
                    }}
                    onSearch={(text) => {
                            const timeout = setTimeout(() => {
                                dispatch({
                                    type: SEARCH_USER,
                                    keyWords: text
                                })
                            }, 1000)
                        if (text.trim() === "") {
                            // console.log("CLEAR TEXT")
                            dispatch({
                                type: GET_ALL_MEMBERS,
                                keyWords: ""
                            })
                            clearTimeout(timeout)
                        }
                    }}
                >
                    
                </AutoComplete>
                <Button type="primary" icon={<SearchOutlined />} onClick={()=>{  
                     dispatch({
                        type: GET_ALL_MEMBERS,
                        keyWords: option.label
                    })
                }}/>
            </div>
            <Table columns={columns} dataSource={memberList} rowKey="userId" loading={{ indicator: <LoadingOutlined />, spinning: tableLoading }}></Table>
        </React.Fragment>

    )
}
