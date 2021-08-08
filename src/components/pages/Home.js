import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../Form';
import { useTable, usePagination, useRowSelect } from 'react-table';
const Home = () => {
    const [users, setUser] = useState([]);

    const [rowInfo, setRowInfo] = useState({
        rowEdit: null,
        selectedRowIndex: [],
        selectionChanged: false,
        rowData: {}
    });

    const data = React.useMemo(() => users, [users]);

    const columns = React.useMemo(
        () => [
            {
                Header: '',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Surname',
                accessor: 'surname',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data }, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        state: { pageIndex, pageSize },
        gotoPage,
        nextPage,
        page,
        previousPage,
        setPageSize,
        toggleHideColumn
    } = tableInstance;

    useEffect(() => {
        loadUsers();
        toggleHideColumn('id');
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3003/users");
        setUser(result.data.reverse());
    };

    const onClickEdit = () => {
        if (Object.keys(rowInfo.selectedRowIndex).length === 0) {
            console.log("cant");
        } else {
            setRowInfo({ ...rowInfo, rowData: rowInfo.selectedRowIndex });

        }
    };

    const onClickDelete = async () => {
        if (Object.keys(rowInfo.selectedRowIndex).length === 0) {
            console.log("cant");
        } else {
            await axios.delete("http://localhost:3003/users/" + rowInfo.selectedRowIndex?.id);
            // TODO: Remove old row selection data on delete (setRowInfo({}))
            loadUsers();
        }
    };

    const onClickNew = () => {
        setRowInfo({
            ...rowInfo,
            rowData:{
                name:"",surname:"",email:"",phone:""
            }
        });
    };


    const isEditing = typeof rowInfo.rowEdit !== 'undefined' && rowInfo.rowEdit !== null;

    function onFormSubmitSuccess(){
        if(isEditing){
            loadUsers(); 
        }
        else {
            loadUsers();
        }
    }

    return (
        <div>
            <Form onSuccess={onFormSubmitSuccess} formData={rowInfo.rowData} isEditing={isEditing} />

            <div className="container py-4">
                <div className="row g-3 border shadow ">
                    <div className="py-4">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-outline-success me-md-2" type="button" onClick={onClickNew}>New</button>
                            <button class="btn btn-outline-warning me-md-2" type="button" disabled={!isEditing} onClick={onClickEdit}>Edit</button>
                            <button class="btn btn-outline-danger  me-md-2" type="button" disabled={!isEditing} onClick={onClickDelete}>Delete</button>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-default table-striped mt-2" {...getTableProps()}>
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {
                                                headerGroup.headers.map(column => (
                                                    <th {...column.getHeaderProps()}>
                                                        {
                                                            column.render('Header')}
                                                    </th>
                                                ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {
                                        page.map(row => {
                                            prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps({
                                                    onClick: () => { /* select the row here */
                                                        console.log(row);

                                                        if (row.index != rowInfo.rowEdit) {
                                                            setRowInfo({
                                                                ...rowInfo,
                                                                rowEdit: row.index,
                                                                selectedRowIndex: row.original,
                                                                selectionChanged: rowInfo.selectionChanged
                                                                    ? false
                                                                    : true
                                                            });
                                                        } else {
                                                            setRowInfo({
                                                                ...rowInfo,
                                                                rowEdit: null
                                                            });
                                                        }
                                                        console.log(row.index);
                                                    },
                                                    style: {
                                                        background:
                                                            row.index === rowInfo.rowEdit ? "#00afec" : "white",
                                                        color:
                                                            row.index === rowInfo.rowEdit ? "white" : "black"
                                                    }

                                                })}>
                                                    {
                                                        row.cells.map(cell => {
                                                            return (
                                                                <td {...cell.getCellProps()}>
                                                                    {
                                                                        cell.render('Cell')}
                                                                </td>
                                                            )
                                                        })}
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>

                            <div className="pagination">
                                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                    {'<<'}
                                </button>{' '}
                                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    {'<'}
                                </button>{' '}
                                <button onClick={() => nextPage()} disabled={!canNextPage}>
                                    {'>'}
                                </button>{' '}
                                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                    {'>>'}
                                </button>{' '}
                                <span>
                                    Page{' '}
                                    <strong>
                                        {pageIndex + 1} of {pageOptions.length}
                                    </strong>{' '}
                                </span>
                                <span>
                                    | Go to page:{' '}
                                    <input
                                        type="number"
                                        defaultValue={pageIndex + 1}
                                        onChange={e => {
                                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                                            gotoPage(page)
                                        }}
                                        style={{ width: '100px' }}
                                    />
                                </span>{' '}
                                <select
                                    value={pageSize}
                                    onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {[10, 20, 30, 40, 50].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home;
