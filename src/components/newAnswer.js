/* eslint-disable camelcase */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postAnswers } from '../redux/answersSlice';

const NewAnswer = () => {
  const [answerMany, setAnswerMany] = useState('');
  const [questionId] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: userData, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //   const { data, error } = useSelector((state) => state.question);

  //   const onChangeQuestionId = (e) => {
  //     const questionId = e.target.value;
  //     setQuestionId(questionId);
  //   };

  const onChangeAnswerMany = (e) => {
    const answerMany = e.target.value;
    setAnswerMany(answerMany);
  };

  const question_id = questionId;
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
      user_id, question_id, answer_many,
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

  //   const options = data && (
  //     data.map((question) => (
  //       <option
  //         key={question.id}
  //         value={question.id}
  //       >
  //         {question.answerMany}
  //       </option>
  //     ))
  //   );

  if (successful) {
    return <Redirect to="/answers" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit}>
          { !successful && (
          <div>
            <div className="form-group create">
              <label htmlFor="answerMany" className="control-label">
                AnswerMany
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
            {/* <div className="form-group create">
              <label htmlFor="doctorId">
                Select from list:
                <select
                  value={doctorId}
                  onChange={onChangeDoctorId}
                >

                  {loading ? <option>Loading..</option> : options }
                </select>
              </label>
            </div> */}
            <div className="form-group create">
              <button className="btn btn-primary btn-block" disabled={loading} type="submit">
                {loading && (
                <span className="spinner-border spinner-border-sm" />
                )}
                <span>Submit</span>
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
