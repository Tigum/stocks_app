import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
} from '@material-ui/core'
import { Public, ExitToApp, FolderOpen, Search } from '@material-ui/icons'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions'
import history from '../history'
import SimpleModal from './SimpleModal'
import LettersAvatar from './LettersAvatar'

class SideMenu extends Component {

    state = {
        TOP_MENU_ITEMS: [
            { icon: <Public />, text: 'News' },
            { icon: <Search />, text: 'Search' },
            { icon: <FolderOpen />, text: 'My portifolio' }
        ],
        BOTTOM_MENU_ITEMS: [
            { icon: <ExitToApp />, text: 'Log out' }
        ],
        modal: false
    }

    handleOpen = () => {
        this.setState({ modal: true });
    };

    handleClose = () => {
        this.setState({ modal: false });
    };

    handleTopActions(item) {
        if (item === 'News') return history.push('/home')
        if (item === 'Search') return history.push('/search')
        if (item === 'My portifolio') return history.push('/my_portifolio')
    }

    handleBottomActions(item) {
        if (item === 'Log out') return this.setState({ modal: !this.state.modal });
    }

    getUserInitials() {
        if(!this.props.user) return
        const { name, lastName } = this.props.user
        return name.substring(0, 1) + lastName.substring(0, 1)
    }

    render() {
        const { classes, user } = this.props;
        return (
            <div>
                <div className={classes.userInfoDiv}>
                    <LettersAvatar letters={user && user.name && user.lastName ? this.getUserInitials() : 'SA'}/>
                    <Typography variant="h6" id="display4" color='textSecondary'>
                        {`${user ? user.name : ''} ${user ? user.lastName : ''}`}
                    </Typography>
                </div>

                <Divider />
                <List>
                    {this.state.TOP_MENU_ITEMS.map((item) => (
                        <ListItem button key={item.text} onClick={() => this.handleTopActions(item.text)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {this.state.BOTTOM_MENU_ITEMS.map((item) => (
                        <ListItem button key={item.text} onClick={() => this.handleBottomActions(item.text)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <SimpleModal modalActivation={this.state.modal}>
                    <div className={classes.modalContent}>
                        <Typography variant="h6" id="modal-title">
                            Log Out
                    </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Are you sure you want to log out?
                    </Typography>
                    </div>
                    <Divider />
                    <div className={classes.modalFooter} >
                        <Button className={classes.buttons} onClick={() => this.props.logoutUser()}>Log out</Button>
                        <Button className={classes.buttons} onClick={this.handleClose}>Cancel</Button>
                    </div>
                </SimpleModal>
            </div>
        )
    }
}

const styles = theme => ({
    modalFooter: {
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-between'

    },
    modalContent: {
        paddingBottom: 80
    },
    buttons: {
        paddingTop: 10,
        marginBottom: -19,
        marginTop: 5
    },
    userInfoDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 100
    }
});

const mapStateToProps = ({ main }) => {
    const { user } = main
    return {
        user
    }
}

export default connect(mapStateToProps, { logoutUser })(withStyles(styles, { withTheme: true })(SideMenu));