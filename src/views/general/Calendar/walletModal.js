import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup,
    Row, Col,
} from 'reactstrap';

import {
    
} from 'components';

export default class walletModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
          modal: false,
        };
    
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    handleConnect = async() => {

        var {ethereum} = window;

        if (typeof window.ethereum !== 'undefined') {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];    
            console.log(account);
            this.setState({modal:false})
        }
       else{
           console.log("You don't have metamask")
       }    
    }
      
    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle} style={{}}>MetaMask</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Connecting to Metamask ...</ModalHeader>
                <ModalBody>
                    It's a secure platform, we are not using your private key.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleConnect}>Connect</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}
