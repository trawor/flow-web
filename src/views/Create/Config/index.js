import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createI18n from './i18n'
import language from 'util/language'

import HTTPConfig from './HTTP'
import SSHConfig from './SSH'

import classes from './config.scss'

const Enums = {
  SSH: SSHConfig,
  HTTP: HTTPConfig,
}
const EnumKeys = Object.keys(Enums)

export default class ConfigFlowView extends Component {
  static propTypes = {
    params: PropTypes.shape({
      flowId: PropTypes.string.isRequired,
    }).isRequired,
    i18n: PropTypes.func.isRequired,
  }

  static defaultProps = {
    i18n: createI18n(language),
  }

  state = {
    choose: EnumKeys[0]
  }

  createHandle (path) {
    return (e) => {
      e.preventDefault()
      this.setState({ choose: path })
    }
  }

  renderNav = (path) => {
    const { choose } = this.state
    const cls = [classes.nav]
    choose === path && cls.push(classes.active)
    return <a href='#' key={path} className={cls.join(' ')}
      onClick={this.createHandle(path)}
    >
      {path}
    </a>
  }

  render () {
    const { params: { flowId }, i18n } = this.props
    const { choose } = this.state

    const child = Enums[choose]

    return <div className={classes.container}>
      <div className={classes.navbar}>
        {EnumKeys.map(this.renderNav)}
      </div>
      {React.createElement(child, { flowId, i18n: i18n.createChild(choose) })}
    </div>
  }
}