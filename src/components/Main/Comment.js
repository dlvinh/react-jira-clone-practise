import React, { useRef, useState } from 'react';
import htmlParser from 'html-react-parser';
import { DELETE_COMMENT, UPDATE_COMMENT } from '../../Redux/ReduxTypeList/typeList';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
export default function Comment(props) {
    const editorRef = useRef(null);
    const comment = props.comment;
    const index = props.index;
    const { taskId } = useSelector(state => state.TaskStateReducer.taskDetailModal);
    const dispatch = useDispatch();
    const [showEditor, setShowEditor] = useState(false);
    const editorText = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            // Set value for particular field (such as name, description, projectCategori) for the text editor
        }
    };
    const renderContent = () => {
        if (!showEditor) {
            return <div>
                <p style={{ marginBottom: 5 }}>
                    {comment.name}<span> commend a month ago</span>
                </p>
                {htmlParser(comment.commentContent)}
                {/* {showEditComment === false ? htmlParser(comment.commentContent) : renderEditCommentEditor()} */}

                <div>
                    <span data-target={index} className="edit_comment" onClick={(e) => {
                        setShowEditor(true)
                    }}>Edit</span>
                    •
                    <span className="delete_comment" onClick={() => {
                        dispatch({
                            type: DELETE_COMMENT,
                            data: {
                                taskId: taskId,
                                commentId: comment.id
                            }
                        })
                    }}>Delete</span>
                </div>
            </div>
        }
        else {
            return <>
                <Editor
                    name='commentContent'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={comment.commentContent}
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
                         dispatch({
                            type: UPDATE_COMMENT,
                            data: {
                                id: comment.id,
                                content: editorRef.current.getContent(),
                                taskId: taskId
                            }
                        })
                        setShowEditor(false)
                    }}>Save</Button>
                </div>
            </>
        }
    }
    return (
        <div className="comment-item" key={index}>
            <div className="display-comment" style={{ display: 'flex' }}>
                <div className="avatar">
                    <img src={comment.avatar} alt="comment.avatar" />
                </div>
                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
