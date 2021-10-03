/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postAnswers } from '../redux/answersSlice';
import { getQuestion } from '../redux/questionSlice';

const NewAnswer = () => {
  const [answerMany, setAnswerMany] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.question);
  console.log('data', data);

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  const onChangeQuestionId = (e) => {
    const questionId = e.target.value;
    setQuestionId(questionId);
  };

  const onChangeAnswerMany = (e) => {
    const answerMany = e.target.value;
    setAnswerMany(answerMany);
  };

  // const question_id = questionId;
  const answer_many = answerMany;

  if (!userData) {
    return <Redirect to="/Login" />;
  }

  const { user_id } = userData;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    // eslint-disable-next-line no-underscore-dangle

    dispatch(postAnswers({
      user_id, answer_many,
    }))
      .then(() => {
        setSuccessful(true);
        alert.show('Answer created', {
          type: 'success',
          timeout: 2000,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setSuccessful(false);
      });
  };
  console.log('answer_many', answer_many);
  // console.log('questionId', questionId);
  console.log('user_id', user_id);

  const options = data && (
    data.map((question) => (
      <option
        key={question.id}
        value={question.id}
      >
        {question.question_one}
      </option>
    ))
  );

  if (successful) {
    return <Redirect to="/answers" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group create">
            <label htmlFor="doctorId">
              Question:
              <select
                value={questionId}
                onChange={onChangeQuestionId}
              >

                {loading ? <option>Loading..</option> : options }
              </select>
            </label>
          </div>
          { !successful && (
          <div>
            <div className="form-group create">
              <label htmlFor="answerMany" className="control-label">
                Answer
                <input
                  type="text"
                  className="form-control"
                  name="answerMany"
                  id="answerMany"
                  required
                  value={answerMany}
                  onChange={onChangeAnswerMany}
                />
              </label>
            </div>

            <div className="form-group create">
              <button className="btn btn-primary btn-block" disabled={loading} type="submit">
                {loading && (
                <span className="spinner-border spinner-border-sm" />
                )}
                <span>submit</span>
              </button>
            </div>
          </div>
          )}
          {error && (
          <div className="form-group">
            <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
              {error}
            </div>
          </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default NewAnswer;
