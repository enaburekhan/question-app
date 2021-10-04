import questionReducer, { getQuestion } from '../redux/questionSlice';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

test('returns initial state', () => {
  const actual = questionReducer(undefined, {});
  expect(actual).toEqual(initialState);
});

test('getQuestion.pending', () => {
  const nextState = questionReducer(initialState, getQuestion.pending);
  expect(nextState.data).toBe(initialState.data);
  expect(nextState.loading).toBe(true);
});

test('getQuestion.fulfilled', () => {
  const mockAsyncPayload = { question: { question_one: '"Is a hot dog a sandwich? Why?' } };
  const nextState = questionReducer(initialState, getQuestion.fulfilled(mockAsyncPayload));
  expect(nextState.data).toBe(mockAsyncPayload);
  expect(nextState.loading).toBe(false);
});

test('getQuestion.rejected', () => {
  const mockAsyncPayloadError = 'error';
  const nextState = questionReducer(
    initialState, getQuestion.rejected(mockAsyncPayloadError),
  );
  expect(nextState.error).toBe(mockAsyncPayloadError);
  expect(nextState.loading).toBe(false);
});
