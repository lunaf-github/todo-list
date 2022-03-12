import Create from "./ElementCreators";

class Task {

  static newTask(newTaskClassName, containerSelectorType, containerSelectorName, text){
     Create.element("button", "checkbox", containerSelectorType,containerSelectorName, "check");
     Create.element("h2","text",containerSelectorType, containerSelectorName, text);
     Create.element("button", "delete", containerSelectorType,containerSelectorName, "delete");

     const deleteButtons = document.getElementsByClassName("delete");
     const checkButtons = document.getElementsByClassName("checkbox");

     for(let i=0; i < deleteButtons.length; i++){
        deleteButtons[i].setAttribute("id", `delete${i}`);
        checkButtons[i].setAttribute("id",`check${i}`)
     }
     
  }

}

export default Task;