import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Home extends Component {
  onClickLogout = () => {
    const {history} = this.props
    history.replace('/ebank/login')
    Cookies.remove('jwt_token')
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/ebank/login" />
    }

    return (
      <div className="home-bg">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
          />
          <button
            type="button"
            className="log-out"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="digital-con">
          <h1 className="heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card"
          />
        </div>
      </div>
    )
  }
}

export default Home
