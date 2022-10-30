import React from 'react'

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import axios from 'axios'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

class Dashboard extends React.Component {

  constructor(){
    super();
    this.state={
      stocks:[],
      pendings:[],
      sells:[],
    }
  }
    getWidgetData=()=>{
   
  }
  //dashboard
    random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

componentDidMount=async()=>{
    const res_1= await axios.get("http://localhost:8080/getStockProducts");
    const res_3=await axios.get("http://localhost:8080/getSellProducts");
    const res_2=await axios.get("http://localhost:8080/getPendingProducts");
    const product=res_1.data.reduce((acc,product)=>acc+product.init_quantity,0)
    const income=res_3.data.reduce((partialsum,sell)=>partialsum+sell.sellPrice*sell.sellQuantity,0);
    const spentOne=res_1.data.reduce((partialsum,stock)=>partialsum+stock.init_quantity*(stock.unit_price+stock.deliv_price),0);
    const spentTwo=res_2.data.reduce((partialsum,pending)=>partialsum+pending.init_quantity*(pending.unit_price+pending.deliv_price),0);
  //income
    let data_income=[0,0,0,0,0,0,0,0,0,0,0,0];
    let startDate=new Date("01/01/2022");
    let endDate=new Date("01/31/2022");
  data_income=data_income.map(()=>{
    let filterdata=res_3.data.filter((sell)=>{
      let date=new Date(sell.sellDate);
      if(startDate<=date && date<= endDate) return true;
      else return false;
    })
      startDate.setMonth(startDate.getMonth()+1);
      endDate.setMonth(startDate.getMonth()+1,0);
     return filterdata.reduce((acc,data)=>data.sellQuantity*data.sellPrice+acc,0)
      });
      //spent
      let data_spent=[0,0,0,0,0,0,0,0,0,0,0,0];
      startDate=new Date("01/01/2022");
      endDate=new Date("01/31/2022");
      data_spent=data_spent.map(()=>{
        let filterdataOne=res_2.data.filter((spent)=>{
          let date=new Date(spent.date);
          if(startDate<=date && date<= endDate) return true;
          else return false;
        })
        let filterdataTwo=res_1.data.filter((spent)=>{
          let date=new Date(spent.date);
          if(startDate<=date && date<= endDate) return true;
          else return false;
        })
          startDate.setMonth(startDate.getMonth()+1);
          endDate.setMonth(startDate.getMonth()+1,0);
         return filterdataOne.reduce((acc,data)=>data.init_quantity*data.unit_price+acc,0)+filterdataTwo.reduce((acc,data)=>data.init_quantity*data.unit_price+acc,0)
          });
      //va
      let data_va=data_income.map((income,ind)=>income-data_spent[ind]);

    this.setState((prev)=>{
      return {...prev,sells:res_3.data,stocks:res_1.data,pendings:res_2.data,widgetData:{products:product,incomes:income,spents:spentOne+spentTwo,vadded:income-spentOne-spentTwo},cDataIncomes:data_income,cDataSpents:data_spent,cDataVa:data_va};
    });
  };

render(){
  if (!this.state.widgetData) {
    return <div />
}
  return (
    <>
      <WidgetsDropdown vadded={this.state.widgetData.vadded} spents={this.state.widgetData.spents} products={this.state.widgetData.products} incomes={this.state.widgetData.incomes}  />
      <CCard className="mb-4">
        {console.log(this.state)}
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ["January","February","March","April","May","June","July","August","September","October","November","December"],
              datasets: [
                {
                  label: 'Spents',
                  backgroundColor: hexToRgba(getStyle('--cui-danger'), 10),
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 2,
                  data:this.state.cDataSpents,
                  fill: true,
                },
                {
                  label: 'Incomes',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: this.state.cDataIncomes
                },
                {
                  label: 'Added value',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-primary'),
                  pointHoverBackgroundColor: getStyle('--cui-primary'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data:this.state.cDataVa,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          
        </CCardFooter>
      </CCard>
    </>
  )
          }
}

export default Dashboard
