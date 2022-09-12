import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const initialPasswordList = []

class PasswordManager extends Component {
  state = {
    passwordsList: initialPasswordList,
    website: '',
    username: '',
    password: '',
    showPassword: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState(() => ({website: event.target.value}))
  }

  onChangeUsername = event => {
    this.setState(() => ({username: event.target.value}))
  }

  onChangePassword = event => {
    this.setState(() => ({password: event.target.value}))
  }

  onClickAdd = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newObj = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    console.log(newObj)
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newObj],
      website: '',
      username: '',
      password: '',
      showPassword: prevState.showPassword,
    }))
  }

  deletePasswordItem = id => {
    const {passwordsList} = this.state
    const newPasswordList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: newPasswordList})
  }

  onChangeCheckbox = () => {
    const {passwordsList} = this.state
    const newPasswordList = passwordsList.map(each => ({
      ...each,
      showPassword: !each.showPassword,
    }))
    this.setState(() => ({
      passwordsList: newPasswordList,
    }))
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {passwordsList, website, username, password, searchInput} = this.state

    const filteredPasswordList = passwordsList.filter(each =>
      each.website.startsWith(searchInput),
    )

    const noPasswords = filteredPasswordList.length === 0
    return (
      <div className="bg-container">
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="title"
          />
        </div>
        <form className="card-container">
          <div className="left">
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logo"
              />
              <input
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
                type="text"
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="logo"
              />
              <input
                placeholder="Enter UserName"
                onChange={this.onChangeUsername}
                value={username}
                type="text"
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logo"
              />
              <input
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
                type="password"
              />
            </div>
            <div className="button-container">
              <button
                className="button"
                type="submit"
                onClick={this.onClickAdd}
              >
                Add
              </button>
            </div>
          </div>
          <div className="right">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="right-image"
            />
          </div>
        </form>

        <div className="card-container2">
          <div className="top-container">
            <div className="password-count">
              <h1>Your Passwords</h1>
              <p className="label">{passwordsList.length}</p>
            </div>
            <div className="search-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="logo"
              />
              <input
                placeholder="search"
                type="search"
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr />
          <div className="show-password">
            <input
              type="checkbox"
              className="check-box"
              id="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox" className="para">
              Show passwords
            </label>
          </div>
          {noPasswords ? (
            <div className="no-password">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="right-image"
              />
              <p className="para">No Passwords</p>
            </div>
          ) : (
            <ul className="unordered-list">
              {filteredPasswordList.map(each => (
                <PasswordItem
                  eachObj={each}
                  key={each.id}
                  deletePasswordItem={this.deletePasswordItem}
                  showPassword={this.showPassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
