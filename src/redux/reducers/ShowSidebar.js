import React from "react";

const ShowSidebar = (state = true,action) => {
    switch (action.type) {
      case "set":
        return state=action.value;
      default:
        return state=false;
    }
  }
  export default ShowSidebar;