import AuthForm from './AuthForm';

const Login = ({ signIn }) => {
  const handleSubmit = (formValue) => {
    signIn(formValue);
  };

  return (
    <>
      <AuthForm
        onSubmit={handleSubmit}
        title={'Вход'}
        buttonText={'Войти'}
        spanBottom={false}
      />
    </>
  );
};

export default Login;
