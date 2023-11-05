import DOM2 from '../libraries/doms';
import NavBar from '../components/NavBar';

const {h1, div, button, input, form, ul, li} = DOM2;


function Todo() {

    function handleAddTask(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const newTask = formData.get('addTaskInput')
        e.currentTarget.reset()
        taskContainer.append(li({}, newTask))
    }


    const taskContainer = ul();

    return (
        div({},[
            NavBar({pageType: 'login'}),
            div({}, 
                form({onsubmit: handleAddTask, class: 'user-inputs_container theme--light'},[
                    input({type: 'text', placeholder: 'Enter new task', name: 'addTaskInput'}),
                    button({class: 'button--light'},
                        'Add' 
                    )
                ])
            ),
            taskContainer
        ])
    );
}



export default Todo;