import React, { Component } from 'react'

const SCREEN_HEIGHT = window.innerHeight

class Form extends Component {
    render() {
        const { children, maxWidth } = this.props
        return (
            <div style={styles.mainDiv}>
                <div style={{...styles.container, maxWidth} } >
                    {children}
                </div>
            </div>
        )
    }
}

const styles = {
    mainDiv: {
        width: '100%',
        backgroundColor: 'whitesmoke',
        height: SCREEN_HEIGHT,
        margin: '0px',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 15
    },
}

export default Form