const Notification = ({ message, exception }) => {
  if (!message && !exception) {
    return null;
  }

  const notificationClass = exception ? 'exception' : 'successful';

  return (
    <div className={notificationClass}>
      {exception ? exception : message}
    </div>
  );
};

export default Notification;