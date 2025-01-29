import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userName: '', password: '', err: ''}

  onSubmitSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 0})
    const {history} = this.props
    history.replace('/')
  }

  loginFailed = err => {
    this.setState({err})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {user_id: userName, pin: password}
    const api = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.loginFailed(data.error_msg)
    }
  }

  getUserName = event => {
    this.setState({userName: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const token = Cookies.get('jwt_token')
    const {userName, password, err} = this.state
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="logo"
          />
          <div className="login-card">
            <h1 className="welcome-back">Welcome Back!</h1>
            <form onSubmit={this.submitForm}>
              <label htmlFor="User ID" className="label">
                User ID
              </label>
              <br />
              <input
                type="text"
                id="User ID"
                placeholder="Enter User ID"
                className="input"
                onChange={this.getUserName}
                value={userName}
              />
              <br />
              <label htmlFor="PIN" className="label">
                PIN
              </label>
              <br />
              <input
                type="password"
                placeholder="Enter PIN"
                id="PIN"
                className="input"
                onChange={this.getPassword}
                value={password}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              <p className="err">{err}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
