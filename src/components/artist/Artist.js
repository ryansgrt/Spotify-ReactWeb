import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Row, Col} from 'reactstrap';
import { Route } from 'react-router-dom';
import ListArtist from "./ListArtist";
import ArtistForm from "./ArtistForm";
import artistReducer from "./reducers/ArtistReducer";

const artistStore = createStore(artistReducer);
class Artist extends Component{
    render() {
        return (
            <Provider store={artistStore}>
                <Row>
                    <Col>
                        <Route exact path="/artist" render={() => <ListArtist />} />
                        <Route path="/artist/form" render={() => <ArtistForm />}/>
                    </Col>
                </Row>
            </Provider>
        )
    }
}

export default Artist;