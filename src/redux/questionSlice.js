/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api/api';

export const getQuestion = createAsyncThunk(
  'question/getQuestion',
  async (token) => {
    const response = await fetch(`${API}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response', response);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    console.log(response);
    return data;
  },
);

export const questionSlice = createSlice({
  name: 'question',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  extraReducers: {
    [getQuestion.pending]: (state) => {
      state.loading = true;
    },
    [getQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },

});

export default questionSlice.reducer;

export const selectQuestion = (state) => state.question;
