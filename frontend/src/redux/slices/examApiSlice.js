import {apiSlice} from "./apiSlice.js";

const EXAM_URL = '/api/v1/exams'

const examApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllExams: builder.query({
            query: () => ({
                url: `${EXAM_URL}`,
                method: 'GET'
            }),
        }),
        getExam: builder.query({
            query: (id) => ({
                url: `${EXAM_URL}/${id}`,
                method: 'GET'
            }),
        }),
        createExam: builder.mutation({
            query: (body) => ({
                url: "exams",
                method: "POST",
                body,
            }),
        }),
        updateExam: builder.mutation({
            query: ({id, body}) => ({
                url: `exams/${id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteExam: builder.mutation({
            query: (id) => ({
                url: `exams/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});


export const {
    useGetAllExamsQuery,
    useGetExamQuery,
    useCreateExamMutation,
    useUpdateExamMutation,
    useDeleteExamMutation,
} = examApiSlice;