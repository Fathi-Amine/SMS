import {apiSlice} from "./apiSlice.js";

const QUESTION_URL = '/api/v1/questions';

export const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addQuestion: builder.mutation({
            query:({data,id})=>({
                url: `${QUESTION_URL}/${id}`,
                method: 'POST',
                body: data
            })
        }),
        getAllQuestions:builder.query({
            query:()=>({
                url: `${QUESTION_URL}/all`,
                method:'GET'
            })
        }),
        getQuestion: builder.query({
            query(id) {
                return {
                    url: `${QUESTION_URL}/${id}`,
                    method: 'GET'
                }
            }
        }),
        updateQuestion: builder.mutation({
            query:({data, id})=>{
                console.log("id", id);
                console.log("data", data);
                return {
                    url: `${QUESTION_URL}/update/${id}`,
                    method: 'PUT',
                    body: data
                }
            }
        }),
        deleteQuestion: builder.mutation({
            query:({id})=>({
            url: `${QUESTION_URL}/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {useAddQuestionMutation, useGetAllQuestionsQuery, useGetQuestionQuery, useUpdateQuestionMutation, useDeleteQuestionMutation} = questionApiSlice;
