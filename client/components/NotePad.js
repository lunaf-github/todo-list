import Create from "./ElementCreators";
import Task from "./Task";


class NotePad {

 static load(className, tasks){
    Create.element("form","form","class","note-pad","");
    Create.element("input","textbox","class","note-pad","");
    Create.element("button","button","class","note-pad","Add Task");

    Create.div("tasks","class","note-pad");
    
    for(let i=0; i < tasks.length; i++){
      Create.div("bullet", "class", "tasks")
      Task.newTask("text","class","bullet",tasks[i])
    }

 }

}




export default NotePad;