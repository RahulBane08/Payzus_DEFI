import React from "react";
import { Row, Col } from "reactstrap";

import {} from "components";
import swal from "sweetalert";
import generateElement from "../../../generateElement";
import firebaseApp from "../../../firebase-config";

const database = firebaseApp.database().ref("Payzus");

class ReferSomeone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      copySuccess: false,
    };
  }

  componentDidMount = async () => {
    // await this.setState({uid:this.props.uid})
    //    console.log(this.state.uid)

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
          }
        );
      }
    });
  };

  handleCopy = () => {
    const el = this.referrralCode;
    el.select();
    document.execCommand("copy");
    this.setState({ copySuccess: true }, () => {
      swal({
        content: generateElement(`Copied to Clipboard`),
        icon: "success",
      });
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
                            Refer Someone to Earn PZS Rewards
                          </h5>
                          <br />

                          <div className="form-row">
                            <div className="form-group col-md-8">
                              <label htmlFor="referralCode">
                                Your Referral Code Is
                              </label>
                              <input
                                type="text"
                                readOnly
                                className="form-control my__form__control"
                                id="referralCode"
                                placeholder=""
                                value={this.state.uid}
                                ref={(code) => (this.referrralCode = code)}
                              />
                            </div>
                            <div
                              className="form-group col-md-4"
                              style={{
                                paddingTop: "0px",
                                paddingLeft: 0,
                              }}
                            >
                              <button
                                className="btn btn-primary my__button"
                                onClick={this.handleCopy}
                                style={{
                                  width: "120px",
                                  height: "52px",
                                  backgroundColor: "#212eb8",
                                  color: "white",
                                  padding: "10px",
                                  textDecoration: "none",
                                  fontSize: "18px",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  marginTop: "30px",
                                  marginLeft: "10px",
                                  boxShadow:
                                    "0px 0px 10px .2px rgba(0,0,0,0.2)",
                                }}
                              >
                                copy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ReferSomeone;
