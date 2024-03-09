import React, {useState} from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Header} from "../components/index.jsx";
import DropWrapper from "../components/DropWrapper.jsx";
import Column from "../components/Column.jsx";
import ColumnItem from "../components/ColumnItem.jsx";
import {tasks,statuses} from "../data/dummy.jsx";

const Kanban = () => {
    const [items, setItems] = useState(()=>tasks)
    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);
        setItems(prevState => {
            const newItems = prevState.filter(i => i.id !== item.id).concat({...item, status,icon: mapping.icon});
            return [...newItems];
        })
    }
    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];
        })
    }
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-auto"} id={"kanban"}>
                <Header category={"Page"} title={"Kanban"}/>
                <div className={"flex flex-row justify-center"}>
                    {statuses.map(status => {
                        return (
                            <div className={"flex flex-column m-4 p-4 bg-cyan-200 rounded"} key={status.status}>
                                <h2 className={"text-xl font-semibold mb-4 mt-0"}>
                                    {status.status.toUpperCase()}
                                    <DropWrapper onDrop={onDrop} status={status.status}>
                                        <Column>
                                            {items.filter(i => i.status === status.status).map((i, idx) => (
                                                <ColumnItem key={i.id} item={i} index={idx} moveItem={moveItem} status={status}/>
                                            ))}
                                        </Column>
                                    </DropWrapper>
                                </h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        </DndProvider>
    );
};

export default Kanban;