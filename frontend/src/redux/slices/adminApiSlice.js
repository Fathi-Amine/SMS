import {apiSlice} from "./apiSlice.js";

const USERS_URL = '/api/v1/admins'

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query:(arg)=> ({
                url: `${USERS_URL}/logout`,
                method: 'DELETE'
            })
        }),
        getAllAdmins:builder.query({
            query:()=>({
                url: `${USERS_URL}`,
                method:'GET'
            })
        }),
        /*updateUser: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/users/updateUser`,
                method: 'PATCH',
                body: data
            })
        }),
        verifyEmail: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/mail/verify-email`,
                method: 'POST',
                body: data
            })
        }),
        forgotPassword: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/forgotPassword`,
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/resetPassword`,
                method: 'POST',
                body: data
            })
        }),

        getAllUsers:builder.query({
            query:()=>({
                url: `${USERS_URL}/users`,
                method:'GET'
            })
        })*/
    })
})





export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useGetAllAdminsQuery /*useUpdateUserMutation,useForgotPasswordMutation,useResetPasswordMutation,useVerifyEmailMutation*/} = adminApiSlice