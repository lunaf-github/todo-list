import observable from '../libraries/dataCenter';

import DOM2 from '../libraries/doms';
import NavBar from '../components/NavBar';

const {div, button, input, form} = DOM2;


function Login() {

    async function handleLogin(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        if (!password || !username) {
            console.log('missing username or password');
            return;
        }

        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({username, password})
        });
        const data = await res.json();        
        
        if (data.accessToken) {
            sessionStorage.setItem('token', data.accessToken);
            observable.setState({currentPage: 'todo'});
        }
    }


    return (
        div({class: 'login'}, [
            NavBar({page: 'login'}),
            form({class:'login-form', onsubmit: handleLogin}, [
                input({type: 'text', placeholder: 'Username', name:'username'}), 
                input({type: 'password', placeholder: 'Password', name:'password'}), 
                button({}, 'Login')
            ])
        ]
        )
    );
}

export default Login;