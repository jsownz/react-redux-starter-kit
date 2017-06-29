import React, { Component } from 'react'
// import { browserHistory } from 'react-router'
import Character from '../../Characters/components/Characters'
import './HomeView.scss'

class HomeView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      auth_token: ''
    }
    let authToken = localStorage.getItem('swauthtoken')
    if (authToken !== null) {
      this.state = {
        auth_token: authToken
      }
      this.getCharacters()
    }
  }

  sendLogin () {
    fetch('http://localhost:3000/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        auth_token: responseJson.auth_token
      })
      localStorage.setItem('swauthtoken', this.state.auth_token)
      this.getCharacters()
    })
    .catch((error) => {
      console.error(error)
    })
  }

  getCharacters () {
    fetch('http://localhost:3000/my_user.json', {
      method: 'GET',
      headers: {
        'Authorization': this.state.auth_token
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson)
      this.setState({
        characters: responseJson
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  render () {
    let mainBody = (
      <div>
        <input type='text' id='login-email' placeholder='email' />
        <input type='password' id='login-password' placeholder='password' />
        <button id='x-btn-send-login' onClick={() => this.sendLogin()}>Login</button>
      </div>
    )
    if (this.state.auth_token) {
      mainBody = (
        <div>
          Loading...
        </div>
      )
    }
    if (this.state.characters) {
      let charactersList = this.state.characters.map(function (userChar, i) {
        // console.log(userChar)
        return <Character key={i} name={userChar.character.name} />
      })
      mainBody = (
        <div>
          Characters
          { charactersList }
        </div>
      )
    }
    return (
      <div>
        { mainBody }
      </div>
    )
  }
}

export default HomeView
