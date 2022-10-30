import React, { useState } from 'react'
import "src/scss/images.scss";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios';


const Login = () => {
  
  let logo = require("src/assets/images/logo.png")
const [login,setLogin]=useState({user:"",pass:""});
 
const onchangeHandler=(e)=>{
setLogin({...login,[e.target.name]:e.target.value});
}
const pushLogin=async()=>{
  await axios.post("http://localhost:8080/login",login);
}

  return (
    <div className="bg-dark min-vh-100 d-block flex-row align-items-center">
      <CContainer className='mb-4 pt-4'>
      <CRow className="justify-content-center">
      <CCol md={4}>
      <div className="file-logo">
      <CImage
        src={logo}
        className="file-img"
      />
    </div>
    </CCol>
      </CRow>
      </CContainer>
      <CContainer className='mb-4'>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" name="user" onChange={(e)=>onchangeHandler(e)} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="pass"
                        onChange={(e)=>onchangeHandler(e)}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4 login" onClick={()=>pushLogin()}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
