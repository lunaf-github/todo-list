import DOM from '../libraries/dom'
import observable from '../libraries/dataCenter';

import DOM2 from '../libraries/doms';

const {div, button, input, form} = DOM2;


function Login() {

    async function handleLogin(e) {
        e.preventDefault();
        console.log(e.currentTarget)
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({username, password})
        });
        
        const data = await res.json();        
        sessionStorage.setItem('token', data.accessToken);
        observable.setState({currentPage: 'todo'});
    }


    return (
        div({class: 'login'}, 
            form({class:'login-form', onsubmit: handleLogin}, [
                input({type: 'password', placeholder: 'Password', name:'password'}), 
                input({type: 'text', placeholder: 'Username', name:'username'}), 
                button({}, 'Login')
            ])
        )
    );
}

export default Login;