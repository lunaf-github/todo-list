import DOM from '../libraries/dom'
import observable from '../libraries/dataCenter';
function Login() {

    async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({username: username.value})
        });
        const data = await res.json();
        
        sessionStorage.setItem('token', data.accessToken);
        observable.setState({currentPage: 'todo'});
    }

    const password = DOM.createElement('input', {type: 'password', placeholder: 'Password', name:'password'});
    const username = DOM.createElement('input', {type: 'text', placeholder: 'Username', name:'username'});
    const loginBtn = DOM.createElement('button', {onclick: handleLogin}, 'Login')
   
    const form = DOM.createElement('form', {class:'login-form'}, [username, password, loginBtn])
    
    return  DOM.createElement('div', {class: 'login'}, form);
}

export default Login;