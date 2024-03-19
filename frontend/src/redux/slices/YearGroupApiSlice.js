import {apiSlice} from "./apiSlice.js";

const YEAR_GROUP_URL = '/api/v1/year-groups';

export const yearGroupApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addYearGroup: builder.mutation({
            query:(data)=>({
                url: `${YEAR_GROUP_URL}`,
                method: 'POST',
                body: data
            })
        }),
        getAllYearGroups:builder.query({
            query:()=>({
                url: `${YEAR_GROUP_URL}`,
                method:'GET'
            })
        }),
        updateYearGroup: builder.mutation({
            query:(data)=>({
                url: `${YEAR_GROUP_URL}/update-year-group`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteYearGroup: builder.mutation({
            query:(data)=>({
                url: `${YEAR_GROUP_URL}/delete-year-group`,
                method: 'DELETE',
                body: data
            })
        }),
    })
})

export const {useAddYearGroupMutation, useGetAllYearGroupsQuery, useUpdateYearGroupMutation, useDeleteYearGroupMutation} = yearGroupApiSlice;