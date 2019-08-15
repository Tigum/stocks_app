import React, { Component } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { connect } from 'react-redux'
import { loadChartData } from '../../actions'
import { CircularProgress } from '@material-ui/core';

class ItemGraph extends Component {

    componentDidMount() {
        const { symbol, frequency } = this.props
        this.props.loadChartData(frequency, symbol)
    }

    render() {
        const { chartData, style } = this.props
        if (!chartData || chartData.length === 0) return <CircularProgress size={20} />
        const currentValue = chartData.map((item) => item['4. close'])
        return (
            <div style={style}>
                <Sparklines data={currentValue || []}>
                    <SparklinesLine color="blue" />
                </Sparklines>
            </div>
        )
    }
}

const mapStateToProps = ({ main }) => {
    const { frequency, chartData } = main
    return {
        chartData,
        frequency
    }
}

export default connect(mapStateToProps, { loadChartData })(ItemGraph)