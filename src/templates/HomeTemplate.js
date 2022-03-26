import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/Home/Header';

/**
 * Hometemplate is a template thay show all header and footer]
 */
export const HomeTemplate = (propRoute)=> {
    let {ComponentTemplate, ...otherProps} = propRoute;
    return <>
        <Header></Header>
        <Route {...otherProps} render={(propRoute)=>{
           return <ComponentTemplate {...propRoute}></ComponentTemplate>
        }} ></Route>
    </>
}
