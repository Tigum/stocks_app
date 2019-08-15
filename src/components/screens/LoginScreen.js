import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import Form from '../common/Form'
import { connect } from 'react-redux'
import { emailChange, passwordChange, loginUser, checkIfUserAlreadyLoggedIn } from '../../actions/auth_actions'

class LoginScreen extends Component {

    state = {
        error: null
    }

    componentWillMount() {
        this.props.checkIfUserAlreadyLoggedIn()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.error !== nextProps.error) {
            this.setState({ error: nextProps.error })
        }
    }

    handleError() {
        return this.state.error ? <h5 style={styles.error}>{this.state.error}</h5> : null
    }

    render() {
        const { email, password } = this.props
        return (
            <Form>
                <h2 style={styles.title}>Stock App</h2>
                {this.handleError()}
                <form noValidate autoComplete='off'>
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
                        type="password"
                    />
                </form>
                <Button variant='contained' color='primary' style={styles.signInButton} onClick={() => this.props.loginUser(email, password)}>
                    Sign in
                </Button>
                <a href='/register'>
                    <h5 style={styles.links}>Register for new account</h5>
                </a>
                {/* <a href='/forgot-password'>
                    <h5 style={styles.links}>Forgot password</h5>
                </a> */}
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
    error: {
        color: '#ff7e7e',
        fontWeight: 400,
        margin: 0
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error } = auth
    return {
        email,
        password,
        error
    }
}

export default connect(mapStateToProps, { emailChange, passwordChange, loginUser, checkIfUserAlreadyLoggedIn })(LoginScreen)