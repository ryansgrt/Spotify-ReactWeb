import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//Higher-Order Components
//Component yang return components lain
//jumlah(1)(1);
//connect (mapStateToProps, mapDispatchToProps)(Song)

function FaIcon(props) {
    const { icon: iconString, ...faProps } = props;
    const icon = iconString.split(' ');

    return <FontAwesomeIcon icon={icon} {...faProps} />;
}

export default FaIcon;