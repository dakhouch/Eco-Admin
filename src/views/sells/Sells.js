import React, {Component} from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import axios from 'axios';
import { cibEyeem, cilElevator, cilEyedropper } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import SellView from 'src/components/modals/SellView';




class Sells extends Component{

    constructor(){
        super();
        this.state={
          isModalOpen:false,
          selectedSell:{product:{name:"",quantity:"",category:{name:""},images:[{data:{}}]}},
          images:[],
          selectedGaugeProducts:[{product:{id:0},gauge:{name:"",value:""}}],
        }
      }
      componentDidMount=()=>{
        this.getsellProducts();
        this.getproductGauges();
      }
    showModal=(sell)=>{
     this.setState((prev)=>{
      let arr=this.state.product_gauges.filter((gaugeproduct)=>
      {
        if(sell.product.id==gaugeproduct.product.id) return gaugeproduct;
      })
      return{...prev,selectedGaugeProducts:arr,selectedSell:sell,isModalOpen:true,images:[]};
    });
     sell.product.images.map((image,ind)=>{
     let img={id:ind,src:`data:image/jpeg;base64,${image.data}`}
     this.setState((prev)=>{return{...prev,images:[...prev.images,img]}}
      )});
    }
   hideModal=()=>{
   this.setState({...this.state,isModalOpen:false});
   }
    getsellProducts=async()=>{
      let res=await axios.get("http://localhost:8080/getSellProducts");
      this.setState({...this.state,sellProducts:res.data,selectedSell:res.data[0]});
    }
    getproductGauges=async()=>{
      let res=await axios.get("http://localhost:8080/getProductGauges");
      this.setState({...this.state,product_gauges:res.data});
    }
    render(){
      if (!this.state.sellProducts || !this.state.product_gauges) {
        return <div />
    }
       return (
        <CRow>
        <CCol>
            <CCard>
                <CCardHeader>
                 <p>list of sells</p>
                </CCardHeader>
                <CCardBody>
                <CTable>
                <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sell Quantity</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sell Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Added value</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {
                    this.state.sellProducts.map((sell,ind)=>{
                      return(
                      <CTableRow key={ind}>
                      <CTableHeaderCell scope="col">{sell.product.name}</CTableHeaderCell>
                      <CTableHeaderCell scope="col">{sell.product.category.name}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{sell.sellQuantity}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{sell.sellPrice} DH</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{sell.sellPrice-sell.product.unit_price-sell.product.deliv_price} DH</CTableHeaderCell>
                      <CTableDataCell>
                      <a className='text-info te m-3' id={sell.id}  onClick={()=>this.showModal(sell)}><CIcon icon={cilElevator} size='xl'></CIcon></a>
                      </CTableDataCell>
                    </CTableRow>)
                    })
                   } 
                </CTableBody>
              </CTable>
              <SellView isOpen={this.state.isModalOpen} hideModal={this.hideModal} sell={this.state.selectedSell} images={this.state.images} selectedGaugeProducts={this.state.selectedGaugeProducts}/>
               </CCardBody>
</CCard>
</CCol>
  </CRow>
       ) 
    }

}

export default Sells;
