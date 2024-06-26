import {apiSlice} from "./apiSlice.js";

const ACADEMIC_TERM_URL = '/api/v1/academic-terms';

export const academicTermSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addAcademicTerm: builder.mutation({
            query:(data)=>({
                url: `${ACADEMIC_TERM_URL}`,
                method: 'POST',
                body: data
            })
        }),
        getAllAcademicTerms:builder.query({
            query:()=>({
                url: `${ACADEMIC_TERM_URL}`,
                method:'GET'
            })
        }),
        getAcademicTerm : builder.query({
            query:(id)=>({
                url: `${ACADEMIC_TERM_URL}/${id}`,
                method: 'GET'
            })
        }),
        updateAcademicTerm: builder.mutation({
            query:({data,id})=>({
                url: `${ACADEMIC_TERM_URL}/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteAcademicTerm: builder.mutation({
            query:({id})=>({
                url: `${ACADEMIC_TERM_URL}/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {useAddAcademicTermMutation, useGetAllAcademicTermsQuery, useGetAcademicTermQuery, useUpdateAcademicTermMutation, useDeleteAcademicTermMutation} = academicTermSlice;