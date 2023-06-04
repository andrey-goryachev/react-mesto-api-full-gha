import AuthForm from './AuthForm';

const Register = ({ signUp }) => {
  const handleSubmit = (formValue) => {
    signUp(formValue);
  };

  return (
    <>
      <AuthForm
        onSubmit={handleSubmit}
        title={'Регистрация'}
        buttonText={'Зарегистрироваться'}
        spanBottom={true}
      />
    </>
  );
};

export default Register;
