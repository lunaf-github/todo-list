import DOM2 from '../libraries/doms';
import observable from '../libraries/dataCenter';

const { nav, div, img, button, h1 } = DOM2;     


const NavBar = function({page}) {


    async function handleLogout() {
        observable.setState({currentPage: 'login'});
    }

    async function handleSignup() {
        observable.setState({currentPage: 'signup'});
    }

    function handleCancel() {
        observable.setState({currentPage: 'login'});
    }

    const buttons = [];
    if (page === 'login') {
        buttons.push(button({type: 'button', onclick: handleSignup}, 'Signup'))
    } else if (page === 'signup') {
        buttons.push(button({type: 'button', onclick: handleCancel}, 'cancel'))
    } else {
        buttons.push(button({type: 'button', onclick: handleLogout}, 'Logout'))
    }
    
    return (
        nav({class: 'app_popout-border theme--light'}, [
            div({class: 'logo-container'}, [
                img({src: './logo.png', class: 'logo'}),
                h1({},'To-Do List')
            ]),
            div({},
                buttons    
            )
        ])
    )
}

export default NavBar;