import React from 'react';
import {useDrop} from "react-dnd";
import ITEM_TYPE from "../utils/items";
import {statuses, tasks} from "../data/dummy.jsx";
import Column from "./Column.jsx";

const DropWrapper = ({onDrop, children, status}) => {
    const [{isOver}, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = statuses.findIndex(si => si.status === item.status); // Find current column index
            const statusIndex = statuses.findIndex(si => si.status === status); // Find target column index

            // Check if target column exists (avoid potential errors)
            if (statuses[statusIndex] === undefined) {
                return false; // Disallow drop if target column is undefined
            }

            // Check if it's the same column or a neighboring column
            const isNeighboringColumn = [itemIndex + 1, itemIndex - 1].includes(statusIndex);

            // Find items within the target column (based on status)
            const targetColumnItems = tasks.filter(task => task.status === statuses[statusIndex].status);
            const isSameColumn = itemIndex === statusIndex;
            // Check if any other item exists in the target column (excluding the dragged item)
            const targetItemExists = targetColumnItems.some(i => i.id !== item.id);

            // Allow dropping based on conditions
            return isNeighboringColumn || (!targetItemExists && !isSameColumn);
            },
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    })
    return (
        <div ref={drop} className={"flex flex-grow-1 flex-shrink w-1/4"}>
            {React.cloneElement(<Column isColumnOver={isOver}>{children}</Column>)}
        </div>
    );
};

export default DropWrapper;