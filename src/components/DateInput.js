import CIcon from "@coreui/icons-react";
import React,{Component} from "react";
import DatePicker from "react-datepicker";
import {CInputGroupText,CInputGroup, CFormInput} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";
import { cilCalendar } from "@coreui/icons";

class DateInput extends Component{
constructor(props){
    super(props);
    this.state={
        startDate: new Date()
    };
    this.props.onchangeDatePlus(this.state.startDate.toLocaleDateString());
}
render(){

        return (
          <DatePicker
            selected={this.state.startDate}
            onChange={(date,e) => {this.setState((prevstate)=>{return {startDate: date}});this.props.onchangeDatePlus(date.toLocaleDateString())}}
            customInput={<CInputGroup><CFormInput value={this.state.startDate.toLocaleDateString()} name="date" /><CInputGroupText><CIcon icon={cilCalendar}></CIcon></CInputGroupText></CInputGroup>}
           
            />
        );
      };
}
export default DateInput