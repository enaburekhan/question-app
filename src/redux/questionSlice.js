/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api/api';

export const getQuestions = createAsyncThunk(
  'questions/getQuestions',
  async (token) => {
    const response = await fetch(`${API}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  },
);

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  extraReducers: {
    [getQuestions.pending]: (state) => {
      state.loading = true;
    },
    [getQuestions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },

});

export default questionsSlice.reducer;

export const selectQuestions = (state) => state.questions;
