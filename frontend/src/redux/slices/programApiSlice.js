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
        updateProgram: builder.mutation({
            query:(data)=>({
                url: `${PROGRAM_URL}/update-program`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteProgram: builder.mutation({
            query:(data)=>({
                url: `${PROGRAM_URL}/delete-program`,
                method: 'DELETE',
                body: data
            })
        }),
    })
})


export const {useAddProgramMutation, useGetAllProgramsQuery, useUpdateProgramMutation, useDeleteProgramMutation} = programApiSlice;