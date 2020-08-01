import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'

class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle =() => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth
        
        const AuthLinks = () => (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">Welcome { user.name }</span>
                </NavItem>
                <NavItem>
                <Logout/>
                </NavItem>
            </Fragment>
        )

        const GuestLinks = () => (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>  
        )

        return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                           { isAuthenticated ? <AuthLinks/> : <GuestLinks/> } 
                        </Nav>
                    </Collapse>
                </Container>

            </Navbar>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps) (AppNavBar)