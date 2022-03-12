/*The static keyword defines a static method or property for a class. Static members 
*(properties and methods) are called without instantiating their class and cannot be 
*called through a class instance. Static methods are often used to create utility 
*functions for an application, whereas static properties are useful for caches, 
*fixed-configuration, or any other data you don't need to be replicated across instances.
*/

// const container = document.getElementById(id)
// const h1tag = document.createElement("h1");
// container.appendChild(h1tag);
// h1tag.innerText = "Hello worlds" 

import Create from "./ElementCreators";
import NotePad from "./NotePad";

class App{
  static tasks = ["task1", "task2", "task3", "task4"]

  static loadContent(root){
    Create.div("note-pad","id",root)
    NotePad.load("note-pad", App.tasks)
  }
}  







export default App;