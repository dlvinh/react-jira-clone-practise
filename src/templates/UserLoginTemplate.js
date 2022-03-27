import { Layout } from 'antd';
import React, { useState } from 'react'
import { Route } from 'react-router-dom';

/**
 * Sử dụng High Oder components
 */const { Header, Footer, Sider, Content } = Layout;
export const UserLoginTemplate = (propsRoute) => {

    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    window.onresize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            
        })
    }

    let { Component, ...restRoute } = propsRoute;
    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Layout style={{height: windowSize.height }}>
                <Layout>
                    <Sider width={Math.round(windowSize.width / 2)} style={{ height: windowSize.height, background: 'url(https://picsum.photos/2000', backgroundSize: "cover", backgroundRepeat: 'no-repeat'}}>
                    </Sider>
                    <Content style={{height: windowSize.height }}>
                        <Component {...propsRoute}></Component>
                    </Content>

                </Layout>
            </Layout>
        </>
    }} >
    </Route>
}
