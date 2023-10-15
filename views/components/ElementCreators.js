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
       containers[i].appendChild(newDiv)
     }
   }
  }

  static element(tagType, newDivClassName, containerSelectorType, containerSelectorName,innerText){
    const newElement = document.createElement(tagType);
    newElement.classList.add(newDivClassName);
    newElement.innerText = innerText;
   
    if(containerSelectorType === "id"){
      const container = document.getElementById(containerSelectorName);
      container.appendChild(newElement);
    };
    
    if (containerSelectorType === "class"){
      const containers = document.getElementsByClassName(containerSelectorName);
      for(let i=0; i < containers.length; i++){
        containers[i].appendChild(newElement);
      };
    };

  }


}

export default Create;