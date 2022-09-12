import './index.css'

const PasswordItem = props => {
  const {eachObj, deletePasswordItem} = props
  const {id, username, website, password, showPassword} = eachObj
  const firstLetter = website[0]
  console.log(showPassword)

  const onClickDelete = () => {
    deletePasswordItem(id)
  }

  return (
    <li className="list-item">
      <div>
        <div className="first-letter">{firstLetter}</div>
      </div>
      <div className="para-container">
        <p className="para">{website}</p>
        <p className="para">{username}</p>
        {!showPassword ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
            onClick={onClickDelete}
          />
        ) : (
          <p className="para">{password}</p>
        )}
      </div>

      <button type="button" className="button-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
          onClick={onClickDelete}
        />
      </button>
    </li>
  )
}

export default PasswordItem
