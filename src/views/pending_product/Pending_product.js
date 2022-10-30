import React,{Component} from 'react'
import ProductView from 'src/components/modals/ProductView';
import {
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem,
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
import {cilBasket, cilElevator, cilTrash, cilWarning} from "@coreui/icons"
import CIcon from '@coreui/icons-react';
import MyModal from 'src/components/modals/MyModal';
import axios from 'axios'

class Pending_product extends Component{
    constructor(){
        super();
        this.state={
          isModalOpen:false,
          isCopen: false,
          isDopen:false,
          product:{  name:"" ,id:""}, 
          selectedProduct:{},
          selectedGaugeProducts:[{product:{id:0},gauge:{name:""}}]
      }
    }
    componentDidMount(){
      this.getPendingProducts();
      this.getproductGauges();
    }
    ShowDmodal=(pId,pName)=>{
      this.setState({isCopen: true, isDopen:false,product:{name:pName,id:pId}});
 
     }
     hideDmodal=()=>{
      this.setState({isCopen: false, isDopen:false,product:{name:"",id:""}});  
      }
      ShowCmodal=(pId,pName)=>{
        this.setState({isCopen: false, isDopen:true,product:{name:pName,id:pId}});  
      }
      hideCmodal=()=>{
        this.setState({isCopen: false, isDopen:false,product:{name:"",id:""}});  
      }
      getPendingProducts=async()=>{
        await axios.get("http://localhost:8080/getPendingProducts").then((res)=>{
          this.setState({...this.state,PendingProducts:res.data});
        });
      }
      deletePending=async(id)=>{
        let res=await axios.delete(`http://localhost:8080/deleteProduct/${id}`);
       this.setState({...this.state,product:{}});
       this.getPendingProducts();
      }
      toStock=async(id)=>{
        let res=await axios.get(`http://localhost:8080/toStock/${id}`);
       this.setState({...this.state,product:{}});
       this.getPendingProducts();
      }

      showModal=(product)=>{
        this.setState((prev)=>{
          let arr=this.state.product_gauges.filter((gaugeproduct)=>
          {
            if(product.id==gaugeproduct.product.id) return gaugeproduct;
          })
          return{...prev,selectedGaugeProducts:arr};
        });
         console.log(this.state);
        this.setState((prev)=>{return{...prev,selectedProduct:product,isModalOpen:true,images:[]}});
        product.images.map((image,ind)=>{
        let img={id:ind,src:`data:image/jpeg;base64,${image.data}`}
        this.setState((prev)=>{return{...prev,images:[...prev.images,img]}}
         )});
       }
      hideModal=()=>{
      this.setState({...this.state,isModalOpen:false});
      }
      getproductGauges=async()=>{
        await axios.get("http://localhost:8080/getProductGauges").then((res)=>{
          this.setState({...this.state,product_gauges:res.data});
        });
      }

    render(){
      if (!this.state.PendingProducts) {
        return <div />
    }
        return (
            <div>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                         <p>list of pending product</p>
                        </CCardHeader>
                        <CCardBody>
                        <CTable>
                <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Unit_price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Deliv_price</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {
                    this.state.PendingProducts.map((pending,ind)=>{
                      return(
                      <CTableRow key={ind}>
                      <CTableHeaderCell scope="col">{pending.name}</CTableHeaderCell>
                      <CTableHeaderCell scope="col">{pending.category.name}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{pending.quantity}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{pending.unit_price}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{pending.deliv_price}</CTableHeaderCell>
                    <CTableDataCell>
                     <a className='text-success te m-3' id={pending.id}><CIcon icon={cilBasket} size='xl' onClick={()=>this.ShowCmodal(pending.id,pending.name)}></CIcon></a>
                     <a className='text-danger te' id={pending.id}><CIcon icon={cilTrash} size='xl' onClick={()=>this.ShowDmodal(pending.id,pending.name)}></CIcon></a>
                     <a className='text-info te m-3' id={pending.id}  onClick={()=>this.showModal(pending)}><CIcon icon={cilElevator} size='xl'></CIcon></a>
                    </CTableDataCell>
                    </CTableRow>)
                    })
                   } 
                </CTableBody>
              </CTable>
              <MyModal  isOpen={this.state.isDopen} class={"alert alert-warning"} variante={"warning"} message={"Are you sure you want to move the product "+this.state.product.name} hidemodal={()=>this.hideDmodal()} id={this.state.product.id} operation={this.toStock}/>
              <MyModal  isOpen={this.state.isCopen} class={"alert alert-danger"} variante={"danger"} message={"Are you sure you want to delete the product"+this.state.product.name} hidemodal={()=>this.hideCmodal()} id={this.state.product.id} operation={this.deletePending}  />
              <ProductView isOpen={this.state.isModalOpen} hideModal={this.hideModal} product={this.state.selectedProduct} images={this.state.images} selectedGaugeProducts={this.state.selectedGaugeProducts}/>
                       </CCardBody>
      </CCard>
      </CCol>
          </CRow>
          </div>
        )

    }

}
export default Pending_product;