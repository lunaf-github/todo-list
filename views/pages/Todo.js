import DOM from '../library/dom';


function Todo() {

    function handleAddTask(e) {
        e.preventDefault();
        const formData = new FormData(taskInputForm)

        const newTask = formData.get('addTaskInput')
    }

    const mainHeader = DOM.createElement('h1', {}, 'TO DO List')
    const taskInput = DOM.createElement(
        'input', 
        {type: 'text', placeholder: 'Enter new task', name: 'addTaskInput'}
    );
    const addTaskBtn = DOM.createElement('button', {}, 'Add');


    const taskInputForm = DOM.createElement('form', {onsubmit: handleAddTask}, [taskInput, addTaskBtn]);
    const formContainer = DOM.createElement('div', {class: 'user-inputs_container'}, taskInputForm);




    return formContainer;
}

export default Todo;