import answersReducer, { postAnswers, getAnswers } from '../redux/answersSlice';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

test('returns initial state', () => {
  const actual = answersReducer(undefined, {});
  expect(actual).toEqual(initialState);
});

test('postAnswers.pending', () => {
  const nextState = answersReducer(initialState, postAnswers.pending);
  expect(nextState.data).toBe(initialState.data);
  expect(nextState.loading).toBe(true);
});

test('postAnswers.fulfilled', () => {
  const mockAsyncPayload = { answers: { answerMany: 'It may be a sandwich' } };
  const nextState = answersReducer(initialState, postAnswers.fulfilled(mockAsyncPayload));
  expect(nextState.loading).toBe(false);
});

test('postAnswers.rejected', () => {
  const mockAsyncPayloadError = 'error';
  const nextState = answersReducer(
    initialState, postAnswers.rejected(mockAsyncPayloadError),
  );
  expect(nextState.error).toBe(mockAsyncPayloadError);
  expect(nextState.loading).toBe(false);
});

test('getAnswers.pending', () => {
  const nextState = answersReducer(initialState, getAnswers.pending());
  expect(nextState.data).toBe(initialState.data);
  expect(nextState.loading).toBe(true);
});

test('getAnswers.fulfilled', () => {
  const mockAsyncPayload = { answers: { answerMany: 'It may be a sandwich' } };
  const nextState = answersReducer(initialState, getAnswers.fulfilled(mockAsyncPayload));
  expect(nextState.data).toBe(mockAsyncPayload);
  expect(nextState.loading).toBe(false);
});

test('getAnswers.rejected', () => {
  const mockAsyncPayloadError = 'error';
  const nextState = answersReducer(
    initialState, getAnswers.rejected(mockAsyncPayloadError),
  );
  expect(nextState.error).toBe(mockAsyncPayloadError);
  expect(nextState.loading).toBe(false);
});
