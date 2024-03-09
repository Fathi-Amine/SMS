import { useMemo, useState } from 'react';
import {
    flexRender,
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
/*import { useTableExport } from 'material-react-table';*/
import {Button, Header} from "../components/index.jsx";
import {people} from "../data/dummy.jsx";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import DownloadBtn from "../components/DownloadBtn.jsx";
import DebouncedInput from "../components/DebouncedInput.jsx";

const Customers = () => {
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor("id", {
            cell: (info)=> <span>{info.getValue()}</span>,
            header: "ID"

        }),
        columnHelper.accessor("first_name", {
            cell: (info)=> <span>{info.getValue()}</span>,
            header: "First Name"

        }),
        columnHelper.accessor("last_name", {
            cell: (info)=> <span>{info.getValue()}</span>,
            header: "Last Name"

        }),
        columnHelper.accessor("email", {
            cell: (info)=> <span>{info.getValue()}</span>,
            header: "Email"

        }),
        columnHelper.accessor("gender", {
            cell: (info)=> <span>{info.getValue()}</span>,
            header: "Gender"

        }),
    ]
    const [data] = useState(()=>[...people])
    const [globalFilter, setGlobalFilter] = useState("")
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return (
        <div className={"m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-auto"}>
            <Header category={"Page"} title={"Customers"}/>
            <div className={"flex items-center justify-between"}>
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value)=> setGlobalFilter(String(value))}
                    className={"p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-cyan-500"}
                    placeholder={"Search..."}
                />
                <DownloadBtn data={data} fileName={"Orders"}/>
            </div>
            <table className={"border border-gray-700 w-full text-left mt-2"}>
                <thead className={"bg-indigo-600"}>
                {
                    table.getHeaderGroups().map((headerGroup)=>(
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map((header)=>(
                                    <th key={header.id} className={"capitalize px-3.5 py-2"}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
                </thead>
                <tbody>
                {
                    table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row,index)=>(
                            <tr key={row.id} className={`${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'}`}>
                                {
                                    row.getVisibleCells().map((cell)=>(
                                        <td key={cell.id} className={"px-3.5 py-2"}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    ) : null
                }
                </tbody>
            </table>
            {/*PAGINATION*/}
            <div className={"flex items-center justify-end mt-2 gap-2"}>
                <button onClick={()=>{
                    table.previousPage()
                }}
                        disabled={!table.getCanPreviousPage()}
                        className={"p-1 border border-gray-200 px-2 disabled:opacity-30"}>
                    {"<"}
                </button>
                <button onClick={()=>{
                    table.nextPage()
                }}
                        disabled={!table.getCanNextPage()}
                        className={"p-1 border border-gray-200 px-2 disabled:opacity-30"}>
                    {">"}
                </button>
                <span className={"flex items-center gap-1"}>
                    <div>
                        Page{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {" "}{table.getPageCount()}
                        </strong>{' '}
                    </div>
                </span>
                <span className={"flex items-center gap-1"}>
                    <input
                        type={"number"}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        className={"p-1 border rounded bg-transparent w-16 border-gray-200 px-2"}
                        onChange={(e)=>{
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page)
                        }}
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e)=>{
                        table.setPageSize(Number(e.target.value))
                    }}
                    className={"p-2 bg-transparent"}
                >
                    {[5,10,20,30,40,50].map((pageSize)=>(
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
};

export default Customers;