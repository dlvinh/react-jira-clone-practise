import { Layout } from 'antd';
import React from 'react'
import { Route } from 'react-router-dom';

/**
 * Sử dụng High Oder components
 */const { Header, Footer, Sider, Content } = Layout;
export const UserLoginTemplate = (propsRoute) => {
    
    let { Component, ...restRoute } = propsRoute;

    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Layout>
                <Layout>
                    <Sider width={window.innerWidth/2} style={{height: window.innerHeight, background: 'url(https://picsum.photos/2000',backgroundSize:"100%"}}>
                    
                    </Sider>
                    <Content>
                        <Component {...propsRoute}></Component>
                    </Content>

                </Layout>
            </Layout>
        </>
    }} >

    </Route>
}
