import React from 'react'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import { Component } from 'react';
import DateInput from '../DateInput';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
class ModalBuy extends Component {

constructor(props){
    super(props);
}

render(){

    return(
        <Modal show={this.props.isOpen} size="lg">
        <Modal.Header>
      <Modal.Title>sell product</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <CForm
      className="row g-3 needs-validation"
    >
      <CRow className='p-2 mt-2'>
      <CCol md={4} className="m-3">
                <CFormLabel>Date:</CFormLabel>
               <DateInput onchangeDatePlus={this.props.onchangeDate}/>
                </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom01">Quantity* :</CFormLabel>
        <CFormInput type="text" id="validationCustomQUANTITY" name="sellQuantity" onChange={(e)=>this.props.onChangeHandler(e)} required />
      </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom02">selling price* :</CFormLabel>
        <CInputGroup>
        <CInputGroupText id="inputGroupPrepend">DH</CInputGroupText>
        <CFormInput type="text" id="validationCustomSELLING" name="sellPrice" onChange={(e)=>this.props.onChangeHandler(e)} required />
        </CInputGroup>
      </CCol>
      </CRow>
      <hr/>
      <CRow className='p-2'>
      <CCol md={4} className="m-3">
        <CFormLabel htmlFor="validationCustomUsername">Name* :</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
          <CFormInput
            type="text"
            name="customerName"
            defaultValue=""
            aria-describedby="inputGroupPrepend"
            required
            onChange={(e)=>this.props.onChangeHandler(e)}
          />
          <CFormFeedback invalid>Please choose a name.</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom03">Nic :</CFormLabel>
        <CFormInput type="text" id="validationCustomNIC" name="customerNic" onChange={(e)=>this.props.onChangeHandler(e)} required />
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom03">Link :</CFormLabel>
        <CFormInput type="text" id="validationCustomLINK" name="customerLink" onChange={(e)=>this.props.onChangeHandler(e)} required />
        <CFormFeedback invalid>Please provide a valid link.</CFormFeedback>
      </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom03">Adresse* :</CFormLabel>
        <CFormInput type="text" id="validationCustomAdresse" name="customerAdresse" onChange={(e)=>this.props.onChangeHandler(e)} required />
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={4} className="m-3">
        <CFormLabel htmlFor="validationCustom04">Delivery location* :</CFormLabel>
        <CFormInput type="text" id="validationCustomDelevery" name="customerDadresse" onChange={(e)=>this.props.onChangeHandler(e)} required />
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      </CRow>
    </CForm>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="default" onClick={()=>this.props.hidemodal()}>
            Cancel
          </Button>
          <Button variant="info" onClick={()=>{this.props.operation();this.props.hidemodal()}}>
            Sell product
          </Button>
    </Modal.Footer>
  </Modal>   
    )
}
}
export default ModalBuy