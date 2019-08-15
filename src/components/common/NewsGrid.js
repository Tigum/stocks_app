import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import Loader from './Loader'

const SCREEN_HEIGHT = 100
const SCREEN_WIDTH = window.innerWidth

class NewsGrid extends Component {

  render() {
    const { classes, news, loading } = this.props;

    if(loading) return <Loader />

    return (
      <div className={SCREEN_WIDTH < 600 ? classes.rootMobile : classes.root}>
        {news.map(item => (
          <div className={SCREEN_WIDTH < 600 ? classes.gridItemMobile : classes.gridItem} key={item.title}>
            <img src={item.urlToImage} alt={item.title} className={classes.image} />
            <Typography variant="h5" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="subheading" gutterBottom className={classes.description}>
              {item.description}
            </Typography>
            <Button variant="outlined" color="primary" className={classes.button} onClick={()=> window.open(item.url, "_blank")}>
              Read more ...
            </Button>
          </div>
        ))}
      </div>
    );
  }

}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  rootMobile: {
    backgroundColor: theme.palette.background.paper,
    width: '111%'
  },
  gridList: {
    width: '100%',
    height: `${SCREEN_HEIGHT}vh`,
    display: 'flex',
    justifyContent: 'center',
  },
  gridItem: {
    width: '50%',
    backgroundColor: 'white',
    padding: 30,
    // borderStyle: 'solid',
    // borderRadius: '5px',
    // borderWidth: '1px',
    // borderColor: '#efefef',
  },
  gridItemMobile: {
    width: '90%',
    backgroundColor: 'white',
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    borderRadius: 5
  },
  description: {
    color: '#656565'
  },
  button: {
    margin: theme.spacing.unit,
  }
});

NewsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ main }) => {
  const { news, loading } = main
  return {
    news,
    loading
  }
}

export default connect(mapStateToProps, {})(withStyles(styles)(NewsGrid));