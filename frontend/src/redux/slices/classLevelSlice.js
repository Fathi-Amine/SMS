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
        updateClassLevel: builder.mutation({
            query:(data)=>({
                url: `${CLASS_LEVEL_URL}/update-class-level`,
                method: 'PATCH',
                body: data
            })
        }),
        deleteClassLevel: builder.mutation({
            query:(data)=>({
                url: `${CLASS_LEVEL_URL}/delete-class-level`,
                method: 'DELETE',
                body: data
            })
        }),
    })
})

export const {useAddClassLevelMutation, useGetAllClassLevelsQuery, useUpdateClassLevelMutation, useDeleteClassLevelMutation} = classLevelSlice;