import Form from './Form';
import Popup from './Popup';

function PopupWithForm({ title, name, isOpen, onClose, buttonText, onSubmit, children }) {
  return (
    <>
      <Popup
        isOpen={isOpen}
        name={name}
        onClose={onClose}
      >
        <Form
          handleSubmit={onSubmit}
          name={name}
          title={title}
          buttonText={buttonText}
        >
          {children}
        </Form>
      </Popup>
    </>
  );
}

export default PopupWithForm;
