import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import classnames from "classnames"
import LogoText from '../../../../assets/img/logo/logo.png';
import './SidebarHeader.scss';

class SidebarHeader extends Component {
  render() {
    let {
      menuShadow
    } = this.props;
    return (
      <div className="navbar-header sidebar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item m-auto">
            <NavLink to="/" className="navbar-brand">
              <h2 className="brand-text_ mb-0">
                <img src={LogoText} alt={"LogoText"} />
              </h2>
            </NavLink>
          </li>

        </ul>
        <div
          className={classnames("shadow-bottom", {
            "d-none": menuShadow === false
          })}
        />
      </div>
    )
  }
}

export default SidebarHeader
