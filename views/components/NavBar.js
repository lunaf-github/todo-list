import DOM2 from '../libraries/doms';
import observable from '../libraries/dataCenter';

const { nav, div, img, button, h1 } = DOM2;     


const NavBar = function() {

    async function handleLogout() {
        observable.setState({currentPage: 'login'});
    }
    
    return (
        nav({class: 'app_popout-border theme--light'}, [
            div({class: 'logo-container'}, [
                img({src: './logo.png', class: 'logo'}),
                h1({},'To-Do List')
            ]),
            div({}, [
                button({type: 'button', onclick: handleLogout}, 'Logout'),
            ])
        ])
    )
}

export default NavBar;