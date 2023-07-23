import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

function TableComponent() {
    interface Posts {
        userId: number,
        id: number,
        title: string,
        body: string
    }
    const[rows,setRows]=useState<Posts[]>([]);

    const columns: GridColDef<Posts>[] = [
        { field: 'userId', headerName: 'User ID', width: 60 },
        { field: 'id', headerName: 'ID', width: 40 },
        {
            field: 'title',
            headerName: 'Title',
            width: 280,
            sortable:false
        },
        {
            field: 'body',
            headerName: 'Body',
            width: 750,
            sortable:false
        }
    ];
    console.log(rows);
    useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json=>{
        //console.log(json);
        setRows(json);
    })
    },[])
    if(rows.length!==0){
        return (
            <Box sx={{ height:"80vh", width: '100%' }}>
                <h1 style={{textAlign:"center"}}>Table</h1>
                <DataGrid
                    rows={rows}
                    getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 11,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        )
    }
    
    

}

export default TableComponent;