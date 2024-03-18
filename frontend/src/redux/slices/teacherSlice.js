import {apiSlice} from "./apiSlice.js";

const TEACHERS_URL = '/api/v1/teachers'

export const teacherApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query:(data)=>({
                url: `${TEACHERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        registerTeacher: builder.mutation({
            query:(data)=>({
                url: `${TEACHERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query:(arg)=> ({
                url: `${TEACHERS_URL}/logout`,
                method: 'DELETE'
            })
        }),
        getAllTeachers:builder.query({
            query:()=>({
                url: `${TEACHERS_URL}`,
                method:'GET'
            })
        }),
    })
})

export const {useLoginMutation, useRegisterTeacherMutation, useLogoutMutation, useGetAllTeachersQuery} = teacherApiSlice;