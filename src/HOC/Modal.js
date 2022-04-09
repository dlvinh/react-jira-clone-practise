import React, { useState } from 'react'
import { Drawer, Button, Select, Space,  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { OPEN_DRAWER, CLOSE_DRAWER } from '../Redux/ReduxTypeList/typeList';
const { Option } = Select;
export default function Modal() {
    const { visible, componentContent, callBackSubmitHandler,title } = useSelector(state => state.ModalStateReducer)
    const dispatch = useDispatch();
    const showDrawer = () => {
        dispatch({ type: OPEN_DRAWER });
    };
    const onClose = () => {
        dispatch({ type: CLOSE_DRAWER });
    };
   
    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                {componentContent}
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                   
                        <Button onClick={callBackSubmitHandler} type="primary">
                            Submit
                        </Button>
                </Space>
            </Drawer>
        </>
    )
}
