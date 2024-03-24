import {apiSlice} from "./apiSlice.js";

const PROGRAM_URL = '/api/v1/programs';

export const programApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addProgram: builder.mutation({
            query:(data)=>({
                url: `${PROGRAM_URL}`,
                method: 'POST',
                body: data
            })
        }),
        getAllPrograms:builder.query({
            query:()=>({
                url: `${PROGRAM_URL}`,
                method:'GET'
            })
        }),
        getProgram: builder.query({
            query:(id)=>({
                url: `${PROGRAM_URL}/${id}`,
                method: 'GET'
            })
        }),
        updateProgram: builder.mutation({
            query:({data,id})=>({
                url: `${PROGRAM_URL}/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteProgram: builder.mutation({
            query:( {id})=>({
                url: `${PROGRAM_URL}/${id}`,
                method: 'DELETE',
            })
        }),
        addSubjectToProgram: builder.mutation({
            query:({data,id})=>({
                url: `${PROGRAM_URL}/${id}/subjects`,
                method: 'PUT',
                body: data
            })
        })
    })
})


export const {useAddProgramMutation, useGetAllProgramsQuery, useGetProgramQuery, useUpdateProgramMutation, useDeleteProgramMutation} = programApiSlice;