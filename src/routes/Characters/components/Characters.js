import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import './Character.scss'

class Character extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (<div className='character'>
      { this.props.name }
    </div>)
  }
}

Character.propTypes = {
  name: PropTypes.string.isRequired
}

export default Character
