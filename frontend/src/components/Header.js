import { Link, Routes, Route, useNavigate } from 'react-router-dom';

function Header({ logoPath, userEmail }) {
  const navigate = useNavigate();
  const handleLoginOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  };

  return (
    <header className='header'>
      <img
        className='header__logo'
        src={logoPath}
        alt='Логотип Место Россия'
      />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <span className='header__user'>{userEmail}</span>
              <Link
                className='header__link'
                to={'/sign-in'}
                onClick={handleLoginOut}
              >
                Выйти
              </Link>
            </>
          }
        />
        <Route
          path='/sign-in'
          element={
            <Link
              className='header__link'
              to={'/sign-up'}
            >
              Регистрация
            </Link>
          }
        />
        <Route
          path='/sign-up'
          element={
            <Link
              className='header__link'
              to={'/sign-in'}
            >
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
