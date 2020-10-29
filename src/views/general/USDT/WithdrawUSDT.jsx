import React from "react";
import { Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";

import firebaseApp from "../../../firebase-config";

import swal from "sweetalert";
import generateElement from "../../../generateElement";

const database = firebaseApp.database().ref("Payzus");

class WithdrawUSDT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usdtBalnce: 0,
      usdtAddrs: "",
      withdrawModal: false,
    };
  }

  componentDidMount() {
    let temp;

    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;

        database.child(uid).once("value", (snapshot) => {
          temp = snapshot.val();

          // console.log(temp);

          let balance = Number(temp.USDTBalance);

          this.setState({ usdtBalnce: balance.toFixed(3) });
        });
      }
    });
  }

  handleWithdrawModal = () => {
    this.setState({
      withdrawModal: !this.state.withdrawModal,
    });
  };

  handleWithdraw = () => {
    swal({
      content: generateElement(`Will be available in 48 hours`),
      icon: "info",
    });
  };

  readUSDTAddrs = (val) => {
    this.setState({
      usdtAddrs: val,
    });
  };

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="row margin-0">
                <div className="col-12" style={{ marginTop: "60px" }}>
                  <section>
                    <div className="content-body">
                      <div className="row">
                        <div
                          className="col-lg-6 col-sm-10 col-md-8"
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
                            Withdraw USDT
                          </h5>
                          <br />

                          <div className="row">
                            <div
                              className="card stats__card"
                              style={{
                                boxShadow: "none",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <div className="card__icon__wrapper">
                                <svg
                                  width="35"
                                  height="35"
                                  viewBox="0 0 35 35"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                  }}
                                >
                                  <circle
                                    cx="17.5"
                                    cy="17.5"
                                    r="17.5"
                                    fill="#FFB404"
                                    fill-opacity="0.2"
                                  />
                                  <path
                                    d="M17.5 0C7.85331 0 0 7.85331 0 17.5C0 27.1467 7.85331 35 17.5 35C27.1467 35 35 27.1467 35 17.5C35 7.85331 27.1467 0 17.5 0ZM17.5 31.3771C9.84917 31.3771 3.62293 25.1508 3.62293 17.5C3.62293 9.84917 9.84917 3.62293 17.5 3.62293C25.1508 3.62293 31.3771 9.84917 31.3771 17.5C31.3771 25.1508 25.1508 31.3771 17.5 31.3771Z"
                                    fill="#FFB404"
                                  />
                                  <path
                                    d="M20.4866 16.5165C19.6405 16.0465 18.7438 15.6994 17.8543 15.3306C17.3409 15.1209 16.8492 14.8678 16.4153 14.5207C15.562 13.8337 15.7211 12.7273 16.7262 12.2862C17.0083 12.1632 17.3047 12.1198 17.6085 12.1054C18.7727 12.0403 19.8719 12.2572 20.9277 12.7634C21.4483 13.0165 21.6219 12.937 21.8027 12.3946C21.9907 11.8161 22.1498 11.2304 22.3161 10.6519C22.4318 10.2614 22.2872 10.001 21.9184 9.84194C21.2459 9.54545 20.5516 9.32851 19.8213 9.22004C18.874 9.06818 18.874 9.06818 18.8667 8.11364C18.8595 6.76136 18.8595 6.76136 17.5145 6.76859C17.3192 6.76859 17.124 6.76136 16.9287 6.76859C16.2996 6.79029 16.1911 6.89876 16.1766 7.52789C16.1694 7.80992 16.1766 8.09917 16.1766 8.3812C16.1694 9.22727 16.1694 9.21281 15.3595 9.50207C13.407 10.2107 12.1994 11.5413 12.0692 13.6746C11.9535 15.562 12.937 16.8347 14.4845 17.7603C15.439 18.3316 16.4948 18.6715 17.5072 19.1198C17.905 19.2934 18.281 19.4959 18.6064 19.7707C19.5826 20.5733 19.4019 21.9112 18.2448 22.4174C17.6229 22.6849 16.9721 22.7572 16.3068 22.6705C15.2727 22.5403 14.282 22.2727 13.3564 21.7882C12.814 21.5062 12.655 21.5785 12.4669 22.1715C12.3078 22.6849 12.1632 23.1983 12.0258 23.7118C11.8378 24.406 11.9029 24.5723 12.5682 24.8905C13.407 25.2955 14.3109 25.5052 15.2293 25.657C15.9452 25.7727 15.9742 25.8017 15.9814 26.5465C15.9814 26.8864 15.9886 27.2262 15.9886 27.5589C15.9959 27.9855 16.1983 28.2314 16.6395 28.2386C17.1384 28.2459 17.6374 28.2459 18.1364 28.2386C18.5413 28.2314 18.751 28.0072 18.7583 27.595C18.7583 27.1322 18.78 26.6694 18.7655 26.2066C18.7438 25.7366 18.9463 25.4979 19.4019 25.375C20.4432 25.093 21.3326 24.5289 22.0196 23.6973C23.8998 21.3833 23.1766 18.0062 20.4866 16.5165Z"
                                    fill="#FFB404"
                                  />
                                </svg>
                              </div>
                              <div className="card__text__wrapper">
                                <p style={{ fontSize: "24px" }}>
                                  Total USDT Balance
                                </p>
                                <h1
                                  style={{
                                    fontSize: "40px",
                                    color: "#282928",
                                    marginTop: "20px",
                                  }}
                                >
                                  {this.state.usdtBalnce}
                                  <span> USDT</span>
                                </h1>
                              </div>
                            </div>
                          </div>

                          <div
                            className="col-md-12"
                            style={{ textAlign: "center", marginTop: "30px" }}
                          >
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={this.handleWithdraw}
                              style={{
                                width: "200px",
                                backgroundColor: "#212eb8",
                                color: "white",
                                padding: "10px",
                                textDecoration: "none",
                                fontSize: "18px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                boxShadow: "0px 0px 10px .2px rgba(0,0,0,0.2)",
                              }}
                            >
                              Withdraw USDT
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </Col>
          </Row>

          <Modal
            isOpen={this.state.withdrawModal}
            toggle={this.handleWithdrawModal}
            backdrop={true}
          >
            <ModalHeader
              toggle={this.handleWithdrawModal}
              style={{
                fontWeight: "500",
                fontSize: "18px",
                letterSpacing: "1px",
              }}
            >
              Withdraw USDT
            </ModalHeader>
            <ModalBody>
              <div className="form-group col-12">
                <label htmlFor="inputEmail4">Please Enter Your Address</label>
                <input
                  type="text"
                  className="form-control  my__form__control"
                  id="inputEmail4"
                  placeholder=""
                />
              </div>

              <div
                className="col-md-12"
                style={{
                  textAlign: "center",
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <button
                  className="btn btn-primary"
                  onClick={this.handleWithdrawModal}
                  style={{
                    width: "130px",
                    backgroundColor: "#282928",
                    color: "white",
                    padding: "10px",
                    textDecoration: "none",
                    fontSize: "18px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    boxShadow: "0px 0px 10px .2px rgba(0,0,0,0.2)",
                  }}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "130px",
                    backgroundColor: "#212eb8",
                    color: "white",
                    padding: "10px",
                    textDecoration: "none",
                    fontSize: "18px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    boxShadow: "0px 0px 10px .2px rgba(0,0,0,0.2)",
                  }}
                >
                  Withdraw
                </button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default WithdrawUSDT;
