import {notification}  from 'antd';
export const openNotification = (type,placement, description) => {
    notification[type]({
            message: `Delete Prorject`,
            description:description,
                placement,
            duration: 2,
        });
    };
