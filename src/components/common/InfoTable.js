import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import { connect } from 'react-redux'

const SCREEN_WIDTH = window.innerWidth

class CustomizedTable extends Component {
  render() {
    const { classes, chartData } = this.props;

    if (SCREEN_WIDTH < 1010) {
      return (
        <div style={{ backgroundColor: '#fafafa', border: 'none' }}>
          <div>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Time</CustomTableCell>
                    <CustomTableCell align="right">Open</CustomTableCell>
                    <CustomTableCell align="right">Close</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chartData.map(row => (
                    <TableRow className={classes.row} key={row.date}>
                      <CustomTableCell component="th" scope="row">
                        {row.date}
                      </CustomTableCell>
                      <CustomTableCell align="right">{parseFloat(row['1. open']).toFixed(2)}</CustomTableCell>
                      <CustomTableCell align="right">{parseFloat(row['4. close']).toFixed(2)}</CustomTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Time</CustomTableCell>
                    <CustomTableCell align="right">High</CustomTableCell>
                    <CustomTableCell align="right">Low</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chartData.map(row => (
                    <TableRow className={classes.row} key={row.date}>
                      <CustomTableCell component="th" scope="row">
                        {row.date}
                      </CustomTableCell>
                      <CustomTableCell align="right">{parseFloat(row['2. high']).toFixed(2)}</CustomTableCell>
                      <CustomTableCell align="right">{parseFloat(row['3. low']).toFixed(2)}</CustomTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Time</CustomTableCell>
                    <CustomTableCell align="right">Volume</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chartData.map(row => (
                    <TableRow className={classes.row} key={row.date}>
                      <CustomTableCell component="th" scope="row">
                        {row.date}
                      </CustomTableCell>
                      <CustomTableCell align="right">{parseFloat(row['5. volume']).toFixed(2)}</CustomTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      )
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Time</CustomTableCell>
              <CustomTableCell align="right">Open</CustomTableCell>
              <CustomTableCell align="right">High</CustomTableCell>
              <CustomTableCell align="right">Low</CustomTableCell>
              <CustomTableCell align="right">Close</CustomTableCell>
              <CustomTableCell align="right">Volume</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData.map(row => (
              <TableRow className={classes.row} key={row.date}>
                <CustomTableCell component="th" scope="row">
                  {row.date}
                </CustomTableCell>
                <CustomTableCell align="right">{parseFloat(row['1. open']).toFixed(2)}</CustomTableCell>
                <CustomTableCell align="right">{parseFloat(row['2. high']).toFixed(2)}</CustomTableCell>
                <CustomTableCell align="right">{parseFloat(row['3. low']).toFixed(2)}</CustomTableCell>
                <CustomTableCell align="right">{parseFloat(row['4. close']).toFixed(2)}</CustomTableCell>
                <CustomTableCell align="right">{parseFloat(row['5. volume']).toFixed(2)}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const mapStateToProps = ({ main }) => {
  const { chartData } = main
  return {
    chartData
  }
}

export default connect(mapStateToProps, {})(withStyles(styles)(CustomizedTable));