export default showContactMessage = ({ message, setMessage }) => {
  setMessage(message);
  setTimeout(() => {
    setMessage("");
  }, 5000);
};