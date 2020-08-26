import React, { Component } from 'react';
import { createStore } from 'redux';
import genreReducer from './reducers/GenreReducer'
import { Provider } from 'react-redux';
import { Row, Col} from 'reactstrap';
import ListGenre from './ListGenre';
import { Route } from 'react-router-dom';
import GenreForm from './GenreForm';

const genreStore = createStore(genreReducer);
class Genre extends Component{
    render() {
        return (
            <Provider store={genreStore}>
                <Row>
                    <Col>
                        <Route exact path="/genre" render={() => <ListGenre />} />
                        <Route path="/genre/form" render={() => <GenreForm />}/>
                    </Col>
                </Row>
            </Provider>
        )
    }
}

export default Genre;