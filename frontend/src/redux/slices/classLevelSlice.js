import {apiSlice} from "./apiSlice.js";

const CLASS_LEVEL_URL = '/api/v1/class-levels';

export const classLevelSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addClassLevel: builder.mutation({
            query:(data)=>({
                url: `${CLASS_LEVEL_URL}`,
                method: 'POST',
                body: data
            })
        }),
        getAllClassLevels:builder.query({
            query:()=>({
                url: `${CLASS_LEVEL_URL}`,
                method:'GET'
            })
        }),
        getClassLevel: builder.query({
            query:(id)=>({
                url: `${CLASS_LEVEL_URL}/${id}`,
                method: 'GET'
            })
        }),
        updateClassLevel: builder.mutation({
            query:({data, id})=>({
                url: `${CLASS_LEVEL_URL}/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteClassLevel: builder.mutation({
            query:({id})=>({
                url: `${CLASS_LEVEL_URL}/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {useAddClassLevelMutation, useGetAllClassLevelsQuery, useGetClassLevelQuery, useUpdateClassLevelMutation, useDeleteClassLevelMutation} = classLevelSlice;