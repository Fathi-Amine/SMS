import React, {Fragment, useState, useRef} from 'react';
import {useDrop, useDrag} from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "../utils/items";

const ColumnItem = ({item, index, moveItem, status}) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor){
            if(!ref.current){
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex){
                return;
            }
            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;
            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY){
                return;
            }
            if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY){
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })
    const [{isDragging}, drag] = useDrag({
        type: ITEM_TYPE,
        item: { ...item, type: ITEM_TYPE, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const [show, setShow] = useState(false);
    const onOpen = () => setShow(true);
    const onClose = () => setShow(false);
    drag(drop(ref));
    return (
        <Fragment>
            <div
                ref={ref}
                className={`p-2.5 my-2.5 bg-white rounded-lg shadow-md cursor-pointer z-10 ${isDragging ? "opacity-0" : "opacity-1"}`}
                onClick={onOpen}
            >
                <div className={"w-10 h-2.5 rounded-md"} style={{backgroundColor:status.color}}></div>
                <p className={"text-lg font-semibold"}>{item.content}</p>
                <p className={"text-right"}>{item.icon}</p>
            </div>
            <Window show={show} onClose={onClose} status={status} item={item} />
        </Fragment>
    );
};

export default ColumnItem;