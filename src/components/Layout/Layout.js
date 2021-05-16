import MainNavigation from './MainNavigation';

function Layout (props) {
    return (
        <div>
            <MainNavigation></MainNavigation>
            <main>{props.children}</main>
        </div>


    );
};

export default Layout;