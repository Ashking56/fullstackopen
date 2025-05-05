const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="succesfull">
        {message}
      </div>
    )
}
  export default Notification