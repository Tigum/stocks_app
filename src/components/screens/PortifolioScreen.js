import React, { Component } from 'react'
import Drawer from '../common/Drawer'
import { connect } from 'react-redux'
import { checkIfUserAlreadyLoggedOut, searchTextChange, loadPortifolio, stockSelected, searchPortifolio } from '../../actions'
import { TextField, List, ListItem, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import FollowButton from '../common/FollowButton'
import EmptyData from '../common/EmptyData'

class PortifolioScreen extends Component {
    componentWillMount() {
        this.props.checkIfUserAlreadyLoggedOut()
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.user) return
        if (this.props.user !== nextProps.user) {
            this.props.loadPortifolio(nextProps.user._id)
        }

        if (this.props.searchText !== nextProps.searchText) {

            if (nextProps.searchText.length === 0) {
                this.props.loadPortifolio(nextProps.user._id)
            } else {
                this.props.searchPortifolio(nextProps.searchText, nextProps.user._id)
            }

        }
    }

    render() {
        const { classes, searchText, loading, portifolio, user } = this.props

        return (
            <Drawer title='My Portifolio'>
                <div className={classes.searchTextDiv}>
                    <TextField
                        id="outlined-search"
                        label="Search my portifolio..."
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={e => this.props.searchTextChange(e.target.value)}
                        value={searchText}
                    />
                </div>
                {
                    loading || portifolio.length < 1
                        ?
                        <EmptyData message={searchText.length < 6 ? 'Portifolio empty' : 'Nothing found'} loading={loading}/>
                        :
                        <div>
                            <List>
                                {portifolio.map((item, i) => (
                                    <div key={item.symbol + i}>

                                        <ListItem button className={classes.listItem} onClick={() => this.props.stockSelected(item)}>
                                            <div>
                                                <Typography variant="h6" id="display4" color='textSecondary'>{item.name}</Typography>
                                                <Typography variant="subheading" gutterBottom>{item.region}</Typography>
                                            </div>
                                            <div className={classes.rightItemDiv}>
                                                <Typography variant="h6" id="display4" color='textSecondary'>{item.symbol}</Typography>

                                            </div>

                                        </ListItem>
                                        <FollowButton name={item.name} symbol={item.symbol} userId={user._id || ''} region={item.region} />
                                    </div>
                                ))}
                            </List>
                        </div>
                }
            </Drawer>
        )
    }
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    searchTextDiv: {
        width: '100%'
    },
    listItem: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 100
    },
    rightItemDiv: {
        textAlign: 'right',
        marginTop: -20
    },
});

const mapStateToProps = ({ main }) => {
    const { searchText, portifolio, loading, user } = main
    return {
        searchText,
        portifolio,
        loading,
        user
    }
}

export default connect(mapStateToProps, { checkIfUserAlreadyLoggedOut, searchTextChange, loadPortifolio, stockSelected, searchPortifolio })(withStyles(styles)(PortifolioScreen))