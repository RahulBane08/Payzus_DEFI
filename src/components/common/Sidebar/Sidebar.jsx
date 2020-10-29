import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";

import { Navmenudropdown } from "components";
import { Navmenugroup } from "components";

import PerfectScrollbar from "perfect-scrollbar";

import userImage from "assets/img/icon1.jpg";

var ps;
var currentmenu = "notset";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.state = {
      opendd: "",
      openmenu: "none",
      profilename: "Eric Nelson",
      profileimg: "",
      profileposition: "Web Developer",
    };
    this.handleOpendd = this.handleOpendd.bind(this);
    this.handlecurrent = this.handlecurrent.bind(this);
  }

  truncate(str) {
    return str.length > 10
      ? str.substring(0, 6) + "..." + str.substring(38, 42)
      : str;
  }

  handlecurrent(currentmenu) {
    //console.log("handlecurrent"+currentmenu);
    if (this.state.opendd !== "") {
      currentmenu = "";
    }
  }

  handleOpendd(open) {
    currentmenu = "";
    if (this.state.opendd === open) {
      this.setState({
        opendd: "",
      });
    } else {
      this.setState({
        opendd: open,
      });
    }
    //currentmenu = "";
    //console.log(open + this.state.opendd);
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
      ? " active"
      : "";
  }
  componentDidMount() {
    if (this.props.admintype === "general") {
      this.setState({
        profileposition: "",
        profileimg: "",
        profilename: "",
      });
    }

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const children = (child, parent) => {
      var links = [];
      if (child) {
        for (var i = 0; i < child.length; i++) {
          links.push(
            <li key={i}>
              <NavLink
                to={child[i].path}
                className="nav-link"
                activeClassName="active"
              >
                <span>{child[i].name}</span>
              </NavLink>
            </li>
          );
          //console.log(child[i].parent + this.props.location.pathname + child[i].path);
          if (this.props.location.pathname === child[i].path) {
            //console.log("match found " + child[i].parent);
            if (currentmenu === "notset" && this.state.opendd === "") {
              currentmenu = parent; //child[i].parent;
            }
          }
          if (this.props.location.pathname === "/") {
            currentmenu = "dashboards";
          }
        }

        //console.log(currentmenu);
        //console.log(this.props.location.pathname);
        //console.log(parent);
        return <Nav>{links}</Nav>;
      }
    };

    return (
      <div
        className="sidebar menubar"
        data-color="white"
        style={{ height: "100%" }}
      >
        <div className="logo"></div>

        <div className="sidebar-wrapper" ref="sidebar">
          <div className="profile-info row">
            <div className="profile-image col-4">
              {/* <img alt="" src={userImage} className="img-fluid avatar-image" style={{background:"transparent"}}/> */}

              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="120" height="120" rx="25" fill="white" />
                <g filter="url(#filter0_d)">
                  <path
                    d="M60.0069 10C45.7211 10 34.0432 21.678 34.0432 35.9638C34.0432 50.2496 45.7211 61.9275 60.0069 61.9275C74.2927 61.9275 85.9707 50.2496 85.9707 35.9638C85.9707 21.678 74.2927 10 60.0069 10Z"
                    fill="#212EB8"
                  />
                  <path
                    d="M104.565 82.6758C103.885 80.975 102.978 79.3878 101.957 77.9138C96.7418 70.204 88.6921 65.102 79.6217 63.8548C78.4881 63.7415 77.2409 63.9681 76.3338 64.6484C71.5718 68.1632 65.903 69.9772 60.0072 69.9772C54.1113 69.9772 48.4425 68.1632 43.6806 64.6484C42.7734 63.9681 41.5263 63.628 40.3926 63.8548C31.3223 65.102 23.1591 70.204 18.0571 77.9138C17.0367 79.3878 16.1296 81.0885 15.4494 82.6758C15.1094 83.3561 15.2227 84.1497 15.5627 84.8301C16.4698 86.4173 17.6035 88.0048 18.6239 89.3652C20.2112 91.5195 21.9119 93.4468 23.8394 95.2608C25.4266 96.8481 27.2407 98.322 29.0549 99.796C38.0117 106.485 48.7828 110 59.8939 110C71.005 110 81.776 106.485 90.7329 99.796C92.5469 98.4355 94.3609 96.8481 95.9483 95.2608C97.7624 93.4468 99.5764 91.5193 101.164 89.3652C102.298 87.8913 103.318 86.4173 104.225 84.8301C104.792 84.1497 104.905 83.3559 104.565 82.6758Z"
                    fill="#212EB8"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d"
                    x="11.2441"
                    y="10"
                    width="97.5121"
                    height="108"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="profile-details col-8">
              <h3>
                <span style={{ fontSize: "20px", color: "white" }}>
                  {this.truncate(this.props.account)}
                </span>
                <span className="profile-status online"></span>
              </h3>
              <p className="profile-title">
                {this.props.account === "" ? (
                  <span style={{ color: "white" }}>MetaMask</span>
                ) : (
                  <span style={{ color: "white" }}>MetaMask</span>
                )}
              </p>
            </div>
          </div>

          <Nav className="navigation navbar-light">
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null;
              if (prop.type === "child") return null;
              if (prop.type === "navgroup")
                return <Navmenugroup name={prop.name} key={key}></Navmenugroup>;
              if (prop.type === "dropdown")
                return (
                  <li
                    className={
                      prop.parentid +
                      " " +
                      ((prop.parentid === currentmenu &&
                        prop.parentid !== "" &&
                        prop.parentid !== "multipurpose") ||
                      this.state.opendd === prop.name
                        ? "active"
                        : "") +
                      " nav-parent "
                    }
                    data-toggle="collapse"
                    key={key}
                  >
                    <a
                      to={prop.path}
                      className="nav-link"
                      onClick={() => this.handleOpendd(prop.name)}
                      href="#!"
                    >
                      <i className={"i-" + prop.icon}></i>
                      <p>{prop.name}</p>
                      <span className="badge">{prop.badge}</span>
                      <span className={"arrow i-arrow-left"}></span>
                    </a>
                    {children(prop.child, prop.parentid)}
                  </li>
                );

              if (prop.type === "dropdown-backup")
                return (
                  <Navmenudropdown
                    name={prop.name}
                    icon={prop.icon}
                    path={prop.path}
                    badge={prop.badge}
                    child={prop.child}
                    key={key}
                    openclass={
                      this.state.opendd === prop.name ? "activethis" : ""
                    }
                    onClick={() => this.handleOpendd(prop.name)}
                  ></Navmenudropdown>
                );
              return (
                <li
                  className={this.activeRoute(prop.path) + " nav-parent "}
                  key={key}
                  onClick={() => this.handleOpendd(prop.name)}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={"i-" + prop.icon}></i>
                    <p>{prop.name}</p>
                    <span className="badge">{prop.badge}</span>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
