import {notification}  from 'antd';
export const openNotification = (type,placement, description,message) => {
    notification[type]({
            message: message,
            description:description,
                placement,
            duration: 2,
        });
    };
