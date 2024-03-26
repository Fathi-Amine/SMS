import {apiSlice} from "./apiSlice.js";

const ACADEMIC_YEARS_URL = '/api/v1/academic-years'

export const academicYearApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addAcademicYear: builder.mutation({
            query:(data)=>({
                url: `${ACADEMIC_YEARS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        getAllAcademicYears:builder.query({
            query:()=>({
                url: `${ACADEMIC_YEARS_URL}`,
                method:'GET'
            })
        }),
        getAcademicYear: builder.query({
            query:(id)=>({
                url: `${ACADEMIC_YEARS_URL}/${id}`,
                method: 'GET'
            })
        }),
        updateAcademicYear: builder.mutation({
            query:({data,id})=>({
                url: `${ACADEMIC_YEARS_URL}/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteAcademicYear: builder.mutation({
            query:({id})=>({
                url: `${ACADEMIC_YEARS_URL}/${id}`,
                method: 'DELETE',
            })
        }),
        addStudentToAcademicYear: builder.mutation({
            query:({studentID, academicYearID})=>({
                url: `${ACADEMIC_YEARS_URL}/assign`,
                method: 'PUT',
                body: {studentID, academicYearID}
            })
        }),
    })
})

export const {useAddAcademicYearMutation, useGetAllAcademicYearsQuery, useGetAcademicYearQuery, useUpdateAcademicYearMutation, useDeleteAcademicYearMutation, useAddStudentToAcademicYearMutation} = academicYearApiSlice;