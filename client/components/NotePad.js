  // const root = document.getElementById("root");
  // const h1tag = document.createElement("h1");
  // root.appendChild(h1tag);
  // h1tag.innerText = "Hello worlds"
class NotePad {
 
 
 static appendToDiv(className){
    const notePad = document.getElementsByClassName(className);
    const task = document.createElement("h1");
    task.innerText = "my first task"
    for(let i=0; i<notePad.length; i++){
     notePad[i].appendChild(task);
    }
 }


}

export default NotePad;