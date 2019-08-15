import React from 'react'
import { SentimentVeryDissatisfied } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import Loader from './Loader'

const EmptyData = (props) => {
    const { message, iconSize, loading } = props
    return (
        <div style={styles.mainDiv}>
                {loading
                    ?
                    <Loader />
                    :
                    <div style={styles.innerDiv}>
                        <Typography variant="subheading" gutterBottom style={{ color: 'grey' }}>{message}</Typography>
                        <SentimentVeryDissatisfied fontSize={iconSize} style={{ color: 'grey' }} />
                    </div>
                }
        </div>
    )
}

const styles = {
    mainDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    innerDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'grey',
        marginTop: 115
    }
}

export default EmptyData