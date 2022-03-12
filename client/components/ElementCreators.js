class Create {

  static div(newDivClassName, containerSelectorType, containerSelectorName ){
   const newDiv = document.createElement("div");
   newDiv.classList.add(newDivClassName)
  
   if(containerSelectorType === "id"){
     const container = document.getElementById(containerSelectorName);
     container.appendChild(newDiv)
   }
   
   if (containerSelectorType === "class"){
     const containers = document.getElementsByClassName(containerSelectorName)
     for(let i=0; i < containers.length; i++){
       container[i].appendChild(newDiv)
     }
   }
  }
}

export default Create;