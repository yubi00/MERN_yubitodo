import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    NavLink,
    Input,
    Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorsActions'

class LoginModal extends Component {
 state = {
     modal: false,
     email: '',
     password: '',
     message: null
 }

 static propTypes = {
     isAuthenticated: PropTypes.bool,
     error: PropTypes.object.isRequired,
     login: PropTypes.func.isRequired,
     clearErrors: PropTypes.func.isRequired
 }

 componentDidUpdate(prevProps) {
     const { error, isAuthenticated  } = this.props
     if( error !== prevProps.error) {
         //check for register error
         if(error.id === 'LOGIN_FAIL') {
             this.setState({ message: error.message.message })
         } else {
             this.setState({ message: null })
         }
     }

     if(this.state.modal) {
         if( isAuthenticated ) {
             this.toggle()
         }
     }
 }

 toggle = () => {
     //clear errors
     this.props.clearErrors()
     this.setState({
         modal: !this.state.modal
     })
 }

 onChange = (e) => {
     this.setState({
         [e.target.name]: e.target.value
     })
     this.setState({ message: null })
 }

 onSubmit = (e) => {
     e.preventDefault()
    const { email, password } = this.state
    const user = {
        email,
        password
    } 
    //attempt to login
    this.props.login(user)
 }
 render() {
     return (
         <div>
            <NavLink onClick={this.toggle} href="#">Login</NavLink>
             <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
             >
                 <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                <ModalBody>
                {this.state.message && <Alert color="danger">{this.state.message}</Alert>}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder="email"
                            onChange={this.onChange}
                            />
                            <Label for="password">Password</Label>
                            <Input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={this.onChange}
                            />
                        <Button
                            color="dark"
                            style={{marginTop: '2rem'}}
                            block
                        >Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
             </Modal>
         </div>
     )
 }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)
