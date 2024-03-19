import {apiSlice} from "./apiSlice.js";

const STUDENT_URL = '/api/v1/students';

export const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addStudent: builder.mutation({
            query:(data)=>({
                url: `${STUDENT_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        getAllStudents:builder.query({
            query:()=>({
                url: `${STUDENT_URL}/all`,
                method:'GET'
            })
        }),
        updateStudent: builder.mutation({
            query:(data)=>({
                url: `${STUDENT_URL}/update-student`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteStudent: builder.mutation({
            query:(data)=>({
                url: `${STUDENT_URL}/delete-student`,
                method: 'DELETE',
                body: data
            })
        }),
    })
})

export const {useAddStudentMutation, useGetAllStudentsQuery, useUpdateStudentMutation, useDeleteStudentMutation} = studentApiSlice;