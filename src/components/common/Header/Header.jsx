import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";

import dashboardRoutes from "routes/general.jsx";

import firebaseApp from "../../../firebase-config";
import MetamaskIcon from "assets/img/MetaMask-Icon.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      userddOpen: false,
      searchOpen: false,
      messagesddOpen: false,
      notificationsddOpen: false,
      color: "primary",
      profilename: "Eric Nelson",
      profileimg: "",
      accounts: "",
      balance: "",
    };
    this.toggle = this.toggle.bind(this);
    this.userddToggle = this.userddToggle.bind(this);
    this.messagesddToggle = this.messagesddToggle.bind(this);
    this.notificationsddToggle = this.notificationsddToggle.bind(this);
    this.searchToggle = this.searchToggle.bind(this);
  }

  truncate(str) {
    return str.length > 10
      ? str.substring(0, 6) + "..." + str.substring(38, 42)
      : str;
  }

  truncateBalance(str) {
    return str.length > 5 ? str.substring(0, 10) : str;
  }

  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "primary",
      });
    } else {
      this.setState({
        color: "white",
      });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  userddToggle(e) {
    this.setState({
      userddOpen: !this.state.userddOpen,
    });
  }
  searchToggle() {
    //this.refs.searchbarToggle.classList.toggle('toggled');
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
    //console.log(this.state.searchOpen);
    //this.refs.searchbarToggle.classList.toggle('opened');
  }
  messagesddToggle(e) {
    this.setState({
      messagesddOpen: !this.state.messagesddOpen,
    });
  }
  notificationsddToggle(e) {
    this.setState({
      notificationsddOpen: !this.state.notificationsddOpen,
    });
  }
  getBrand() {
    var name;
    dashboardRoutes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }
  openSidebar() {
    document.documentElement.classList.toggle("nav-toggle");
    this.refs.sidebarToggle.classList.toggle("toggled");

    // close chat bar if open on smaller screens
    if (window.innerWidth < 993) {
      document.documentElement.classList.remove("nav-toggle-chat");
      // this.refs.chatToggle.classList.remove('toggled');
    }
  }
  openChat() {
    document.documentElement.classList.toggle("nav-toggle-chat");
    // this.refs.chatToggle.classList.toggle('toggled');

    // close menu bar if open on smaller screens
    if (window.innerWidth < 993) {
      document.documentElement.classList.remove("nav-toggle");
      this.refs.sidebarToggle.classList.remove("toggled");
    }
  }
  toggle_grid() {
    document.documentElement.classList.toggle("toggle-grid");
  }

  openStyle() {
    document.documentElement.classList.toggle("nav-toggle-style");
    // this.refs.chatToggle.classList.toggle('toggled');

    // close menu bar if open on smaller screens
    /*if(window.innerWidth < 993){
            document.documentElement.classList.remove('nav-toggle');
            this.refs.sidebarToggle.classList.remove('toggled');
        }*/
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "primary",
      });
    } else {
      this.setState({
        color: "primary",
      });
    }
  }
  componentDidMount() {
    if (this.props.navtype === "mini") {
      document.documentElement.classList.add("nav-toggle");
      this.refs.sidebarToggle.classList.add("toggled");
    } else {
      document.documentElement.classList.remove("nav-toggle");
      this.refs.sidebarToggle.classList.remove("toggled");
    }
    window.addEventListener("resize", this.updateColor.bind(this));

    if (this.props.admintype === "general") {
      this.setState({
        profileimg: "",
        profilename: "",
      });
    }
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-toggle") !== -1
    ) {
      document.documentElement.classList.toggle("nav-toggle");
      this.refs.sidebarToggle.classList.toggle("toggled");
    }
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-toggle-chat") !== -1
    ) {
      document.documentElement.classList.toggle("nav-toggle-chat");
      // this.refs.chatToggle.classList.toggle('toggled');
    }
  }

  handleLogout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(function () {
        window.location.href = "/login";
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top "
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref="sidebarToggle"
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <i className="i-menu"></i>
              </button>
            </div>

            <h2 className="eth-value">
              {this.props.account === "" ? (
                <p>0 ETH</p>
              ) : (
                this.truncateBalance(this.props.balance) + " ETH"
              )}
            </h2>

            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>

          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="navbar-right"
            style={{ marginRight: "20px" }}
          >
            {/* <img src="/assets/img/logo-mini.png" alt="react-logo" className="avatar-image" />  */}

            <Nav navbar>
              <Dropdown
                nav
                isOpen={this.state.userddOpen}
                toggle={(e) => this.userddToggle(e)}
                className="userdd"
              >
                <DropdownToggle caret nav>
                  <img
                    src={MetamaskIcon}
                    alt="Metamask"
                    className="avatar-image"
                    style={{ height: "25px" }}
                  />
                  {/* <span>{this.truncate(this.props.account)}</span>
                                   <i class="fa fa-user" aria-hidden="true" style={{marginLeft:"20px"}}></i> */}
                </DropdownToggle>
                <DropdownMenu right>
                  {/* <DropdownItem tag="a"><i className="i-wrench" href="#!"></i> Settings</DropdownItem>
                                    <DropdownItem tag="a"><i className="i-user" href="#!"></i> Profile</DropdownItem> */}
                  <DropdownItem tag="button" onClick={this.props.connectWallet}>
                    <i className="i-info"></i>
                    {this.props.walletConnected ? (
                      <p>Change Wallet</p>
                    ) : (
                      <p>Connect Wallet</p>
                    )}
                  </DropdownItem>

                  <DropdownItem
                    tag="button"
                    className=""
                    onClick={this.props.disconnect}
                  >
                    <i className="i-info"></i> Disconnect Wallet
                  </DropdownItem>
                  <DropdownItem tag="button" onClick={this.handleLogout}>
                    <i className="i-lock"></i> LogOut
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* <NavItem>
                                <div className="navbar-toggle chat-toggle">
                                    <button type="button" ref="chatToggle" className="navbar-toggler" onClick={() => this.openChat()}>
                                            <i className="i-bubbles"></i>
                                            <span className="badge badge-pill badge-primary">9</span>
                                    </button>
                                </div>

                                


                            </NavItem> */}
            </Nav>
            <div
              className="screensize"
              onClick={() => this.toggle_grid()}
            ></div>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
