import React from 'react'
import LoadingIcons from 'react-loading-icons';
import { useSelector } from 'react-redux';
import "../style/style.css";
export default function Loading() {
    const isLoading = useSelector(state => state.LoadingStateReducer.isLoading);
    //console.log("isLoading",isLoading)
    if (isLoading) {
        return (
            <div className="loading">
                <LoadingIcons.TailSpin fill="#000000" stroke='#ed0768' width='150px' height='150px'></LoadingIcons.TailSpin>
            </div>
            )
    } else {
        return ""
    }
}
