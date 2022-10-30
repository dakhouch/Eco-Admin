import React from "react";
import {
    CCard,
    CCardBody,
    CCardText,
    CCol
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react';
  import { cilTrash } from '@coreui/icons';
  import "src/scss/category.css"



class CategoryCard extends React.Component{


    constructor(props){super(props)}

    render(){

        return(
            <CCol>
                <CCard style={{ width: '16rem'}} className='m-4'>
<CCardBody>
  <CCardText className='text-center'>
  <strong>{this.props.name}</strong> 
  </CCardText>
  <CCardText>
  <div className="card-body row text-center">
       <div className="col">
           <div className="fs-5 fw-semibold "><small>{this.props.stock}</small></div>
           <div className="text-uppercase text-medium-emphasis small"><small>stock</small></div>
        </div>
    <div className="vr"></div>
              <div className="col">
                   <div className="fs-5 fw-semibold"><small>{this.props.pending}</small></div> 
                   <div className="text-uppercase text-medium-emphasis small"><small>pending</small></div>
              </div>
    <div className="vr"></div>
              <div className="col">
                   <div className="fs-5 fw-semibold"><small>{this.props.sell}</small></div> 
                   <div className="text-uppercase text-medium-emphasis small"><small>sells</small></div>
              </div>
  </div>
  </CCardText>
  <div className="d-flex justify-content-center">
  <a className='text-danger' onClick={()=>this.props.delete(this.props.id)}><CIcon icon={cilTrash} size='xl'></CIcon></a>
  </div>
</CCardBody>
</CCard>
</CCol>
        )
        }
}
export default CategoryCard