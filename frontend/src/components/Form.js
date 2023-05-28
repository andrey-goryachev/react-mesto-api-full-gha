const Form = ({handleSubmit, name, title, buttonText, children}) => {
  return (
    <>
      <h2 className='popup__title'>{title}</h2>
      <form
        onSubmit={handleSubmit}
        className='popup__form'
        name={`edit-${name}`}
      >
        {children}
        <button
          className='popup__submit button button_opacity_light'
          type='submit'
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default Form;
