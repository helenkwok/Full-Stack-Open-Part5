const Notification = ({ message, messageStyle }) => {
  let style = {
    marginBottom: 8,
    padding: 8,
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 4,
  }

  if (message === null) {
    return null
  }

  return (
    <>
      {messageStyle === 'notification' ?
        <div style = {{
          ...style,
          borderColor: 'green',
          color: 'green'
        }}>
          {message}
        </div>
        :
        <div style = {{
          ...style,
          borderColor: 'red',
          color: 'red'
        }}>
          {message}
        </div>
      }
    </>
  )
}

export default Notification