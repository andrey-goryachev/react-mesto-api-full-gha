import { useState } from 'react';
import { Link} from 'react-router-dom';

const AuthForm = ({ onSubmit, title, buttonText, spanBottom }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValue) &&
      setFormValue({
        email: '',
        password: '',
      });
  };

  return (
    <div className='auth'>
      <form
        className='auth-form'
        onSubmit={handleSubmit}
        name='register'
      >
        <h2 className='auth-form__title'>{title}</h2>
        <div className='auth-form__inputs'>
          <input
            className='auth-form__input'
            value={formValue.email}
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Email'
          />
          <input
            className='auth-form__input'
            value={formValue.password}
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Пароль'
          />
        </div>
        <button
          className='auth-form__button'
          type='submit'
        >
          {buttonText}
        </button>
        {spanBottom && (
          <span className='auth-form__text'>
            Уже зарегистрированы?{' '}
            <Link
              className='auth-form__link'
              to={'/sign-in'}
            >
              Войти
            </Link>
          </span>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
