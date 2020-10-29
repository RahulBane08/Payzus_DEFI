import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';

import { Navmenudropdown } from 'components';
import { Navmenugroup } from 'components';

import PerfectScrollbar from 'perfect-scrollbar';

import PayzusLogo from "assets/img/Defi_logo.png";
import PayzusLogoMini from "assets/img/Defi_logo_mini.png";

var ps;
var currentmenu = "notset";

var IMGDIR = process.env.REACT_APP_IMGDIR;

class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.activeRoute.bind(this);
        this.state = {
          opendd: '',
          openmenu: 'none',
          profilename: 'Eric Nelson',
          profileimg: IMGDIR+'/images/profile/profile.jpg',
          profileposition: 'Web Developer',
        };
        this.handleOpendd = this.handleOpendd.bind(this);
        this.handlecurrent = this.handlecurrent.bind(this);

    }


    handlecurrent(currentmenu) {   
       if(this.state.opendd !== ""){
           currentmenu = ""; 
       }
    }

    handleOpendd(open) {  
        currentmenu = "";
        if(this.state.opendd === open){
            this.setState({     
                opendd: ''    
            });  
        } else {
            this.setState({     
                opendd: open    
            });  
        }
        
    }
    

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? ' active' : '';
    }
    componentDidMount(){

        if(this.props.admintype === 'general'){
            this.setState({     
                profileposition: '',
                profileimg: IMGDIR+'',
                profilename: ''
            });  
        
            }

        if(navigator.platform.indexOf('Win') > -1){
            ps = new PerfectScrollbar(this.refs.sidebar,{suppressScrollX: true, suppressScrollY: false});
        }
    }

    componentWillUnmount(){
        if(navigator.platform.indexOf('Win') > -1){
            ps.destroy();
        }
    }
    
    render(){
        
        const children = (child, parent) => {
            var links = [];
            if (child) {
                for (var i = 0; i < child.length; i++) {
                    links.push(
                        <li key={i}>
                            <NavLink to={child[i].path} className="nav-link" activeClassName="active">
                                <span>{child[i].name}</span>
                            </NavLink>
                        </li>
                    );
                    //console.log(child[i].parent + this.props.location.pathname + child[i].path);
                    if(this.props.location.pathname === child[i].path){
                        //console.log("match found " + child[i].parent);
                        if(currentmenu === "notset" && this.state.opendd === ""){
                            currentmenu = parent; //child[i].parent;
                        }
                    }
                    if(this.props.location.pathname === "/"){
                        currentmenu = "dashboards";
                    }
                }

                //console.log(currentmenu);
                //console.log(this.props.location.pathname);
                //console.log(parent);
                return <Nav>{links}</Nav>
            }
        }
        


        return (
            <div className="sidebar menubar" data-color="black" style={{height:'100vh'}}>
            <div className="sidebar menubar" data-color="white" style={{height:'100vh', backgroundColor: "white"}}>

                <div className="logo">
                    <a href="/" className="logo-mini" style={{marginTop:"5px",marginLeft:"5px"}}>
                        <div className="logo-img">
                            <img src={PayzusLogoMini} alt="react-logo" className="light-logo" height="60px"/>
                            <img src={PayzusLogoMini} alt="react-logo" className="dark-logo" height="60px"/>
                        </div>
                    </a>
                    <a href="/" className="logo-full" style={{marginLeft:"30px",marginTop:"10px"}}>
                            <img src={PayzusLogo} alt="react-logo" className="light-logo" height="60px" />
                            <img src={PayzusLogo} alt="react-logo" className="dark-logo" height="60px"/>
                    </a>
                </div> 
                
                <div className="sidebar-wrapper" ref="sidebar">
                <div className="profile-info row" style={{height:"30px"}}>
                    <div className="profile-image col-4">

                    </div>
                    <div className="profile-details col-8">
    
                    </div>
                </div>

                    <Nav className="navigation">
                        {
                            this.props.routes.map((prop,key) => {
                                if(prop.redirect)
                                    return null;
                                if(prop.type === "child")
                                    return null;
                                if(prop.type === "navgroup")
                                    return ( 
                                      <Navmenugroup name={prop.name} key={key}>
                                      </Navmenugroup>
                                    );
                                if(prop.type === "dropdown")
                                    return ( 

                                        <li className={(prop.parentid) + " " + (( ( (prop.parentid === currentmenu) && (prop.parentid !== "") && (prop.parentid !== "multipurpose") ) || (this.state.opendd === prop.name)) ? 'active': '') + ' nav-parent '} data-toggle="collapse" key={key}>
                                            <a to={prop.path} className="nav-link" onClick={() => this.handleOpendd(prop.name)} href="#!">
                                                        <i className={"i-"+prop.icon}></i>
                                                        <p>{prop.name}</p>
                                                        <span className="badge">{prop.badge}</span>
                                                        <span className={"arrow i-arrow-left"}></span>
                                            </a>
                                            { children(prop.child, prop.parentid) }
                                        </li>

                                    );

                                if(prop.type === "dropdown-backup")
                                    return ( 
                                      <Navmenudropdown name={prop.name} icon={prop.icon} path={prop.path} badge={prop.badge} child={prop.child} key={key} openclass={this.state.opendd === prop.name ? 'activethis': ''}  onClick={() => this.handleOpendd(prop.name)}>
                                      </Navmenudropdown>
                                    );
                                return (
                                    <li className={this.activeRoute(prop.path) + ' nav-parent '} key={key} onClick={() => this.handleOpendd(prop.name)}>
                                        <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                            <i className={"i-"+prop.icon}></i>
                                            <p>{prop.name}</p>
                                            <span className="badge">{prop.badge}</span>
                                        </NavLink>
                                  </li>
                                );
                            })

                        }

                    </Nav>
                </div>



            </div>
            </div>
        );
    }
}

export default Sidebar;
