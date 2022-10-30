import ApplyModal from "./ApplyModal";
import ModalState from "./ModalState";
import { combineReducers } from "redux";
import ShowSidebar from "./ShowSidebar";


const allReducers=combineReducers({ApplyModal:ApplyModal,ModalState:ModalState,ShowSidebar:ShowSidebar});

export default allReducers;