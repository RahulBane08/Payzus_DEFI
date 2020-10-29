
import GeneralLayout from 'layouts/General.jsx';
import LockedLayout from 'layouts/Locked.jsx';


var BASEDIR = "/app";


var indexRoutes = [
    
    
    { path: BASEDIR+"/", name: "Dashboard", component: GeneralLayout },
    
    { path: "/", name: "Dashboard", component: LockedLayout },
    
    { path: BASEDIR + "/", name: "Home", component: GeneralLayout },
    // { path: "/", name: "Home", component: GeneralLayout },
    
    

    
    
];

export default indexRoutes;
