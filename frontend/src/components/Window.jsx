import React, {useEffect} from 'react';
import Modal from "react-modal";
import {IoMdClose} from "react-icons/io";

/*
Modal.setAppElement("#kanban");
*/
const Window = ({show, item, onClose, status}) => {
    useEffect(() => {
        Modal.setAppElement("#kanban");
    }, []);
    return (
        <div>
            <Modal
                isOpen={show}
                onRequestClose={onClose}
                className={"bg-gray-200 rounded-sm mt-12 mb-20 min-h-[450px] w-[800px] outline-none p-4"}
                overlayClassName={"flex items-center fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50"}
            >
                <div className={"flex"}>
                    <h1 className={"text-2xl font-semibold"}>{item.title}</h1>
                    <button onClick={onClose}><IoMdClose/></button>
                </div>
                <div>
                    <h2>Description</h2>
                    <p>{item.content}</p>
                    <h2>Status</h2>
                    <p>{item.icon} {`${item.status.charAt().toUpperCase()}${item.status.slice(1)}`}</p>
                </div>
            </Modal>
        </div>
    );
};

export default Window;