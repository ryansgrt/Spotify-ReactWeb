import React, { Component } from 'react';
import { createStore } from 'redux';
import albumReducer from './reducers/AlbumReducer'
import { Provider } from 'react-redux';
import { Row, Col} from 'reactstrap';
import ListAlbum from './ListAlbum';
import { Route } from 'react-router-dom';
import AlbumForm from './AlbumForm'

const albumStore = createStore(albumReducer);
class Album extends Component{
    render() {
        return (
            <Provider store={albumStore}>
                <Row>
                    <Col>
                        <Route exact path="/album" render={() => <ListAlbum />} />
                        <Route path="/album/form" render={() => <AlbumForm />}/>
                    </Col>
                </Row>
            </Provider>
        )
    }
}

export default Album;