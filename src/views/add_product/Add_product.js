import React,{Component} from 'react'
import {CRow,CCol,CCard,CCardBody,CFormInput,CCardHeader,CFormLabel,CButton, CFormSelect,CInputGroupText,CInputGroup} from '@coreui/react'
import DateInput from 'src/components/DateInput';
import DropZone from 'src/components/DropZone';
import "src/scss/images.scss";
import axios from 'axios'
import cuid from 'cuid'
import ImageGrid from 'src/components/ImageGrid';
import LoadingSpinner from 'src/components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Add_product extends Component{
    
    constructor(){
        super();
        this.state={product:{},categories:[],selectedC:[],images:[],files:[],isLoading:false};
    }
    componentDidMount=()=>{
      this.getCategory();
    }
    showToastSuccess = () => {
      toast.success('the product has been added successfully', {
          position: toast.POSITION.TOP_RIGHT
      })
     }

     showToastDanger = () => {
      toast.error('error was occured', {
          position: toast.POSITION.TOP_RIGHT
      })
     }
     
    getCategory=async()=>{
      let res=await axios.get("http://localhost:8080/getCategories").then((res)=>res.data);
      this.setState((prevstate)=>{
        return{
          ...prevstate,
          categories:res
        }
       });
    }
    getdate=(time)=>{
      this.setState((prev)=>{
        return{
        prev,
        product:{...prev.product,date:time}
      }})  
    }
    onchangehandler=(e)=>{
this.setState({
  ...this.state,
 product:{...this.state.product,[e.target.name]:e.target.value}
})
    }

  onchangeCategory=(e)=>{
    for(let i=0;i<this.state.categories.length;i++){
    if(this.state.categories[i].id==e.target.value){ 
      let gauges=[];
      this.state.categories[i].gaugeList.map((gauge)=>{
       let gaugeTemp={...gauge,value:""};
       gauges.push(gaugeTemp);
      });
      this.setState({...this.state,selectedC:gauges,product:{...this.state.product,category:this.state.categories[i]}});
  }
  }
  }
  onchangeGauge=(e)=>{
    let newGauge=[];
    this.state.selectedC.map((gauge)=>{
    if(gauge.name==e.target.name) {gauge.value=e.target.value;}
    newGauge.push(gauge);
    })
    this.setState({...this.state,selectedC:newGauge});
  }
  
  
  onDrop =(acceptedFiles) => {

    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload =(e)=>{
        this.setState((prevState) => {
         return {
        ...prevState,
        images:[...prevState.images,{id:cuid(),src: e.target.result }],
        files:[...prevState.files,file]
         }
      });
    };
      reader.readAsDataURL(file);
      return file;
    });
  }
  pushProduct=async()=>{
    let ind=true;
    this.setState((prev)=>{return{...prev,isLoading:true}});
    let res=await axios.post("http://localhost:8080/addProduct",this.state.product).then((res) => {
      //add product_gauge
      let product_gauge={}
      this.state.selectedC.map(async(gauge)=>{
      product_gauge={product_id:res.data.id,gauge_id:gauge.id,value:gauge.value};
      let res1= await axios.post("http://localhost:8080/addProduct_Gauge",product_gauge).then((res) => {
        ind=ind && true;
      }).catch((error) => {
        ind=ind && false;
      });
    })
//add images
let formdata = new FormData();
this.state.files.map(async(file)=>{
  formdata.append("file[]", file);
 formdata.append("product",res.data.id);
 let res2=await axios.post("http://localhost:8080/uploadimage",formdata).then((res) => {
  ind=ind && true;
}).catch((error) => {
 ind=ind && false;
});
})
//ind product
      ind=ind && true;
    }).catch((error) => {
     ind=ind && false;
    });

  if(ind) {this.showToastSuccess();}
  else {this.showToastDanger();}
  this.setState((prev)=>{return{...prev,isLoading:false}});
  }
    render(){
       return(
        <CCard className='mb-4'>
          <ToastContainer />
        <CCardHeader className="text-center addproduct">add product</CCardHeader>
            <CCardBody>
                <CRow>
                <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>General Information</strong>
          </CCardHeader>
          <CCardBody>
              <CRow>
              <CCol xs>
                <CFormLabel>Date:</CFormLabel>
               <DateInput onchangeDatePlus={this.getdate}/>
                </CCol>
                <CCol xl>
                <CFormLabel>Name:</CFormLabel>
                  <CFormInput placeholder="Name" name="name" aria-label="name" onChange={(e)=>this.onchangehandler(e)} />
                </CCol>
                <CCol xl>
                <CFormLabel>Quantity:</CFormLabel>
                  <CFormInput placeholder="Quantity" name="quantity" aria-label="quantity" onChange={(e)=>this.onchangehandler(e)} />
                </CCol>
                <CCol xl>
                <CFormLabel>Unit price:</CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>DH</CInputGroupText>
                  <CFormInput placeholder="Unit price" name="unit_price" aria-label="unit price" onChange={(e)=>this.onchangehandler(e)} />
                  </CInputGroup>
                </CCol>
                <CCol xs>
                <CFormLabel> Deliv price:</CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>DH</CInputGroupText>
                  <CFormInput placeholder="delevery price" name="deliv_price" aria-label="delevery price" onChange={(e)=>this.onchangehandler(e)} />
                  </CInputGroup>
                </CCol>
              </CRow>
          </CCardBody>
        </CCard>
      </CCol>
                </CRow>
        <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product Source</strong>
          </CCardHeader>
          <CCardBody>
              <CRow>
                <CCol xl>
                <CFormLabel>Product Source</CFormLabel>
                  <CFormInput placeholder="person or company.. name" name="source" aria-label="product source" onChange={(e)=>this.onchangehandler(e)} />
                </CCol>
                <CCol xs>
                <CFormLabel>Link</CFormLabel>
                  <CFormInput placeholder="Web page or phone.." name="link" aria-label="Link" onChange={(e)=>this.onchangehandler(e)} />
                </CCol>
                <CCol xs>
                <CFormLabel>Product Status</CFormLabel>
                  <CFormSelect name="status" onChange={(e)=>this.onchangehandler(e)}>
                    <option>select a status</option>
                    <option>Pending</option>
                    <option>Stock</option>
                  </CFormSelect>
                </CCol>
              </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product Features</strong>
          </CCardHeader>
          <CCardBody>
           
              <CRow className='mb-3'>
                <CCol xs>
                <CFormLabel>Category</CFormLabel>
                  <CFormSelect onChange={(e)=>this.onchangeCategory(e)}>
                    <option>select a category</option>
                    {this.state.categories.map((category,ind)=><option key={ind} value={category.id}>{category.name}</option>
                    )}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow>
              {this.state.selectedC.map((gauge,ind)=>{
                 return(
                  <CCol xl key={ind}>
                  <CFormLabel>{gauge.name}</CFormLabel>
                    <CFormInput name={gauge.name} aria-label="product source" onChange={(e)=>this.onchangeGauge(e)} />
                  </CCol>
                 )
                }
                )}
              </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>
      <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product images</strong>
          </CCardHeader>
          <CCardBody>
              <CRow>
                <CCol xs>
                <DropZone onDrop={this.onDrop} accept={"image/*"}/>
                </CCol>
                <CCol xs>
                <ImageGrid images={this.state.images} />
                </CCol>
              </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} className="text-center">
        <CButton color="info" onClick={()=>this.pushProduct()} disabled={this.state.isLoading} type="submit">
         {this.state.isLoading ? <LoadingSpinner /> : "add product"}
        </CButton>
        </CCol>
      </CRow>
      </CCardBody>
      </CCard>
       )
    }
}
export default Add_product;