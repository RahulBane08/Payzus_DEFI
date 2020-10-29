import React from 'react';
// javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from 'perfect-scrollbar';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { createBrowserHistory } from "history";

import Header from "../components/common/Header/LockedHeader";
import Footer from "../components/common/Footer/Footer";
import Sidebar from "../components/common/Sidebar/LockSidebar"

import lockedRoutes from 'routes/locked.jsx';
import { topbarStyle, menuStyle, menuType, topbarType, navWidth } from 'variables/settings/general.jsx';

//var ps;
const history = createBrowserHistory();
class GeneralLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            menuColor: menuStyle,
            topbarColor: topbarStyle,
            menuType: menuType,
            topbarType: topbarType,
            // account:"",
            // balance:"",
            // web3:null
        };
        this.menuSettings = this.menuSettings.bind(this);
        this.topbarSettings = this.topbarSettings.bind(this);
    }
    
    // componentDidMount = async() => {

    //     try{
    //         const web3 = await getWeb3();
    //         const accounts = await web3.eth.getAccounts();
    
    //         const accBalance = await web3.eth.getBalance(accounts[0]);
            
    //         this.setState({account:accounts[0]})

    //         const balance = web3.utils.fromWei(accBalance,"ether")

    //         this.setState({balance})
            
    //     }catch(error){
    //         console.log(error)
    //     }
       
    // }

    disconnect = () => {
        this.setState({account:""})
    }

    menuSettings(val1,val2) {
        this.setState({
          menuColor: val1,
          menuType: val2,
        });
    }
    topbarSettings(val1,val2) {
        this.setState({
          topbarColor: val1,
          topbarType: val2,
        });
    }

    componentWillUnmount(){}
    componentDidUpdate(e) {
      if(e.history.action === "PUSH"){
        this.refs.mainPanel.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
      }
    }
    render(){
        return (
            <div className="wrapper" ref="themeWrapper" data-menu={this.state.menuColor} data-topbar={this.state.topbarColor} data-menutype={this.state.menuType} data-topbartype={this.state.topbarType}>

                <Header {...this.props} navtype={navWidth} admintype={'general'} />
                <Sidebar {...this.props} routes={lockedRoutes} admintype={'general'} />
                <div className="main-panel" ref="mainPanel">
                    <Switch history={history}>
                        {
                            lockedRoutes.map((prop,key) => {
                                if(prop.collapse){
                                    return prop.views.map((prop2,key2) => {
                                        return (
                                            <Route path={prop2.path} component={prop2.component} key={key2}/>
                                        );
                                    })
                                }
                                if(prop.redirect)
                                    return (
                                        <Redirect from={prop.path} to={prop.pathTo} key={key}/>
                                    );
                                return (
                                    <Route path={prop.path} component={prop.component} key={key}/>
                                );
                            })
                        }
                    </Switch>
                    <Footer fluid/>
                </div>
                {/* <ChatSidebar {...this.props} routes={lockedRoutes} chatwidth={chatWidth}  chattype={chatType}/>
                <Stylebar menuSettings={this.menuSettings} topbarSettings={this.topbarSettings} /> */}
            </div>
        );
    }
}

export default GeneralLayout;
