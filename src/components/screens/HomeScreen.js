import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkIfUserAlreadyLoggedOut, loadNews } from '../../actions'
import Drawer from '../common/Drawer'
import NewsGrid from '../common/NewsGrid'

class HomeScreen extends Component {

    componentWillMount() {
        this.props.checkIfUserAlreadyLoggedOut()
    }

    componentDidMount() {
        this.props.loadNews()
    }

    render() {
        return (
            <Drawer title='Financial News' >
                <NewsGrid />
            </Drawer>
        )
    }
}

export default connect(null, { checkIfUserAlreadyLoggedOut, loadNews })(HomeScreen)