import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

import {} from "components";

import swal from "sweetalert";
import generateElement from "../../../generateElement";
import firebaseApp from "../../../firebase-config";
import ResetPassword from "./ResetPassword";

class FormGrid extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      email: "",
      password: "",
    };
  }

  // componentDidMount = async () => {
  //   await firebaseApp.auth().onAuthStateChanged(user => {
  //     if(user){
  //       window.location.href = "/app/dashboard";
  //     }
  //   })
  // }

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

  handleLogin = (event) => {
    event.preventDefault();

    var email = this.state.email;
    var password = this.state.password;

    if (email === "" || password === "") {
      swal({
        content: generateElement(`Please fill all the details first`),
        icon: "error",
      });
      return;
    }

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        var user = firebaseApp.auth().currentUser;

        var emailVarified = user.emailVerified;

        if (emailVarified) {
          window.location.href = "app/dashboard";
          // this.props.history.push("/app/dashboard");
        } else {
          swal({
            content: generateElement(`Please verify the email first`),
            icon: "error",
          });
        }

        this.setState({ email: "", password: "" });
      })
      .catch((error) => {
        var errorMessage = error.message;

        swal({
          content: generateElement(errorMessage),
          icon: "error",
        });

        // alert(errorMessage);
      });
  };

  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              {/* 
                          <div className="page-title">
                              <div className="float-left">
                                  <h1 className="title">Login form</h1>
                              </div>
                          </div> */}

              <div className="row" style={{ marginTop: "50px" }}>
                <div className="col-lg-6 col-md-8 col-sm-10 form-wrapper">
                  <div className="form-fields-wrapper col-lg-12">
                    <section>
                      <header className="panel_header">
                        <h2 className="title float-left">Login</h2>
                      </header>
                      <div className="content-body">
                        <div className="row">
                          <div className="col">
                            <Form>
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
                              {/* <FormGroup row>
                                <Label htmlFor="examplePassword" sm={12}>Date of Birth</Label>
                                <Col sm={12}>
                                  <DatePicker selected={this.state.startDate} onChange={this.handleChange} 

                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label htmlFor="exampleFile" sm={12}>Aadhar</Label>
                                <Col sm={12}>
                                  <Input type="file" name="file" id="exampleFile" 
                                    onChange={event => this.onFileUpload1(event)}
                                    onClick={(e) => (e.target.value = null)}
                                  />
                                  <FormText color="muted">
                                    This is some placeholder block-level help text for the above input.
                                    It's a bit lighter and easily wraps to a new line.
                                  </FormText>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label htmlFor="exampleFile" sm={12}>PanCard</Label>
                                <Col sm={12}>
                                  <Input type="file" name="file" id="exampleFile" 
                                    onChange={event => this.onFileUpload2(event)}
                                    onClick={(e) => (e.target.value = null)}
                                  />
                                  <FormText color="muted">
                                    This is some placeholder block-level help text for the above input.
                                    It's a bit lighter and easily wraps to a new line.
                                  </FormText>
                                </Col>
                              </FormGroup> */}
                              {/* <FormGroup row>
                                <Label htmlFor="exampleSelect" sm={12}>Select</Label>
                                <Col sm={12}>
                                  <Input type="select" name="select" id="exampleSelect" />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label htmlFor="exampleSelectMulti" sm={12}>Select Multiple</Label>
                                <Col sm={12}>
                                  <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label htmlFor="exampleText" sm={12}>Text Area</Label>
                                <Col sm={12}>
                                  <Input type="textarea" name="text" id="exampleText" />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label htmlFor="exampleFile" sm={12}>File</Label>
                                <Col sm={12}>
                                  <Input type="file" name="file" id="exampleFile" />
                                  <FormText color="muted">
                                    This is some placeholder block-level help text for the above input.
                                    It's a bit lighter and easily wraps to a new line.
                                  </FormText>
                                </Col>
                              </FormGroup>
                              <FormGroup tag="fieldset" row>
                                <label className="col-form-label col-sm-2">Radio Buttons</label>
                                <Col sm={12}>
                                  <FormGroup check>
                                    <Label check>
                                      <Input type="radio" name="radio2" />{' '}
                                      Option one is this and that—be sure to include why it's great
                                    </Label>
                                  </FormGroup>
                                  <FormGroup check>
                                    <Label check>
                                      <Input type="radio" name="radio2" />{' '}
                                      Option two can be something else and selecting it will deselect option one
                                    </Label>
                                  </FormGroup>
                                  <FormGroup check disabled>
                                    <Label check>
                                      <Input type="radio" name="radio2" disabled />{' '}
                                      Option three is disabled
                                    </Label>
                                  </FormGroup>
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label htmlFor="checkbox2" sm={12}>Checkbox</Label>
                                <Col sm={{ size: 10 }}>
                                  <FormGroup check>
                                    <Label check>
                                      <Input type="checkbox" id="checkbox2" />{' '}
                                      Check me out
                                    </Label>
                                  </FormGroup>
                                </Col>
                              </FormGroup> */}
                              {/* <FormGroup>
                                  <Button onClick={() => this.handleRegister(this.state.email, this.state.password)}>Submit</Button>
                              </FormGroup> */}
                            </Form>
                            <ResetPassword />
                            <Button
                              onClick={(event) => this.handleLogin(event)}
                              className="submit-button"
                            >
                              Login
                            </Button>

                            {/* <Button onClick={(event) => this.final(event)}>final</Button> */}

                            {/* <Button onClick={this.handleLoginWithGoogle}>Login With Google</Button> */}
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
