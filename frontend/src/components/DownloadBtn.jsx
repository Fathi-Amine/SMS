import React from 'react';
import { FaFileDownload } from "react-icons/fa";
import * as XLSX from 'xlsx/xlsx.mjs';

const DownloadBtn = ({data = [], fileName}) => {
    return (
        <button
            type={"button"}
            className={"border border-cyan-300 flex justify-center items-center gap-2 rounded p-3 bg-cyan-300 hover:text-cyan-500 hover:bg-white"}
            onClick={()=>{

                    const dataTable = data?.length ? data : [];
                    const sheet = XLSX.utils.json_to_sheet(dataTable);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
                    XLSX.writeFile(workbook,fileName ? `${fileName}.xlsx` : "data.xlsx");

            }}
        >
            <FaFileDownload className={"text-xl"}/>
            <span>{"Download"}</span>
            
        </button>
    );
};

export default DownloadBtn;