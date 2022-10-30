import React from "react";

const ApplyModal=(state={class:"", message:""},action)=>{
switch(action.type){
    case "Warning":return state={class:"alert alert-warning", message:"Are you sure you want to move theproduct "};
    case "Danger": return state={class:"alert alert-danger", message:"Are you sure you want to delete "};
    case "Info":return state={class:"alert alert-Info", message:""};
    default: return state;
}
}
export default ApplyModal;