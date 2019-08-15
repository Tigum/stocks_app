import React, { Component } from 'react'
import { Typography, CircularProgress } from "@material-ui/core";
import { TrendingUp, TrendingDown } from '@material-ui/icons'

function latestValue(array) {
    return (((parseFloat(array[1]['4. close']) / parseFloat(array[0]['4. close'])) - 1) * (-100)).toFixed(2)
}

class StockValue extends Component {

    render() {
        if (!this.props.chartData) return (<div style={styles.progress}><CircularProgress size={20} /></div>)
        const { chartData, style } = this.props

        return (
            <Typography variant="h5" gutterBottom style={{ ...style, color: latestValue(chartData) >= 0 ? 'green' : 'red' }}>
                {latestValue(chartData) >= 0 ? <TrendingUp style={{color: 'green'}}/> : <TrendingDown style={{color: 'red'}} />}{latestValue(chartData)+'%'}
            </Typography>
        )
    }
}

const styles = {
    progress: {
        paddingLeft: 35,
        paddingTop: 15,
    }
}
export default StockValue