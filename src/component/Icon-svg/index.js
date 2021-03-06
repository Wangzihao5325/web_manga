import React, { Component } from 'react'
import PropTypes from 'prop-types'
class IconSvg extends Component {
    static propTypes = {
        iconName: PropTypes.string.isRequired,
        onClick: PropTypes.func
    }
    render() {
        let { className, iconName, onClick } = this.props
        return (
            <svg className={`icon ${className}`} aria-hidden="true" onClick={onClick}>
                <use xlinkHref={`#icon-${iconName}`}></use>
            </svg>
        )
    }
}
export default IconSvg