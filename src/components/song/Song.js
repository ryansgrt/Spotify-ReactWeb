import React, { Component } from 'react';
import {combineReducers, createStore} from 'redux';
import { Provider } from 'react-redux';
import { Row, Col} from 'reactstrap';
import { Route } from 'react-router-dom';
import SongForm from "./SongForm";
import songReducer from "./reducers/SongReducer";
import ListSong from "./ListSong";
import genreReducer from "../genre/reducers/GenreReducer";
import artistReducer from "../artist/reducers/ArtistReducer";
import albumReducer from "../album/reducers/AlbumReducer";

const songStore = createStore(songReducer);

// const reducer =combineReducers({genreReducer,artistReducer,albumReducer, songReducer});
class Genre extends Component{
    render() {
        return (
            <Provider store={songStore}>
                <Row>
                    <Col>
                        <Route exact path="/song" render={() => <ListSong />} />
                        <Route path="/song/form" render={() => <SongForm />}/>
                    </Col>
                </Row>
            </Provider>
        )
    }
}

export default Genre;