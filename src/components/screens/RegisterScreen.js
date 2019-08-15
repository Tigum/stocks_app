import React, { Component } from 'react'
import Form from '../common/Form'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import {
    nameChange,
    lastNameChange,
    emailChange,
    passwordChange,
    confirmPasswordChange,
    registerNewUser, 
    registrationError,
    checkIfUserAlreadyLoggedIn
} from '../../actions'

class RegisterScreen extends Component {

    state = {
        error: null
    }

    componentWillMount() {
        this.props.checkIfUserAlreadyLoggedIn()
    }

    componentWillReceiveProps(nextProps){
        if(this.props.error !== nextProps.error) {
            this.setState({ error: nextProps.error})
        }
    }

    registerUser(){
        const { name, lastName, email, password, confirmPassword} = this.props
        this.props.registerNewUser(name, lastName, email, password, confirmPassword)
    }

    handleError() {
        return this.state.error ? <h5 style={styles.error}>{this.state.error}</h5> : null
    }

    render() {
        return (
            <Form maxWidth='450px'>
                <h2 style={styles.title}>Register</h2>
                {this.handleError()}
                <form noValidate autoComplete='off' style={styles.form}>
                    <TextField
                        label='Name'
                        style={styles.textInput}
                        onChange={e => this.props.nameChange(e.target.value)}
                        value={this.props.name}
                    />
                    <TextField
                        label='Last name'
                        style={styles.textInput}
                        onChange={e => this.props.lastNameChange(e.target.value)}
                        value={this.props.lastName}
                    />
                    <TextField
                        label='E-mail'
                        style={styles.textInput}
                        onChange={e => this.props.emailChange(e.target.value)}
                        value={this.props.email}
                    />
                    <TextField
                        label='Password'
                        style={styles.textInput}
                        onChange={e => this.props.passwordChange(e.target.value)}
                        value={this.props.password}
                        type='password'
                    />
                    <TextField
                        label='Confirm password'
                        style={styles.textInput}
                        onChange={e => this.props.confirmPasswordChange(e.target.value)}
                        value={this.props.confirmPassword}
                        type='password'
                    />
                </form>
                <Button variant='contained' color='primary' style={styles.signInButton} onClick={this.registerUser.bind(this)}>
                    Register
                </Button>
                <a href='/'>
                    <h5 style={styles.links}>Already have an account? Log in</h5>
                </a>
            </Form>
        )
    }
}

const styles = {
    textInput: {
        width: '80%',
        margin: 10
    },
    signInButton: {
        marginTop: 40,
        width: '83%',
        marginBottom: 50
    },
    links: {
        margin: 10
    },
    title: {
        color: 'grey'
    },
    error:{
        color: '#ff7e7e',
        fontWeight: 400,
        margin: 0
    }
}

const mapStateToProps = ({auth}) => {
    const { name, lastName, email, password, confirmPassword, error } = auth
    return {
        name,
        lastName,
        email,
        password,
        confirmPassword,
        error
    }
}

export default connect(mapStateToProps,
    {
        nameChange,
        lastNameChange,
        emailChange,
        passwordChange,
        confirmPasswordChange,
        registerNewUser,
        registrationError,
        checkIfUserAlreadyLoggedIn
    })(RegisterScreen)