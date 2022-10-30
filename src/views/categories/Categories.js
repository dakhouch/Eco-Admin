import React, { Component } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CAccordion,
    CAccordionHeader,
    CAccordionBody,
    CAccordionItem,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CRow,
    CButton,
    CContainer
  } from '@coreui/react'
import axios from 'axios'
import CategoryCard from 'src/components/CategoryCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Categories extends Component{
    constructor(){
        super();
        this.state={
         name:"",
         gaugeList:[],
         gauges:{
            index: 1,
            title:["gauge 1"]
         
        },  
    }
        this.addGaugeHandler=this.addGaugeHandler.bind(this);
        
    }
    componentDidMount(){
      this.getCategory();
      this.getStockProducts();
      this.getPendingProducts();
      this.getsellProducts();
    }
    showToastSuccess = () => {
      toast.success('the category has been deleted successfully', {
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
   pushCategory=async()=>{
    let data={
      name:this.state.name,
      gaugeList:this.state.gaugeList
    }
      let res=await axios.post("http://localhost:8080/addCategory",data)
      this.getCategory();
    }
    deleteCategory=async(id)=>{
      let ind=true;
      let res = await axios.delete(`http://localhost:8080/deleteCategory/${id}`).then((res) => {
        ind=ind && true;
      }).catch((error) => {
       ind=ind && false;
      });
      if(ind) {this.showToastSuccess();}
      else {this.showToastDanger();}
      this.getCategory();
    }
        addGaugeHandler(){
        this.setState((prevstate)=>{
            prevstate.gauges.index++;
            prevstate.gauges.title.push("gauge "+prevstate.gauges.index);
            return {
                    ...prevstate.name,
                    ...prevstate.gaugeList,
                    gauges:{
                        index:prevstate.gauges.index,
                        title: prevstate.gauges.title
                    },
                    ...prevstate.categories
            };
             });
    
    }
    categoryhandler=(e)=>{
      this.setState((prevstate)=>{
       return{
      [e.target.name]:e.target.value,
           ...prevstate.gaugeList
        ,...prevstate.gauges,
        ...prevstate.categories
      }});
    }
    
    gaugehandler=(e,ind)=>{
      const fromDb = undefined;
      let values=this.state.gaugeList || fromDb ;
      values[ind]={name:e.target.value};
      this.setState((prevstate)=>{
       return{
       ...prevstate.name,
         gaugeList:values
        ,...prevstate.gauges,
        ...prevstate.categories
      }});
    }

    getPendingProducts=async()=>{
      let res=await axios.get("http://localhost:8080/getPendingProducts");
    this.setState({...this.state,PendingProducts:res.data});
    }
    getStockProducts=async()=>{
      let res=await axios.get("http://localhost:8080/getStockProducts");
    this.setState((prev)=>{return {...prev,stockProducts:res.data}});
    console.log(res.data);
    }

    getsellProducts=async()=>{
      let res=await axios.get("http://localhost:8080/getSellProducts");
      this.setState({...this.state,sellProducts:res.data});
    }

    render(){
      if (!this.state.categories || !this.state.stockProducts || !this.state.PendingProducts || !this.state.sellProducts) {
        return <div />
    }
        return(
            <CContainer className='mb-3'>
              <ToastContainer/>
            <CRow className='mb-2'>
            <CAccordion>
                <CAccordionItem>
                <CAccordionHeader>Add category</CAccordionHeader>
                <CAccordionBody>
                    
                <CForm onSubmit={()=>this.createCategory}
      className="row g-3 needs-validation"
    >
      <CRow className='mt-3'>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustomUsername">name</CFormLabel>
          <CFormInput
            type="text"
            id="validationCustomName"
            defaultValue=""
            aria-describedby="inputGroupPrepend"
            name='name'
            onChange={this.categoryhandler}
            required
          />
        </CCol>
      </CRow>
      <CRow className='mt-3'>
        {this.state.gauges.title.map((gauge,ind)=>{
             return(
                <CCol md={3} className='mb-2' key={ind}>
                <CFormLabel htmlFor={'validationGauge'+ind} >{gauge}</CFormLabel>
                <CFormInput type="text" id={'validationGauge'+ind} onChange={(e)=>this.gaugehandler(e,ind)} required />
                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
              </CCol>  
             )

        })}
     
      <CCol xs={2} className='align-self-end mb-2' >
        <CButton color="warning" type="button" onClick={this.addGaugeHandler}>
          add a gauge
        </CButton>
      </CCol>
      </CRow>
      <CRow className='mt-2'>
      <CCol xs={2} className='align-self-end mb-2' >
        <CButton color="info" onClick={(e)=>this.pushCategory()}>
          add category
        </CButton>
      </CCol>
      </CRow>
    </CForm>


                    </CAccordionBody>
                </CAccordionItem>
            </CAccordion>
          </CRow>
            <CCard>
                <CCardHeader>List of categories</CCardHeader>
                <CCardBody>
            <CRow>
          {this.state.categories.map((category)=>{
             let pending=this.state.PendingProducts.reduce((acc,product)=>{
              if(product.category.id==category.id) return acc+product.quantity;
             },0)
             let stock=this.state.stockProducts.reduce((acc,product)=>{
              if(product.category.id==category.id) return acc+product.quantity;
             },0)
             let sell=this.state.sellProducts.reduce((acc,sellProduct)=>{
              if(sellProduct.product.category.id==category.id) return acc+sellProduct.sellQuantity;
             },0)
            return  <CategoryCard key={category.id} name={category.name} id={category.id} delete={this.deleteCategory} pending={pending? pending : "0"} stock={stock? stock : "0"} sell={sell? sell:"0"} />
              } ) }
          </CRow>
          </CCardBody>
          </CCard>
          </CContainer>
        )
    }
}

export default Categories;