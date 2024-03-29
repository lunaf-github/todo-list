/*The static keyword defines a static method or property for a class. Static members 
*(properties and methods) are called without instantiating their class and cannot be 
*called through a class instance. Static methods are often used to create utility 
*functions for an application, whereas static properties are useful for caches, 
*fixed-configuration, or any other data you don't need to be replicated across instances.
*/
import DOM from './libraries/dom';
import Login from './pages/Login';
import Todo from './pages/Todo';
import observable from './libraries/dataCenter';
import Signup from './pages/Signup';


const initialState = {
  currentPage: 'login'
}


function App() {
  let state = initialState;

  observable.subscribe(changepage)


  function changepage(newState) {
    state.currentPage = newState.currentPage;
    observable.unsubscribe(changepage);
    DOM.rerender(App());
  }



  switch (state.currentPage) {
    case 'login':
      return Login();
    case 'todo':
      return Todo();
    case 'signup':
      return Signup();
  }

}

export default App;