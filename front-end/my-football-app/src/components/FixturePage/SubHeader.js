import React from 'react';
const SubHeader = () => {
    const headingStyle = {
        textAlign: 'center',
        color: 'black',
        fontSize: 48,
        fontFamily: 'Inter',
        fontWeight: '700',
        textTransform: 'uppercase',
        wordWrap: 'break-word',
    };

     const DateStyle = {
        textAlign: 'center',
        color: 'black',
        fontSize: 32,
        fontFamily: 'Inter',
        fontWeight: '600',
        textTransform: 'uppercase',
        wordWrap: 'break-word',
    };

    return (
        <div>
             <div style={headingStyle}>Match Week 1</div>
        <div style={DateStyle}>4 November 2023</div>
        </div>
    );
}


export default SubHeader;
