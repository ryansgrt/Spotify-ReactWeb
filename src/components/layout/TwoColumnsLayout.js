import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Header from './Header';
import Sidebar from './Sidebar';
import Routes from '../routes/Routes';

class TwoColumnsLayout extends Component{
    render() {
        return (
            <Fragment>
                <Row>
                    <Col sm='12' className='p-0'>
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col sm='2' className='d-none d-sm-block'>
                        <Sidebar/>
                    </Col>
                    <Col sm='10'>
                        <Routes/>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default TwoColumnsLayout;