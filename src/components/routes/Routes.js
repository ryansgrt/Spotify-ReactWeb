import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Genre from '../genre/Genre';
import Artist from "../artist/Artist";
import Album from "../album/Album";
import Song from "../song/Song";

class Routes extends Component{
    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <p>Home</p>
                </Route>
                <Route path="/genre" render={() => <Genre />} />
                <Route path="/album" render={() => <Album />} />
                <Route path="/artist" render={() => <Artist/>} />
                <Route path="/song" render={() => <Song/>} />
                <Route path="/artistImage" render={() => <p>Songs</p>} />

            </Switch>
        )
    }
}

export default Routes;