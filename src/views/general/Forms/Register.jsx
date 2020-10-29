import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

import {} from "components";
import swal from "sweetalert";
import generateElement from "../../../generateElement";
import firebase from "../../../firebase-config";
import firebaseApp from "../../../firebase-config";

const database = firebase.database().ref("Payzus");

class FormGrid extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      name: "",
      email: "",
      password: "",
      referralCode: "",
      // startDate: moment(),
      // file1:null,
      // file2:null
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen,
    });
  }

  handleRegister = () => {
    var email = this.state.email;
    var password = this.state.password;
    var name = this.state.name;
    var code = this.state.referralCode;

    if (email === "" || password === "" || name === "") {
      swal({
        content: generateElement(`Please fill all the details first`),
        icon: "error",
      });
      return;
    }

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        var user = firebaseApp.auth().currentUser;

        var uid = user.uid;

        var email_varified = user.emailVerified;

        // this.setState({email:"", name:"", password:""})

        if (!email_varified) {
          user
            .sendEmailVerification()
            .then(function () {
              // Email sent.
              // alert("email varification link has been sent")
              swal({
                content: generateElement(
                  `Email verification link is sent to your Email Id. Please verify! (Be Patient this process will take a 3-5 minutes)`
                ),
                icon: "success",
              });

              database
                .child(uid)
                .set({
                  Name: name,
                  Email: email,
                  WhiteListed: false,
                  KYCSubmitted: false,
                  Rewards: 0,
                  DirectReferred: 0,
                  IndirectReferred: 0,
                  ParentAddress: code,
                  FirstPersonRewards: 0,
                  SecondPersonRewards: 0,
                  ThirdPersonRewards: 0,
                  FourthPersonRewards: 0,
                  FifthPersonRewards: 0,
                  SixthPersonRewards: 0,
                  SeventhPersonRewards: 0,
                  CountryCode: 91,
                  TokenBalance: 0,
                  USDTBalance: 0,
                })
                .then(() => {
                  database.child(uid + "/Transactions").update({ count: 0 });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch(function (error) {
              // An error happened.
              console.log(error);
            });
        } else {
          window.location.href = "/login";
        }

        this.setState({ email: "", name: "", password: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              {/* <div className="page-title">
                        <div className="float-left">
                            <h1 className="title">Register form</h1>
                        </div>
                    </div> */}

              <div className="row" style={{ marginTop: "50px" }}>
                <div className="col-lg-6 col-md-8 col-sm-10 form-wrapper">
                  <div className="form-fields-wrapper col-lg-12">
                    <section>
                      <header className="panel_header">
                        <h2 className="title float-left">Register</h2>
                      </header>
                      <div className="content-body">
                        <div className="row">
                          <div className="col">
                            <Form>
                              <FormGroup row>
                                <Label htmlFor="referralCode" sm={12}>
                                  Enter Referral code of your sponsor (If not
                                  please leave it blank)
                                </Label>
                                <Col sm={12}>
                                  <Input
                                    type="text"
                                    name="name"
                                    className="my__form__control"
                                    id="referralCode"
                                    placeholder=""
                                    value={this.state.referralCode}
                                    onChange={(event) =>
                                      this.setState({
                                        referralCode: event.target.value,
                                      })
                                    }
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label htmlFor="exampleName" sm={12}>
                                  Name
                                </Label>
                                <Col sm={12}>
                                  <Input
                                    type="text"
                                    name="name"
                                    className="my__form__control"
                                    id="exampleName"
                                    placeholder=""
                                    value={this.state.name}
                                    onChange={(event) =>
                                      this.setState({
                                        name: event.target.value,
                                      })
                                    }
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label htmlFor="exampleEmail" sm={12}>
                                  Email
                                </Label>
                                <Col sm={12}>
                                  <Input
                                    type="email"
                                    name="email"
                                    className="my__form__control"
                                    id="exampleEmail"
                                    placeholder=""
                                    value={this.state.email}
                                    onChange={(event) =>
                                      this.setState({
                                        email: event.target.value,
                                      })
                                    }
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label htmlFor="examplePassword" sm={12}>
                                  Password
                                </Label>
                                <Col sm={12}>
                                  <Input
                                    type="password"
                                    name="password"
                                    className="my__form__control"
                                    id="examplePassword"
                                    placeholder=""
                                    value={this.state.password}
                                    onChange={(event) =>
                                      this.setState({
                                        password: event.target.value,
                                      })
                                    }
                                  />
                                </Col>
                              </FormGroup>
                            </Form>
                            <Button
                              onClick={(event) => this.handleRegister(event)}
                              color="primary"
                              className="submit-button"
                            >
                              Register
                            </Button>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* <div className="form-image-wrapper">
                    <img src={require("../../../assets/img/form.jpg")} alt="" />
                  </div> */}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default FormGrid;
