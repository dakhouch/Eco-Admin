import React, { Component } from 'react'
import { Modal, Button } from "react-bootstrap";

 
class MyModal extends Component{
constructor(props){
    super(props)
}
render(){
    return (
        <Modal show={this.props.isOpen}>
        <Modal.Header >
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className={this.props.class}>{this.props.message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={()=>this.props.hidemodal()}>
            Cancel
          </Button>
          <Button variant={this.props.variante} onClick={()=>{this.props.operation(this.props.id);this.props.hidemodal();}}>
            {this.props.variante=="danger"? "delete":"validate"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
}
 
export default MyModal;