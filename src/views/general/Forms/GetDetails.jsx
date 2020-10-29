import React from "react";
import { Row, Col } from "reactstrap";

import {} from "components";
import swal from "sweetalert";
import generateElement from "../../../generateElement";
// import web3 from "web3";
// import PayzusContractABI from "../../../contracts/pyzusReferral.json";
import firebaseApp from "../../../firebase-config";
import Mobile from "./countryCode";
import Web3 from "web3";
import PayzusContractABI from "../../../contracts/PAYZUS.json";

const database = firebaseApp.database().ref("Payzus");
const StorageRef = firebaseApp.storage().ref("Images");

class FormPremade extends React.Component {
  async componentWillMount() {
    // await this.setState({uid:this.props.uid})

    var uid;

    firebaseApp.auth().onAuthStateChanged(async (user) => {
      if (user) {
        uid = user.uid;

        await this.setState(
          {
            uid: uid,
          },
          async () => {
            console.log(this.state.uid);

            await this.loadWeb3();
            await this.loadAccountDetails();
          }
        );
      }
    });
  }

  async loadAccountDetails() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance });
    console.log(this.state.ethBalance);

    const PayzusContract = new web3.eth.Contract(
      PayzusContractABI,
      "0x96b37f38ad1c9c4894a681fdec45fe6b82bad1ee"
    );
    /* const balance = await PayzusContract.methods.balanceOf(this.state.account).call()
     */

    const networkId = await web3.eth.net.getId();
    /*const Payzus_Data = PAYZUS.networks[networkId]*/
    /*if(Payzus_Data){
        const payzus_ = new web3.eth.Contract(PAYZUS.abi, Payzus_Data.address)
        this.setState({payzus_})*/

    // let tokenBalance = await PayzusContract.methods.balanceOf(this.state.account).call()
    // tokenBalance = await web3.utils.fromWei(tokenBalance, "ether");
    // this.setState({ tokenBalance : tokenBalance.toString()})
    // console.log(tokenBalance)

    /*let currentPrice = await PayzusContract.methods.buyPrice().call() 
        this.setState({ currentPrice : currentPrice.toString()})
         */
    let value;

    await database
      .child(this.state.uid)
      .once("value", (snapshot) => {
        const temp = snapshot.val();
        this.setState(
          {
            totalBalance: temp.TokenBalance,
            firstPerson: temp.FirstPersonRewards,
            secondPerson: temp.SecondPersonRewards,
            thirdPerson: temp.ThirdPersonRewards,
            fourthPerson: temp.FourthPersonRewards,
            fifthPerson: temp.FifthPersonRewards,
            sixthPerson: temp.SixthPersonRewards,
            seventhPerson: temp.SeventhPersonRewards,
          },
          () => {
            this.setState({
              tokenBalance:
                this.state.totalBalance +
                this.state.firstPerson +
                this.state.secondPerson +
                this.state.thirdPerson +
                this.state.fourthPerson +
                this.state.fifthPerson +
                this.state.sixthPerson +
                this.state.seventhPerson,
            });
          }
        );
      })
      .then(() => {
        console.log(this.state.tokenBalance, this.state.seventhPerson);
      });

    console.log(this.state.PayzusContract);

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-ethereum browser detected. Try Metamask instead.");
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      mobile: "",
      account: "",
      ethBalance: "",
      tokenBalance: "",
      photoIdNumber: "",
      IdFile1: null,
      IdFile2: null,
      kycStatus: null,
      IdURL1: "",
      IdURL2: "",
      output: "0",
      totalBalance: 0,
      firstPerson: 0,
      secondPerson: 0,
      thirdPerson: 0,
      fourthPerson: 0,
      fifthPerson: 0,
      sixthPerson: 0,
      seventhPerson: 0,
      allowed: false,
      amount: 0,
    };
  }

  /*  componentDidMount = async () => {

        await this.setState({uid:this.props.uid});

        await database
            .child(this.state.uid + '/KYCSubmitted')
            .once('value', snapshot => {
                this.setState({kycStatus:snapshot.val()});
               
            })
    }

    onFileUpload = (event) => {

     let files = event.target.files;

        files.length === 2 
        ?   
           this.setState({IdFile1: files[0], IdFile2:files[1]}, () => {
               console.log(this.state.IdFile1) 
               console.log(this.state.IdFile2)
            })
            // this.setState({aadharFile2: files[1]}, () => {console.log(this.state.aadharFile2)})
           
        : 

        swal({
            content: generateElement(`Please select 2 files both front and back`),
            icon: "error",

        });


   
    }

    // getUrl = (value) => {
    //     this.setState({IdURL1:value},() => {
    //         console.log(this.state.IdURL1)
    //     })
    // }

    handleSubmit = async() => {

        var mobile = this.state.mobile;
        var photoIdNumber = this.state.photoIdNumber;
        var IdFile1 = this.state.IdFile1;
        var IdFile2 = this.state.IdFile2;
        var URL1;
        var URL2;

        if(mobile === "" || photoIdNumber === "" ){
            swal({
                content: generateElement(`Please fill all the details first`),
                icon: "error",
            });
            return;
        }

        if(IdFile1 === null || IdFile2 === null){
            swal({
                content: generateElement(`Please upload 2 files both front and back`),
                icon: "error",
            });

            return;
        }

        var uploadTask1 = StorageRef.child(this.state.uid + "/File1").put(IdFile1);
        var uploadTask2 = StorageRef.child(this.state.uid + "/File2").put(IdFile2);

        await uploadTask1.on('state_changed', function(snapshot) {

            var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            // console.log("upload is "+ progress +" done");
        },function(error) {
            console.log(error);
        },
         function() {
            uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                // console.log(downloadURL);
                URL1 = downloadURL;
            })
        })

        

        await uploadTask2.on('state_changed', function(snapshot) {

            var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            // console.log("upload is "+ progress +" done");
        },function(error) {
            console.log(error);
        },
         function() {
            uploadTask2.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                // console.log(downloadURL);
                URL2 = downloadURL;
            })
        })

        

        await database
            .child(this.state.uid)
            .update({Mobile:mobile, PhotoIdNumber: photoIdNumber,KYCSubmitted:true})
            .then(() => {

                swal({
                    content: generateElement(`Your KYC is submitted. Please wait untill you are WhiteListed`),
                    icon: "info",
                  });
                
            })
            .catch((error) =>  {
                console.log(error);
            })

        this.setState({mobile:"", aadharNumber:"", aadharFile1:null, aadharFile2:null})    
                  
    }*/

  handleSubmit = async () => {
    if (this.state.output === "CAN SWAP ONLY UPTO 25% OF TOTAL TOKEN BALANCE") {
      swal({
        content: generateElement(`Can Swap on 25%`),
        icon: "error",
      });
      return;
    } else {
      let pzs;
      let usd;
      await database
        .child(this.state.uid)
        .once("value", (snapshot) => {
          let temp = snapshot.val();
          pzs = temp.TokenBalance;
          usd = temp.USDTBalance;
        })
        .then(() => {
          database
            .child(this.state.uid)
            .update({
              TokenBalance: pzs - this.state.amount,
              USDTBalance: usd + this.state.output,
            })
            .then(() => {
              swal({
                content: generateElement(`Swap Successful`),
                icon: "success",
              });
            });
        });
    }
  };

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              {this.state.kycStatus ? (
                <div style={{ textAlign: "center" }}>
                  <h2> Your KYC is already submitted</h2>
                </div>
              ) : (
                <div className="row margin-0">
                  <div className="col-12" style={{ marginTop: "60px" }}>
                    <section>
                      <div className="content-body">
                        <div className="row">
                          <div
                            className="col-lg-10 col-sm-12 col-md-10"
                            style={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              padding: "30px",
                            }}
                          >
                            <h5
                              style={{
                                fontWeight: "500",
                                fontSize: "18px",
                                letterSpacing: "1px",
                                paddingBottom: "15px",
                                borderBottom: "1px solid rgba(0,0,0,0.05)",
                              }}
                            >
                              Swap Payzus Tokens to USDT
                            </h5>
                            <br />

                            <form
                              /*onSubmit = {(event,value) =>{
                                                                    event.preventDefault()
                                                                    console.log("swapping tokens..")
                                                                    console.log(value.number)
                                                                    let tokenAmount = value.number
                                                                    console.log(tokenAmount)
                                                                    tokenAmount = window.web3.utils.toWei(tokenAmount, 'Ether')
                                                                    /*this.props.buy(etherAmount)*/
                              onSubmit={(event) => {
                                event.preventDefault();
                                // console.log("purchasing tokens..");
                                let etherAmount;
                                etherAmount = this.input.value.toString();
                                etherAmount = window.web3.utils.toWei(
                                  etherAmount,
                                  "Ether"
                                );
                              }}
                            >
                              <div className="form-group">
                                <label htmlFor="inputEmail4">
                                  Enter amount of tokens to swap:
                                </label>
                                <input
                                  type="text"
                                  className="form-control my__form__control"
                                  placeholder="0"
                                  onChange={(event) => {
                                    const tokenAmount = this.input.value.toString();
                                    if (
                                      tokenAmount <=
                                      this.state.tokenBalance * 0.25
                                    ) {
                                      this.setState({
                                        output: tokenAmount * 0.07,
                                        allowed: true,
                                        amount: tokenAmount,
                                      });
                                    } else {
                                      this.setState({
                                        output:
                                          "CAN SWAP ONLY UPTO 25% OF TOTAL TOKEN BALANCE",
                                      });
                                    }
                                  }}
                                  ref={(input) => {
                                    this.input = input;
                                  }}
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="inputEmail4">
                                  USDT Received:
                                </label>
                                <input
                                  type="text"
                                  className="form-control my__form__control"
                                  placeholder="0"
                                  value={this.state.output}
                                  disabled
                                />
                              </div>

                              <div
                                className="col-md-12"
                                style={{
                                  textAlign: "center",
                                  marginTop: "20px",
                                }}
                              >
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  /*onClick={this.handleSubmit}*/
                                  onClick={this.handleSubmit}
                                  style={{
                                    width: "200px",
                                    backgroundColor: "#212eb8",
                                    color: "white",
                                    padding: "10px",
                                    textDecoration: "none",
                                    fontSize: "18px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    boxShadow:
                                      "0px 0px 10px .2px rgba(0,0,0,0.2)",
                                  }}
                                >
                                  Swap
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default FormPremade;
