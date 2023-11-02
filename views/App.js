/*The static keyword defines a static method or property for a class. Static members 
*(properties and methods) are called without instantiating their class and cannot be 
*called through a class instance. Static methods are often used to create utility 
*functions for an application, whereas static properties are useful for caches, 
*fixed-configuration, or any other data you don't need to be replicated across instances.
*/
import DOM from './library/dom';
import Login from './pages/Login';
import Todo from './pages/Todo';
import observable from './library/dataCenter';

const initialState = {
  currentPage: 'login'
}


function App() {
  let state = initialState;

  function changepage(newState) {

    state.currentPage = newState.currentPage;
    console.log('subscriber')
    
    DOM.rerender(App());
  
  }

  observable.subscribe(changepage);


  switch (state.currentPage) {
    case 'login':
      return Login();
    case 'todo':
      return Todo();
  }

}

export default App;