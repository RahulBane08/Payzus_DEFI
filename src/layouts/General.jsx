import React from "react";
// javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch, Redirect } from "react-router-dom";

// import { Router,Route } from "react-router";
import { createBrowserHistory } from "history";

import { Footer, ChatSidebar, Stylebar } from "components";
import Header from "../components/common/Header/Header";
import Sidebar from "../components/common/Sidebar/Sidebar";

import General from "../views/general/Dashboard/General";
import UITables from "../views/general/Tables/Tables.jsx";
import GetDetails from "../views/general/Forms/GetDetails.jsx";
import FormPremade from "../views/general/Forms/Premade.jsx";
import UIBSDatatable from "../views/general/Tables/BSDatatable.jsx";
import ReferSomeone from "../views/general/Forms/ReferSomeone.jsx";

import dashboardRoutes from "routes/general.jsx";
import {
  topbarStyle,
  menuStyle,
  menuType,
  topbarType,
  navWidth,
} from "variables/settings/general.jsx";
import Web3 from "web3";
import swal from "sweetalert";
import generateElement from "../generateElement";
import getWeb3 from "../getWeb3";
import firebaseApp from "../firebase-config";
import WithdrawUSDT from "../views/general/USDT/WithdrawUSDT";
//var ps;

const history = createBrowserHistory();

class GeneralLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuColor: menuStyle,
      topbarColor: topbarStyle,
      menuType: menuType,
      topbarType: topbarType,
      account: "0x00",
      balance: "",
      web3: null,
      walletConnected: false,
      uid: null,
    };
    this.menuSettings = this.menuSettings.bind(this);
    this.topbarSettings = this.topbarSettings.bind(this);
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const accBalance = await web3.eth.getBalance(accounts[0]);

      // this.setState({account:accounts[0]})

      const balance = web3.utils.fromWei(accBalance, "ether");

      // this.setState({balance})

      await firebaseApp.auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;

          this.setState({ uid });
        }
        // console.log(this.state.uid)
      });
    } catch (error) {
      console.log(error);
    }
  };

  connectWallet = async () => {
    if (typeof web3 !== "undefined") {
      const web3 = new Web3(Web3.givenProvider);
      const network = await web3.eth.net.getId();
      console.log(network);
      if (network === 1) {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        if (account === undefined) {
          await swal({
            content: generateElement(
              `MetaMask is locked. Please Unlock MetaMask and try again`
            ),
            icon: "error",
          });
          return;
        }

        await this.setState({ account, walletConnected: true });
        // console.log(this.state.account)

        const accBalance = await web3.eth.getBalance(accounts[0]);
        const balance = web3.utils.fromWei(accBalance, "ether");

        this.setState({ balance });
        // console.log(this.state.balance)
      } else {
        swal({
          content: generateElement(`Please connect to Mainnet`),
          icon: "error",
        });
      }
    } else {
      swal({
        content: generateElement(`Please Install MetaMask first`),
        icon: "error",
      });
    }
  };

  disconnect = () => {
    this.setState({ account: "", walletConnected: false });
  };

  menuSettings(val1, val2) {
    this.setState({
      menuColor: "transparent",
      menuType: "white",
    });
  }
  topbarSettings(val1, val2) {
    this.setState({
      topbarColor: "transparent",
      topbarType: "light",
    });
  }

  componentWillUnmount() {}
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.refs.mainPanel.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  render() {
    return (
      <div
        className="wrapper"
        ref="themeWrapper"
        data-menu={this.state.menuColor}
        data-topbar={this.state.topbarColor}
        data-menutype={this.state.menuType}
        data-topbartype={this.state.topbarType}
      >
        <div
          className="wrapper"
          ref="themeWrapper"
          data-menu="white"
          data-topbar={this.state.topbarColor}
          data-menutype={this.state.menuType}
          data-topbartype={this.state.topbarType}
        >
          <Header
            {...this.props}
            navtype={navWidth}
            admintype={"general"}
            account={this.state.account}
            disconnect={this.disconnect}
            balance={this.state.balance}
            web3={this.state.web3}
            connectWallet={this.connectWallet}
            walletConnected={this.state.walletConnected}
          />
          <Sidebar
            {...this.props}
            routes={dashboardRoutes}
            admintype={"general"}
            account={this.state.account}
          />
          <div className="main-panel" ref="mainPanel">
            <Switch history={history}>
              <Route
                exact
                path="/app/dashboard"
                name="dashboard"
                render={(props) => <General {...props} uid={this.state.uid} />}
              />
              <Route
                exact
                path="/app/history"
                name="history"
                render={(props) => <UITables {...props} uid={this.state.uid} />}
              />
              <Route
                exact
                path="/app/market"
                name="market"
                render={(props) => (
                  <UIBSDatatable {...props} uid={this.state.uid} />
                )}
              />
              <Route
                exact
                path="/app/kyc"
                name="kyc"
                render={(props) => (
                  <GetDetails {...props} uid={this.state.uid} />
                )}
              />
              <Route
                exact
                path="/app/buy-payzus"
                name="buy payzus"
                render={(props) => (
                  <FormPremade {...props} uid={this.state.uid} />
                )}
              />
              <Route
                exact
                path="/app/usdt"
                name="USDT"
                render={(props) => (
                  <WithdrawUSDT {...props} uid={this.state.uid} />
                )}
              />
              <Route
                exact
                path="/app/Refer"
                name="refer"
                render={(props) => (
                  <ReferSomeone {...props} uid={this.state.uid} />
                )}
              />

              {/* {
                            dashboardRoutes.map((prop,key) => {
                                if(prop.collapse){
                                    return prop.views.map((prop2,key2) => {
                                        return (
                                            <Route path={prop2.path} component={prop2.component} key={key2} />
                                        );
                                    })
                                }
                                if(prop.redirect)
                                    return (
                                        <Redirect from={prop.path} to={prop.pathTo} key={key} />
                                    );
                                return (
                                    <Route path={prop.path} component={prop.component} key={key} />
                                );
                            })
                        } */}
            </Switch>
            <Footer fluid />
          </div>
          {/* <ChatSidebar {...this.props} routes={dashboardRoutes} chatwidth={chatWidth}  chattype={chatType}/> */}
          {/* <Stylebar menuSettings={this.menuSettings} topbarSettings={this.topbarSettings} /> */}
        </div>
      </div>
    );
  }
}

export default GeneralLayout;
