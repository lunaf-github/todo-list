import observable from '../libraries/dataCenter';

import DOM2 from '../libraries/doms';
import NavBar from '../components/NavBar';

const {div, button, input, form, p} = DOM2;


function Signup() {

    let warning = null;
    async function handleSignup(e) {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');

        if (!username) {
            warning = 'Please enter username';
            return;
        }

        if (!newPassword) {
            warning = 'Please enter new password';
            return;
        }

        if (!confirmPassword) {
            warning = 'Please confirm new password';
            return;
        }

        if (newPassword !== confirmPassword) {
            warning = 'passwords do not match';
            return;
        }

        if (newPassword.length < 8) {
            warning = 'password needs to be at least 8 characters in length';
            return;
        }

        const res = await fetch('/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({username, newPassword})
        });
        
        const data = await res.json();     
        observable.setState({currentPage: 'login'});
    }

    return (
        div({class: 'signup'}, [
            NavBar({page: 'signup'}),
            div({class: 'form-container app_popout-border'},
                form({class:'vertical-form', onsubmit: handleSignup}, [
                    input({type: 'text', placeholder: 'Username', name:'username'}), 
                    input({type: 'text', placeholder: 'New password', name:'newPassword'}),
                    input({type: 'text', placeholder: 'Confirm new password', name: 'confirmPassword'}), 
                    button({class: 'form-button'}, 'signup')
                ])
            ),
            
        ]
        )
    );
}

export default Signup;