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
        updateSubject: builder.mutation({
            query:(data)=>({
                url: `${SUBJECT_URL}/update-subject`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteSubject: builder.mutation({
            query:(data)=>({
                url: `${SUBJECT_URL}/delete-subject`,
                method: 'DELETE',
                body: data
            })
        }),
    })
})

export const {useAddSubjectMutation, useGetAllSubjectsQuery, useUpdateSubjectMutation, useDeleteSubjectMutation} = subjectApiSlice;