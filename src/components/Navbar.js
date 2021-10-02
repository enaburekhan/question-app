import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const NavBar = () => {
  const { data: user } = useSelector((state) => state.user);
  const token = localStorage.getItem('token');

  return (

    <nav className="nav">
      <p>Ask Question</p>

      <div className="nav-home d-flex flex-column justify-content-between align-items-center  m-4">
        <div>
          {user && user.username}
          {token ? (
            <div>
              <Link to="/questions" className="one nav-link active">Question</Link>
              {/* <Link to="/appointments" className="appoint-md nav-link">Appointments</Link> */}
              <Logout />
            </div>
          ) : (
            <div className="nav-home">
              <Link to="/Signup" className="nav-link">Signup</Link>
              <Link to="/Login" className="nav-link">Login</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
