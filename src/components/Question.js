/* eslint-disable no-unused-vars */
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuestion, selectQuestion } from '../redux/questionSlice';

const Question = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  const question = useSelector(selectQuestion);

  const { loading, data } = question;

  const renderedQuestion = question.data && question.data.map((question) => (
    <div className="card style=width: 18rem " key={question.id}>
      <div className="card-body col-3 listDoctors">

        <p className="doctor-name">{question.question_one}</p>

      </div>
    </div>
  ));

  return (
    <div className="">
      <h2>Questions</h2>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <h2>{renderedQuestion}</h2>
      <Link
        to={{
          pathname: '/answers/new',
          questionId: data.id,
        }}
        className="btn btn-info"
      >
        Add answers
      </Link>
    </div>

  );
};

export default Question;
