import React , {Component} from 'react'
import ModalBuy from 'src/components/modals/ModalBuy';
import "bootstrap/dist/css/bootstrap.min.css";
import ProductView from 'src/components/modals/ProductView';
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
import { cilCart,cilElevator,cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import MyModal from 'src/components/modals/MyModal';
import store from 'src/store';
import ShowModal from 'src/redux/actions/ShowModal'
import DangerModal from 'src/redux/actions/DangerModal';
import HideModal from 'src/redux/actions/HideModal';
import axios from 'axios'
import ModalView from 'src/components/modals/SellView'

class Stock extends Component{
    constructor(){
        super();
        this.state={
          product:{name:"",id:""},
          selectedProduct:{images:[{data:{}}]},
          isModalOpen:false,
          isOpen:false,
          store:store.getState(),
          sellProduct:{},
          selectedGaugeProducts:[{product:{id:0},gauge:{name:""}}],
          images:[]}
  }
  componentDidMount(){
    this.getStockProducts();
    this.getproductGauges();
  }
  Showmodal=(pId,pName)=>{
     store.dispatch(DangerModal());
     store.dispatch(ShowModal());
     this.setState({product:{name:pName,id:pId},store:store.getState()});

    }
    hidemodal=()=>{
      store.dispatch(HideModal());
      this.setState({product:{name:"",id:""},store:store.getState()});
     }
     Showbmodal=(pId)=>{
      this.setState({product:{name:"",id:pId},sellProduct:{product:{id:pId}},isOpen:true,store:store.getState()});
     }
     hidebmodal=()=>{
      this.setState({product:{name:"",id:""},isOpen:false,store:store.getState()});
      }
      getStockProducts=async()=>{
        let res=await axios.get("http://localhost:8080/getStockProducts");
      this.setState((prev)=>{return {...prev,stockProducts:res.data}});
      }
      deleteStock=async(id)=>{
       await axios.delete(`http://localhost:8080/deleteStockProduct/${id}`);
       this.setState({...this.state,product:{}});
       this.getStockProducts();
      }
      onChangeHandler=(e)=>{
        this.setState({...this.state,sellProduct:{...this.state.sellProduct,[e.target.name]:e.target.value}});
      }
      getdate=(time)=>{
        this.setState((prev)=>{
          return {
          ...prev,
         sellProduct:{...prev.sellProduct,sellDate:time}
        }}); 

      }
      sellProduct=async()=>{
        let res=await axios.post("http://localhost:8080/sellProduct",this.state.sellProduct)
        this.getStockProducts();
      }
      showModal=(product)=>{
        this.setState((prev)=>{
          let arr=this.state.product_gauges.filter((gaugeproduct)=>
          {
            if(product.id==gaugeproduct.product.id) return gaugeproduct;
          })
          return{...prev,selectedGaugeProducts:arr};
        });
        this.setState((prev)=>{return{...prev,isModalOpen:true,selectedProduct:product}});
        product.images.map((image,ind)=>{
        let img={id:ind,src:`data:image/jpeg;base64,${image.data}`}
        this.setState((prev)=>{return{...prev,images:[...prev.images,img]}}
         )});
       }
      hideModal=()=>{
      this.setState({...this.state,isModalOpen:false});
      }
      getproductGauges=async()=>{
        let res=await axios.get("http://localhost:8080/getProductGauges");
        this.setState({...this.state,product_gauges:res.data});
      }
    render(){
      if (!this.state.stockProducts) {
        return <div />
    }
        return (
            <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                     <p>list of stock</p>
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
                    this.state.stockProducts.map((stock,ind)=>{
                      return(
                      <CTableRow key={ind}>
                      <CTableHeaderCell scope="col">{stock.name}</CTableHeaderCell>
                      <CTableHeaderCell scope="col">{stock.category.name}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{stock.quantity}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{stock.unit_price}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">{stock.deliv_price}</CTableHeaderCell>
                      <CTableDataCell>
                      <a className='text-success te m-3' id={stock.id}  onClick={()=>this.Showbmodal(stock.id)}><CIcon icon={cilCart} size='xl'></CIcon></a>
                       <a className='text-danger te' id={stock.id} onClick={()=>this.Showmodal(stock.id,stock.name)} ><CIcon icon={cilTrash} size='xl'></CIcon></a>
                       <a className='text-info te m-3' id={stock.id}  onClick={()=>this.showModal(stock)}><CIcon icon={cilElevator} size='xl'></CIcon></a>

                      </CTableDataCell>
                    </CTableRow>)
                    })
                   } 
                </CTableBody>
              </CTable>
              <ModalBuy isOpen={this.state.isOpen} hidemodal={()=>this.hidebmodal()} onChangeHandler={this.onChangeHandler} onchangeDate={this.getdate} operation={this.sellProduct} />
              <MyModal  isOpen={this.state.store.ModalState} class={this.state.store.ApplyModal.class} message={this.state.store.ApplyModal.message+this.state.product.name} hidemodal={()=>this.hidemodal()} id={this.state.product.id} operation={this.deleteStock} />
             <ProductView isOpen={this.state.isModalOpen} product={this.state.selectedProduct} hideModal={this.hideModal} images={this.state.images} selectedGaugeProducts={this.state.selectedGaugeProducts} />
         </CCardBody>
  </CCard>
  </CCol>
      </CRow>
        )
    }
}

export default Stock;