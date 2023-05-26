import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const navigate = useNavigate();
  return props.loggedIn ? <Component {...props} /> : navigate('/sign-in', { replace: true });
};

export default ProtectedRoute;
