/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api/api';

export const postAnswers = createAsyncThunk(
  'answers/postAnswers',
  async (
    {
      answer_many, question_id, user_id,
    },
  ) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API}/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        answer_many,
        question_id,
        user_id,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.failure);

    return data;
  },
);

export const getAnswers = createAsyncThunk(
  'answers/getAnswers',
  async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API}/answers`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  },
);

export const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  extraReducers: {
    [postAnswers.pending]: (state) => {
      state.loading = true;
    },
    [postAnswers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [postAnswers.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [getAnswers.pending]: (state) => {
      state.loading = true;
    },
    [getAnswers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getAnswers.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

  },
});

export default answersSlice.reducer;
