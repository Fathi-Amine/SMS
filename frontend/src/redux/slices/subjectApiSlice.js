import {apiSlice} from "./apiSlice.js";

const SUBJECT_URL = '/api/v1/subjects';

export const subjectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addSubject: builder.mutation({
            query:(data)=>({
                url: `${SUBJECT_URL}/${data.programID}`,
                method: 'POST',
                body: data
            })
        }),
        getAllSubjects:builder.query({
            query:()=>({
                url: `${SUBJECT_URL}`,
                method:'GET'
            })
        }),
        getSubject: builder.query({
            query:(id)=>({
                url: `${SUBJECT_URL}/${id}`,
                method: 'GET'
            })
        }),
        updateSubject: builder.mutation({
            query:({data, id})=>({
                url: `${SUBJECT_URL}/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteSubject: builder.mutation({
            query:({id})=>({
                url: `${SUBJECT_URL}/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {useAddSubjectMutation, useGetAllSubjectsQuery, useGetSubjectQuery, useUpdateSubjectMutation, useDeleteSubjectMutation} = subjectApiSlice;