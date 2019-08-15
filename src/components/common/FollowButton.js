import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { URI } from '../../actions/types';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux'
import { loadPortifolio } from '../../actions'

class FollowButton extends Component {
    _isMounted = true

    state = {
        following: false,
        loading: true,
    }

    async componentDidMount() {
        if (this._isMounted) {
            const { name, symbol, userId, region } = this.props
            try {
                const result = await axios.get(`${URI}/fetchStock`, { params: { name, symbol, userId, region } })
                this.setState({ following: result.data, loading: false })
            } catch (err) {
                console.log(err)
                return
            }
        }
    }

    async handleButton() {
        if (this._isMounted) {
            const { name, symbol, userId, region, currency, marketOpen, marketClose } = this.props
            if (this.state.following) {
                try {
                    await axios.post(`${URI}/unfollowStock`, { name, symbol, userId, region })
                    this.props.loadPortifolio(userId)
                    this.setState({ following: !this.state.following })
                } catch (err) {
                    console.log(err)
                    return
                }
            } else {
                try {
                    await axios.post(`${URI}/followStock`, { name, symbol, userId, region, currency, marketOpen, marketClose })
                    this.props.loadPortifolio(userId)
                    this.setState({ following: !this.state.following })
                } catch (err) {
                    console.log(err)
                    return
                }
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        const { classes } = this.props
        if (this.state.loading) {
            return (
                <div className={classes.buttonDiv}>
                    <CircularProgress size={20} />
                </div>
            )
        }
        return (
            <div className={classes.buttonDiv}>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.handleButton()}
                >
                    {this.state.following ? 'Unfollow' : 'Follow'}
                </Button>
            </div>
        )
    }
}

const styles = theme => ({
    buttonDiv: {
        width: '98.5%',
        textAlign: 'right',
        marginTop: -45,
        paddingBottom: 16
    }
});

export default connect(null, { loadPortifolio })(withStyles(styles)(FollowButton))