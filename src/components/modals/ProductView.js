import React from 'react'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import { Component } from 'react';
import DateInput from '../DateInput';
import ImageGrid from 'src/components/ImageGrid';
import "src/scss/images.scss";
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
import cuid from 'cuid';
import { ModalFooter } from 'react-bootstrap';
class ProductView extends Component {

constructor(props){
    super(props);
}

render(){
   return(
        <Modal show={this.props.isOpen} size="lg">
        <Modal.Header>
      <Modal.Title>Product Name: {this.props.product?.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <CForm
      className="row g-3 needs-validation"
    >
      <CRow className='p-2 mt-2'>
      <CCol md={3} className="m-3">
                <CFormLabel>Init Quantity:</CFormLabel>
                <CFormInput type="text" disabled value={this.props.product?.init_quantity} />
                </CCol>
       <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustomSource">Source :</CFormLabel>
          <CFormInput
            type="text"
           disabled
           value={this.props.product?.source} 
          />
      </CCol>
      <CCol md={3} className="m-3">
        <CFormLabel htmlFor="validationCustomLink">Link :</CFormLabel>
        <CFormInput type="text" disabled value={this.props.product?.link}  />
      </CCol>
      </CRow>
      <hr/>
      <CRow>
      {
        this.props?.selectedGaugeProducts.map((selected,ind)=>{
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
      <CRow>
      <CCol xs>
     <ImageGrid images={this.props?.images} />
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
export default ProductView