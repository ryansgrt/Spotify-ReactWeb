import React, { Component } from 'react';
import { Container } from 'reactstrap';
import TwoColumnsLayout from './layout/TwoColumnsLayout';
import { BrowserRouter } from 'react-router-dom';
import loadFontAwesome from '../shared/FontAwesome/loader'

loadFontAwesome();

class App extends Component{
    render() {
        return (
            <Container fluid>
                <BrowserRouter>
                    <TwoColumnsLayout/>
                </BrowserRouter>
            </Container>
        )
    }
}

export default App;