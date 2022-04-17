import React, { useState } from 'react';
import _ from 'lodash';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
export default function DragDropLib() {
    const [state, setState] = useState({
        toDo: {
            id: "toDo",
            items: [
                { id: "1", taskName: "task 1" },
                { id: "2", taskName: "task 2" },
                { id: "3", taskName: "task 3" }
            ]
        },
        inProgress: {
            id: "inProgress",
            items: [
                { id: "4", taskName: "task 4" },
                { id: "5", taskName: "task 5" },
                { id: "6", taskName: "task 6" }
            ]
        },
        done: {
            id: "done",
            items: [
                { id: "7", taskName: "task 7" },
                { id: "8", taskName: "task 8" },
                { id: "9", taskName: "task 9" }
            ]
        }
    })
    const HandleDragEnd= (res)=>{
        // res includes value of dragtag and value of destination
        console.log(res)
        let {source,destination} = res;
        if (!destination){
            return;
        }
        if (destination.index === source.idnex && destination.droppableId === source.droppableId){
            return;
        }
        // tag drag
        let copyItem = state[source.droppableId].items[source.index];
        console.log("tag drag",copyItem);
        // source
        let dropSource = state[source.droppableId].items;
        let index = state[source.droppableId].items.findIndex(item => item.id == copyItem.id);
        state[source.droppableId].items.splice(index,1);
        console.log("dropSource",dropSource);
        // destination 
        let dropDestination = state[destination.droppableId].items;
        dropDestination.splice(destination.index, 0, copyItem);
        console.log("dropDestination",dropDestination)
    
     
        setState(state);

    }
    return (
        <div className='container'>
            <h3>DragDropLib</h3>
            <DragDropContext onDragEnd={(res)=>{
                HandleDragEnd(res);
            }}>


                <div className='row'>
                    {_.map(state, (statusTask, index) => {
                        return <Droppable droppableId={statusTask.id} key={index}>
                            {(provided) => {
                                return <div className='col-4 bg-dark p-5'
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {statusTask.items.map((task, index) => {
                                        return <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => {
                                                return <div className='mt-2 p-3 bg-white text-center' key={index}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {task.taskName}
                                                </div>
                                            }}
                                        </Draggable>

                                    })}
                                    {/* provided nay tu Droppable */}
                                {provided.placeholder} 
                                </div>
                              
                            }}
                           
                        </Droppable>
                    })}
                </div>
            </DragDropContext>
        </div>

    )
}
