import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
  Row,
  Col,
} from "reactstrap";

import swal from "sweetalert";

import {} from "components";
import generateElement from "../../../generateElement";
import firebaseApp from "../../../firebase-config";

class UIModals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleSubmit = async () => {
    var email = this.state.email;
    var auth = firebaseApp.auth();

    if (email === "") {
      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        swal({
          content: generateElement(
            `A password reset link is sent to your Emial Id`
          ),
          icon: "info",
        });
      })
      .catch(function (error) {});

    this.toggle();
  };

  render() {
    const externalCloseBtn = (
      <button
        className="close"
        style={{ position: "absolute", top: "15px", right: "15px" }}
        onClick={this.toggle5}
      >
        &times;
      </button>
    );

    return (
      <div>
        <div>
          {/* <Button color="primary" onClick={this.toggle}>Forgot Password?</Button> */}
          <a
            color="primary"
            onClick={this.toggle}
            style={{ float: "right", cursor: "pointer", color: "#212eb8" }}
          >
            Forgot Password?
          </a>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              Enter Registered Email Id
            </ModalHeader>
            <ModalBody>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="referralCode">Email Id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="referralCode"
                    placeholder=""
                    value={this.state.email}
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSubmit}>
                Submit
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default UIModals;
