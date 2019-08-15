import React, { Component } from 'react'
import Drawer from '../common/Drawer'
import { connect } from 'react-redux'
import history from '../history';
import { Paper, Typography } from "@material-ui/core";
import { loadChartData } from '../../actions'
import InfoTable from '../common/InfoTable'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import StockValue from '../common/StockValue'
import Loader from '../common/Loader'

const IMAGE_DIMENSION = 130
const SCREEN_WIDTH = window.innerWidth

class StockScreen extends Component {

    componentDidMount() {
        const { stockSelected, frequency } = this.props
        if (!stockSelected) return history.push('/home')
        if (stockSelected.symbol) {
            this.props.loadChartData(frequency, stockSelected.symbol)
        } else {
            this.props.loadChartData(frequency, stockSelected['1. symbol'])
        }
    }

    render() {
        const { stockSelected, chartData } = this.props
        if (!stockSelected || !chartData || chartData.length === 0) return (
            <Drawer title='Loading...'>
                <Loader />
            </Drawer>
        )
        const currentValue = chartData.map((item) => item['4. close'])
        currentValue.reverse()
      
        if (stockSelected && stockSelected.name) {

            return (
                <Drawer title={stockSelected !== null ? `${stockSelected.name} - ${stockSelected.symbol}` : ''}>
                    <Paper style={styles.paper}>
                        <div style={styles.titleDiv}>
                            <div>
                                <Typography variant="h4" gutterBottom style={styles.title}>{stockSelected.name}</Typography>
                                <Typography variant="subheading" gutterBottom style={styles.subtitle}>{stockSelected.symbol}</Typography>
                                <Typography variant="subheading" gutterBottom style={styles.subtitle}>{stockSelected.currency}</Typography>
                                <Typography variant="subheading" gutterBottom style={{ ...styles.subtitle, marginBottom: 15 }}>{`Market open/close: ${stockSelected.marketOpen} - ${stockSelected.marketClose}`}</Typography>
                                <StockValue chartData={chartData} style={{...styles.subtitle, marginBottom: 15}}/>
                            </div>
                            <img
                                src={`//logo.clearbit.com/${stockSelected.name.toLowerCase().substr(0, stockSelected.name.indexOf(" "))}.com` || ''}
                                style={styles.image}
                                alt={'Logo not found'}
                            />
                        </div>
                        <div>
                            <Sparklines data={currentValue || []}>
                                <SparklinesLine color="blue" />
                            </Sparklines>
                        </div>
                        <InfoTable />
                    </Paper>
                </Drawer>
            )
        }

        return (
            <Drawer title={stockSelected !== null ? `${stockSelected['2. name']} - ${stockSelected['1. symbol']}` : ''}>
                <Paper style={styles.paper}>
                    <div style={styles.titleDiv}>
                        <div>
                            <Typography variant="h4" gutterBottom style={styles.title}>{stockSelected !== null || stockSelected['2. name'] !== null ? `${stockSelected['2. name']}` : ''}</Typography>
                            <Typography variant="subheading" gutterBottom style={styles.subtitle}>{stockSelected !== null ? `${stockSelected['1. symbol']} - ${stockSelected['4. region']}` : ''}</Typography>
                            <Typography variant="subheading" gutterBottom style={styles.subtitle}>{stockSelected !== null ? `Currency: ${stockSelected['8. currency']}` : ''}</Typography>
                            <Typography variant="subheading" gutterBottom style={{ ...styles.subtitle, marginBottom: 15 }}>{stockSelected !== null ? `Market open/close: ${stockSelected['5. marketOpen']} - ${stockSelected['6. marketClose']}` : ''}</Typography>
                            <StockValue chartData={chartData} style={{ ...styles.subtitle, marginBottom: 15 }} />
                        </div>
                        <img
                            src={`//logo.clearbit.com/${stockSelected['2. name'].toLowerCase().substr(0, stockSelected['2. name'].indexOf(" "))}.com` || ''}
                            style={styles.image}
                            alt={'Logo not found'}
                        />
                    </div>
                    <div>
                        <Sparklines data={currentValue}>
                            <SparklinesLine color="blue" />
                        </Sparklines>
                    </div>
                    <InfoTable />
                </Paper>
            </Drawer>
        )


    }
}


const styles = {
    titleDiv: {
        display: 'flex',
        flexDirection: SCREEN_WIDTH < 600 ? 'column' : 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    title: {
        paddingLeft: 35,
        paddingTop: 35,
        paddingRight: SCREEN_WIDTH < 600 ? 30 : 0
    },
    subtitle: {
        paddingLeft: 35,
        paddingTop: 5,
        paddingRight: SCREEN_WIDTH < 600 ? 30 : 0
    },
    image: {
        borderRadius: 13,
        width: IMAGE_DIMENSION,
        height: IMAGE_DIMENSION,
        padding: 35
    },
    paper: {
        // maxWidth: 900
    },
    mainDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
}

const mapStateToProps = ({ main }) => {
    const { stockSelected, frequency, chartData } = main
    return {
        stockSelected,
        frequency,
        chartData
    }
}
export default connect(mapStateToProps, { loadChartData })(StockScreen)