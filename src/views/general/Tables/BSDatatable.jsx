import moment from 'moment'; // Example for onSort prop
import React from 'react'; // Import React
//import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package
import {
    Row, Col,
} from 'reactstrap';



const header = [
  { title: 'Assets', prop: 'id', sortable: false, filterable: false },
  { title: 'Price', prop: 'name', sortable: false, filterable: false },
  { title: '1 Day', prop: 'company', sortable: false, filterable: false },
  { title: '30 Days', prop: 'email', sortable: false, filterable: false },
  { title: '90 Days', prop: 'phone', sortable: false, filterable: false },
  { title: 'Market Cap', prop: 'date', sortable: true, filterable: true },
];

const body = [
 
// {id: 50, name: "Kevin Bowman", company: "Kwimbee", email: "kbowman1d@multiply.com", phone: "7-(325)789-1257",     date: moment().subtract(50, 'days').format('Do MMMM YYYY')}

];

const onSortFunction = {
  date(columnValue) {
    // Convert the string date format to UTC timestamp
    // So the table could sort it by number instead of by string
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  },
};

const customLabels = {
  first: '<<',
  last: '>>',
  prev: '<',
  next: '>',
  show: 'Display ',
  entries: ' rows',
  noResults: 'There is no data to be displayed',
};

class UIBSDatatable extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cryptos : [],
            apiResponse:""
        }
    }

    // callAPI() {
    //     fetch("http://localhost:9000/test")
    //         .then(res => res.text())
    //         .then(res => this.setState({apiResponse: res}))
    //         .catch(err => err);
    // }

    componentDidMount = () => {
        // this.callAPI();
    }
   
    
    render(){

        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>

                    <div className="page-title">
                        <div className="float-left">
                            <h1 className="title">Market</h1>
                            <p>{this.state.apiResponse}</p>
                        </div>
                    </div>


                          

                    <div className="col-12" >
                        <section className="box ">
                            <header className="panel_header">
                                <h2 className="title float-left">All Top ERC20 Based Tokens</h2>
                                
                            </header>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-12 dt-disp">
                            
  {/* <Datatable
  tableHeader={header}
  tableBody={body}
  keyName="userTable"
  tableClass="striped table-hover table-responsive"
  rowsPerPage={10}
  rowsPerPageOption={[5, 10, 15, 20]}
  initialSort={{prop: "id", isAscending: true}}
  onSort={onSortFunction}
  labels={customLabels}
/> */}                              <div style={{textAlign:"center", height:'200px'}}>
                                        <h2 style={{marginTop:"40px"}}> Coming Soon ... </h2>
                                    </div>

                               

                                    </div>
                                </div>


                            </div>
                        </section>
                    </div>


                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}

export default UIBSDatatable;
