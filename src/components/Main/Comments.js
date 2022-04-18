import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import {  UPLOAD_COMMENT } from '../../Redux/ReduxTypeList/typeList';
import '../../style/style.css';

import Comment from './Comment';
export default function Comments(props) {
    const editorRef = useRef(null);
    const { lstComment, taskId } = useSelector(state => state.TaskStateReducer.taskDetailModal);
    const { user } = useSelector(state => state.UserStateReducer);
    const [showEditor, setShowEditor] = useState(false);
    const [showEditComment, setShowEditComment] = useState(false);
    const dispatch = useDispatch();
    const editorText = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            // Set value for particular field (such as name, description, projectCategori) for the text editor
        }
    };

    const renderEditCommentEditor = () => {
        
    }
    const renderTaskComment = () => {
        console.log("lstComment", lstComment);
        return lstComment.map((comment, index) => {
            return <Comment comment={comment} index={index} key={index}></Comment>
        })
    }
    const uploadComment = () => {
        dispatch({
            type: UPLOAD_COMMENT,
            newComment: {
                taskId: taskId,
                contentComment: editorRef.current.getContent()
            }
        });
        setShowEditor(false)
    }
    const renderEditor = () => {
        if (!showEditor) {
            return <input type="text" placeholder="Add a comment ..." readOnly onClick={() => {
                setShowEditor(true);
            }} />;
        }
        return <>
            <Editor
                name='commentContent'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""
                init={{
                    height: 150,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={editorText}
            />
            <div className='text-right'>
                <Button type="danger" shape="round" className='mt-2 text-left' onClick={() => {
                    setShowEditor(false)
                }}>Cancel</Button>
                <Button type="primary" shape="round" className='mt-2 text-left' onClick={() => {
                    uploadComment();
                }}>Save</Button>
            </div>

        </>
    }

    return (
        <div className="comment">
            <h6>Comment</h6>
            <div className="block-comment" style={{ display: 'flex' }}>
                <div className="avatar">
                    <img src={user.avatar} alt={user.avatar} />
                </div>
                <div className="input-comment">
                    {/* <input type="text" placeholder="Add a comment ..." />
                    <p>
                        <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                        <span>press
                            <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                            to comment</span>
                    </p> */}
                    {renderEditor()}
                </div>
            </div>
            {/* ====== COMMENTS */}
            <div className="lastest-comment">
                {renderTaskComment()}
            </div>
        </div>
    )
}
