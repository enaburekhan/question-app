/* eslint-disable no-unused-vars */
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getQuestion, selectQuestion } from '../redux/questionSlice';

const Question = () => {
  const dispatch = useDispatch();
  // const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  const question = useSelector(selectQuestion);
  const { loading } = question;

  //   const renderedDoctors = doctors.data && doctors.data.map((doctor) => (
  //     <div className="card style=width: 18rem " key={doctor.id}>
  //       <div className="card-body col-3 listDoctors">
  //         <img src={doctor.image} alt={doctor.name} className="card-img-top doctor-img" />
  //         <p className="doctor-name">{doctor.name}</p>
  //         <p className="doctor-specialization">{doctor.specialization}</p>
  //         <div>
  //           <p className="doctor-experience">{doctor.experience}</p>
  //           <p>experience</p>
  //         </div>
  //         <Link to={`/doctors/${doctor.id}`} className="btn btn-info ">
  //           View Doctor
  //         </Link>
  //       </div>
  //     </div>
  //   ));

  return (
    <div className="">
      <h2>Questions</h2>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <h2>{question && question.data}</h2>
    </div>

  );
};

export default Question;
