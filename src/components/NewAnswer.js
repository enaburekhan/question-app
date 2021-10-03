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
  const [message, setMessage] = useState('');
  const [invalid, setInvalid] = useState('');
  const { data: userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.question);

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

  const answer_many = answerMany;

  if (!userData) {
    return <Redirect to="/Login" />;
  }

  const { user_id } = userData;

  const show = setTimeout(() => {
    if (successful) {
      setMessage('');
    }
    return null;
  }, 1000);

  const nonValidAnswers = ['yes', "I don't know", 'no', "that's fine"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    if (nonValidAnswers.includes(answerMany)) {
      setInvalid('invalid answers');
      setTimeout(() => {
        setInvalid('');
      }, 1000);
      return;
    }

    // eslint-disable-next-line no-underscore-dangle

    dispatch(postAnswers({
      user_id, answer_many,
    }))
      .then(() => {
        setSuccessful(true);
        setMessage('Answer created');
        show();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setSuccessful(false);
      });
  };

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

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group create">
            <label htmlFor="questionId">
              Question:
              <select
                value={questionId}
                onChange={onChangeQuestionId}
              >

                {loading ? <option>Loading..</option> : options }
              </select>
            </label>
          </div>
          <div>

            <div className="form-group create">
              <p>{message}</p>
              <p>{invalid}</p>
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
