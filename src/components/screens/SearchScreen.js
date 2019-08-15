import React, { Component } from 'react'
import Drawer from '../common/Drawer'
import { connect } from 'react-redux'
import { checkIfUserAlreadyLoggedOut, searchTextChange, loadStocksSearchResults, stockSelected, followStock, unfollowStock } from '../../actions'
import { TextField, List, ListItem, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import FollowButton from '../common/FollowButton'
import EmptyData from '../common/EmptyData';

class SearchScreen extends Component {

    state = {
        followButtonLoading: true
    }

    componentWillMount() {
        this.props.checkIfUserAlreadyLoggedOut()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.searchText !== nextProps.searchText) {
            if(nextProps.searchText.length > 5) {
                this.props.loadStocksSearchResults(nextProps.searchText)
            }
        }
    }

    componentWillUnmount() {
        this.props.searchTextChange('')
    }

    render() {
        const { classes, searchText, searchResults, user } = this.props;

        return (
            <Drawer title='Stocks'>
                
                <div className={classes.searchTextDiv}>
                    <TextField
                        id="outlined-search"
                        label="Search for stocks here..."
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={e => this.props.searchTextChange(e.target.value)}
                        value={searchText}
                    />
                </div>

                {searchText.length < 6 || searchResults < 1
                ?
                <EmptyData message='No results found' iconSize='large' loading={searchResults >= 1 ? true : false}/>
                :
                <div>
                    <List>
                        {searchText.length > 0 ? searchResults.map((item, i) => (
                            <div key={item['2. name'] + i}>

                                <ListItem button key={item['2. name'] + i} className={classes.listItem} onClick={() => this.props.stockSelected(item)}>
                                    <div>
                                        <Typography variant="h6" id="display4" color='textSecondary'>{item['2. name']}</Typography>
                                        <Typography variant="subheading" gutterBottom>{item['4. region']}</Typography>
                                        {/* <ItemGraph symbol={item['1. symbol']} style={{width: 150}}/> */}
                                    </div>
                                    <div className={classes.rightItemDiv}>
                                        <Typography variant="h6" id="display4" color='textSecondary'>{item['1. symbol']}</Typography>
                                    </div>

                                </ListItem>
                                <FollowButton 
                                    name={item['2. name']} 
                                    symbol={item['1. symbol']} 
                                    userId={user._id} 
                                    region={item['4. region']}
                                    currency={item['8. currency']}
                                    marketOpen={item['5. marketOpen']}
                                    marketClose={item['6. marketClose']}
                                />
                            </div>
                        )) : []}
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
        minHeight: 100
    },
    rightItemDiv: {
        textAlign: 'right',
        marginTop: -20,
        wordBreak: 'break-all',
        marginBottom: 10
    },
});

const mapStateToProps = ({ main }) => {
    const { searchText, searchResults, user } = main
    return {
        searchText,
        searchResults,
        user
    }
}

export default connect(mapStateToProps, { checkIfUserAlreadyLoggedOut, searchTextChange, loadStocksSearchResults, stockSelected, followStock, unfollowStock })(withStyles(styles)(SearchScreen))