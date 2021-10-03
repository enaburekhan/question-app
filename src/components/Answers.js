import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getAnswers } from '../redux/answersSlice';

const Answers = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);

  const answers = useSelector((state) => state.answers);

  const { data, loading } = answers;
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (user) {
      dispatch(getAnswers(token));
    }
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/Login" />;
  }

  return (
    <div className="card text-center">
      <h3>Answers</h3>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <div className="card-body d-flex flex-wrap">
        {(!loading && data.length === 0)
        && (
        <h4>
          You do not have any answer. Submit one
          <Link to="/answers/new">
            here
          </Link>
        </h4>
        )}
      </div>
      {
      data && data.map((answer) => (
        <Link to={`/answers/${answer.id}`} key={answer.id}>
          <div className="card m-4">
            <div className="card-body">
              <p>

                {answer.answer_many}
              </p>
            </div>
          </div>
        </Link>
      ))
  }
    </div>

  );
};

export default Answers;
