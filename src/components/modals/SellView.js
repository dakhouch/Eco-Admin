import React from 'react'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import { Component } from 'react';
import ImageGrid from 'src/components/ImageGrid';
import "src/scss/images.scss";
import {
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { ModalFooter } from 'react-bootstrap';
class SellView extends Component {

constructor(props){
    super(props);
}

render(){
   return(
        <Modal show={this.props.isOpen} size="lg">
        <Modal.Header>
      <Modal.Title>Product Name: {this.props.sell?.product.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <CForm
      className="row g-3 needs-validation"
    >
      <CRow className='p-2 mt-2'>
      <CCol md={4} className="m-3">
                <CFormLabel>Date:</CFormLabel>
                <CFormInput type="text" disabled value={this.props.sell?.sellDate} />
                </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom01">Selling Quantity :</CFormLabel>
        <CFormInput type="text" disabled value={this.props.sell?.sellQuantity}  />
      </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom01">Rest Quantity :</CFormLabel>
        <CFormInput type="text" disabled value={this.props.sell?.product.quantity}  />
      </CCol>
      </CRow>
      <hr/>
      <CRow>
      {
        this.props.selectedGaugeProducts.map((selected,ind)=>{
         return(
        <CCol key={ind} md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom01">{selected.gauge.name}:</CFormLabel>
        <CFormInput type="text" disabled value={selected.value}  />
        </CCol>
          )
        })
      }
      </CRow>
      <hr/>
      <CRow className='p-2'>
      <CCol md={4} className="m-3">
        <CFormLabel htmlFor="validationCustomUsername">Customer Name :</CFormLabel>
          <CFormInput
            type="text"
           disabled
           value={this.props.sell?.customerName} 
          />
      </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom03">Customer Nic :</CFormLabel>
        <CFormInput type="text" disabled value={this.props.sell?.customerNic}  />
      </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustom03">Customer Link :</CFormLabel>
        <CFormInput type="text" disabled value={this.props.sell?.customerLink} />
      </CCol>
      </CRow>
      <CRow>
      <CCol md={5} className="m-3">
        <CFormLabel htmlFor="validationCustom03">Customer Adresse:</CFormLabel>
        <CFormInput type="text" disabled value={this.props.sell?.customerAdresse}  />
      </CCol>
      <CCol md={5} className="m-3">
        <CFormLabel htmlFor="validationCustom04">Delivery location:</CFormLabel>
        <CFormInput type="text" disabled value={this.props.sell?.customerDadresse}  />
      </CCol>
      </CRow>
      <hr/>
      <CRow>
      <CCol xs>
     <ImageGrid images={this.props.images} />
      </CCol>
      </CRow>
    </CForm>
    </Modal.Body>
    <ModalFooter>
    <Button variant="success" onClick={()=>this.props.hideModal()}>
        Cancel
          </Button>
    </ModalFooter>
  </Modal>   
    )
}
}
export default SellView