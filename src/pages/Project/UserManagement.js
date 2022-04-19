import React, { useEffect } from 'react'
import { Table, Tag, Space, Button, Input, AutoComplete } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { GET_ALL_MEMBERS } from '../../Redux/ReduxTypeList/typeList';
import { useSelector } from 'react-redux';
export default function UserManagement() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type:GET_ALL_MEMBERS,
            keyWords:""
        })
    },[])

    const data = useSelector(state=> state.UserStateReducer.memberList);
    console.log(data)
    const content = [
        {
            "userId": 827,
            "name": "112313",
            "avatar": "https://ui-avatars.com/api/?name=112313",
            "email": "abcde@commm.xn--comqq-irb",
            "phoneNumber": "0387778722"
        },
        {
            "userId": 850,
            "name": "thangtvads",
            "avatar": "https://ui-avatars.com/api/?name=thangtvads",
            "email": "11111@gmail.com",
            "phoneNumber": "12121212112"
        },
        {
            "userId": 862,
            "name": "dgdfg",
            "avatar": "https://ui-avatars.com/api/?name=dgdfg",
            "email": "hungkun@gmail.com",
            "phoneNumber": "43"
        },
        {
            "userId": 935,
            "name": "Hanavi",
            "avatar": "https://ui-avatars.com/api/?name=Hanavi",
            "email": "vanaffvcc@gmail.com",
            "phoneNumber": "1234569631"
        },
    ]
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
                    <Button icon={<DeleteOutlined />} danger></Button>
                </Space>
            ),
        },
    ];
    return (
        <React.Fragment>


            <Button className='mb-3' type='primary' icon={<PlusCircleOutlined />}>Create User</Button>
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


            <Table columns={columns} dataSource={data} rowKey="userId"></Table>
        </React.Fragment>

    )
}
