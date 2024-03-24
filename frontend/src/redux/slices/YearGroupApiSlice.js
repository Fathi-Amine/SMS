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
        getGroup: builder.query({
            query(id) {
                return {
                    url: `${YEAR_GROUP_URL}/${id}`,
                    method: 'GET'
                }
            }
        }),
        updateYearGroup: builder.mutation({
            query:({data, id})=>{
                console.log("id", id);
                console.log("data", data);
                return {
                    url: `${YEAR_GROUP_URL}/${id}`,
                    method: 'PUT',
                    body: data
                }
            }
        }),
        deleteYearGroup: builder.mutation({
            query:({id})=>({
            url: `${YEAR_GROUP_URL}/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {useAddYearGroupMutation, useGetAllYearGroupsQuery, useGetGroupQuery, useUpdateYearGroupMutation, useDeleteYearGroupMutation} = yearGroupApiSlice;