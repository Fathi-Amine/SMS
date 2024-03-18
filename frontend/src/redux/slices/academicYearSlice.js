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
        updateAcademicYear: builder.mutation({
            query:(data)=>({
                url: `${ACADEMIC_YEARS_URL}/update-academic-year`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteAcademicYear: builder.mutation({
            query:(data)=>({
                url: `${ACADEMIC_YEARS_URL}/delete-academic-year`,
                method: 'DELETE',
                body: data
            })
        }),
    })
})

export const {useAddAcademicYearMutation, useGetAllAcademicYearsQuery, useUpdateAcademicYearMutation, useDeleteAcademicYearMutation} = academicYearApiSlice;