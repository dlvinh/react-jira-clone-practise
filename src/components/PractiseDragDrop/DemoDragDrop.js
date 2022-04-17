import React, { useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import "./DragDrop.css"
const defaultValue = [
    { id: 1, taskName: 'Task 1' },
    { id: 2, taskName: 'Task 2' },
    { id: 3, taskName: 'Task 3' },
    { id: 4, taskName: 'Task 4' },
    { id: 5, taskName: 'Task 5' },
];
export default function DemoDragDrop() {
    const [taskList, setTaskList] = useState(defaultValue);
    const dragTag = useRef({});
    const dragEnterTag = useRef({});
    const springProps = useSpring({
        to: { bottom: 25, position: "relative" },
        from: { bottom: 0 },
        config: {
            duration: 250,
        
        },
        reset: true
    })

    const handleDragStart = (event, task, index) => {
        console.log("handleDragStart", {
            e: event.target,
            task: task,
            dragIndex: index
        })
        dragTag.current = task
        console.log(dragTag);
    }

    // const handleDragOver = (event, task, index) => {
    //     console.log("Tag duoc over:", {
    //         e: event.target,
    //         task: task,
    //         index: index
    //     })
    // }
    // const handleOnDrop = (e, Droptask, dropIndex) => {
    //     console.log("onDropTask", {
    //         event: e.target,
    //         task: Droptask,
    //         index: dropIndex
    //     })
    //     let taskListUpdate = [...taskList];
    //     // tim index cua drag Tag la bao nhieu ben trong mang taskListUpdate
    //     // let dragTagIndex = taskListUpdate.findIndex(task => task.id === dragTag.current.dragTask.id);
    //     // // tim index cua thang drop la bao nhieu ben trong mang taskListUpdate
    //     // let dropTagIndex =taskListUpdate.findIndex(task => task.id === Droptask.id);
    //     let dragTagIndex = dragTag.current.dragIndex;
    //     let dropTagIndex = dropIndex;
    //     // HOAC
    //     console.log("dragTagIndex", dragTagIndex);
    //     console.log("dropTagIndex", dropTagIndex);
    //     // let temp  = taskListUpdate[dragTagIndex];
    //     // console.log(temp);
    //     // taskListUpdate[dragTagIndex]= taskListUpdate[dropTagIndex];
    //     // console.log("ABC",taskListUpdate[dragTagIndex]= taskListUpdate[dropTagIndex]);
    //     // taskListUpdate[dropTagIndex] =temp
    //     // console.log("taskListUpdate",taskListUpdate);
    //     // setTaskList(taskListUpdate)
    //     // HOAC CO THE DUNG
    //     [taskListUpdate[dragTagIndex], taskListUpdate[dropTagIndex]] = [taskListUpdate[dropTagIndex], taskListUpdate[dragTagIndex]]
    //     setTaskList(taskListUpdate);
    // }

    const handleDragEnter = (e, enterDrag, dragIndex) => {
        //e.preventDefault()
        console.log("dragEnter", {
            event: e.target,
            task: enterDrag,
            index: dragIndex
        })
        // luu lai gia tri cua tag vi khi state thay doi thi dragEnterTag cung se thay doi
        dragEnterTag.current = { ...enterDrag }
        let taskListUpdate = [...taskList];
        //tim index cua drag Tag la bao nhieu ben trong mang taskListUpdate
        let dragTagIndex = taskListUpdate.findIndex(task => task.id === dragTag.current.id);
        // tim index cua thang drop la bao nhieu ben trong mang taskListUpdate
        let enterDragIndex = taskListUpdate.findIndex(task => task.id === enterDrag.id);

        let temp = taskListUpdate[dragTagIndex];
        console.log(temp);
        taskListUpdate[dragTagIndex] = taskListUpdate[enterDragIndex];
        console.log("ABC", taskListUpdate[dragTagIndex] = taskListUpdate[enterDragIndex]);
        taskListUpdate[enterDragIndex] = temp;
        console.log("taskListUpdate", taskListUpdate);
        setTaskList(taskListUpdate)

        // HOAC CO THE DUNG
        // let dragTagIndex = dragTag.current.id; // task id
        // let enterDragIndex = dragIndex;
        // console.log("dragTagIndex", dragTagIndex);
        // console.log("enterDragIndex", enterDragIndex);
        // // [taskListUpdate[dragTagIndex], taskListUpdate[enterDragIndex]] = [taskListUpdate[enterDragIndex], taskListUpdate[dragTagIndex]]
        // // setTaskList(taskListUpdate);
    }

    const handleDragEnd = (e) => {
        dragTag.current = {};
        setTaskList([...taskList])
    }
    return (
        <div className='container'>
            <h2>DemoDragDrop</h2>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 bg-dark p-5'>
                    {taskList.map((task, index) => {
                        // return <div draggable={true} onDragStart={(e) => {
                        //     handleDragStart(e, task, index)
                        // }}
                        //     onDragOver={(e) => {
                        //         e.preventDefault();
                        //     }}
                        //     onDrop={(e) => {
                        //         handleOnDrop(e, task, index);
                        //     }}
                        //     key={index} className="bg-primary text-white m-1 p-3">
                        //     {task.taskName}
                        // </div>

                        let cssDrag = task.id === dragTag.current.id ? "draTag" : "";
                        if (task.id === dragEnterTag.current.id) {
                            return <animated.div
                            style={{
                                position: 'relative',
                                bottom: springProps.bottom
                                }}
                                draggable={true}
                                onDragStart={(e) => {
                                    handleDragStart(e, task, index)
                                }}
                                onDragEnter={(e) => {
                                    handleDragEnter(e, task, index)
                                }}
                                onDragEnd={(e) => {
                                    handleDragEnd(e)
                                }}
                                key={index}
                                className={`bg-primary text-white m-3 p-3`}>
                                {task.taskName}
                            </animated.div>
                        }
                        
                        return <div draggable={true}
                            onDragStart={(e) => {
                                handleDragStart(e, task, index)
                            }}
                            onDragEnter={(e) => {
                                handleDragEnter(e, task, index)
                            }}
                            onDragEnd={(e) => {
                                handleDragEnd(e)
                            }}
                            key={index}
                            className={`bg-primary text-white m-3 p-3 ${cssDrag}`}>
                            {task.taskName}
                        </div>
                    })}
                </div>
            </div>
            <div className='row'>
                <div onDragOver={(e) => {
                    e.preventDefault()
                }}
                    // onDrop={(e) => {
                    //     e.preventDefault();
                    //     console.log("onDrop", e.target);
                    // }}

                    draggable={true}
                    className='col-12 bg-primary' style={{ height: "100px" }} >
                    HandleDragOver
                </div>
            </div>
        </div>
    )
}
/**
 * draggable: the tag is now able to be drag
 */
