import React from 'react'
import { CircularProgress } from '@material-ui/core';

const Loader = () => {
    return (
        <div style={styles.mainDiv}>
            <CircularProgress size={60} />
        </div>
    )
}

const styles = {
    mainDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: window.innerHeight - 300
    }
}

export default Loader