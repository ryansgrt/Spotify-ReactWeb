import React, { Component, Fragment } from 'react'
import { Card, CardHeader, Table, Spinner, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Service from './services/SongServices'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import FaIcon from '../../shared/FontAwesome/FaIcon'
class ListSong extends Component {

    constructor(props) {
            super(props);
            this.state = {
                target: undefined,
                dialogOpen: false,
                dialogText:'',
                imgOpen: false,
                img:''
            }
        }
        loadData() {
            const{fetchData, fetchComplete} = this.props;
            fetchData();
            Service.getSongs()
                .then((songs)=>{
                    fetchComplete(songs);
                });
        }
        handleEdit = (songId)=>{
            const {handleEdit, history} = this.props;
            handleEdit(songId);
            history.replace("/song/form")
        }
        handleDelete = () => {
            // const { setLoading } = this.props;
            const { target } = this.state;
            this.setState({dialogOpen: false});
            Service.deleteSong(target)
                .then((isSuccess)=>{
                    if(isSuccess) this.loadData();
                });
        }
        confirmDelete = (target) => {
            this.setState({
                target, dialogOpen: true,
                dialogText: `Are you sure you want to delete ${target.name}?`
            });
        }

        showImage = (target, song) => {
            this.setState({
                target, imgOpen: true,
                dialogText: `Picture ${target.name}`

            });
        }

        componentDidMount() {
            this.loadData();
        }
        generatedTableRows() {
            const { content, isLoading } = this.props;
            const { imgOpen } =this.state;
            let rows = <tr>
                <td colSpan="2" className="text-center"><Spinner color="primary"/></td>
            </tr>
            if (!isLoading) {
                rows = content.map((song, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{song.title}</td>
                            <td>{song.duration}</td>
                            <td>{song.price}</td>
                            <td>{song.releaseYear}</td>
                            {/*<td>{song.album.title}</td>*/}
                            {/*<td>{song.genre.name}</td>*/}
                            {/*<td>{song.artist.name}</td>*/}
                            <td>
                            <Button type="button" color="info"><FaIcon icon='fas info-circle'/></Button>
                        </td>
                        <td>
                            <Button type="button" color="warning" onClick={()=>this.handleEdit(song.id)}><FaIcon icon='fas edit'/></Button>
                        </td>
                        <td>
                            <Button type="button" color="danger" onClick={()=>this.confirmDelete(song)}> <FaIcon icon='fas trash-alt'/> </Button>
                        </td>
                    </tr>

                )
            })
        }
        return rows;
    }
    render() {
        const { dialogOpen, dialogText ,imgOpen} = this.state;
        return (
            <Fragment>
                <Card className="shadow">
                    <CardHeader tag='strong'>Songs
                        <Link to='/song/form' className="float-right">
                            <Button type="button" color="light"><FaIcon icon='fas plus-square'/> New Song </Button>
                        </Link>
                    </CardHeader>
                    <Table responsive striped hover className='m-0'>
                        <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th>Title</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Release Year</th>
                            <th>Album</th>
                            <th>Genre</th>
                            <th>Artist</th>

                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>{this.generatedTableRows()}</tbody>
                    </Table>
                    <Modal isOpen={dialogOpen} size="sm" centered={true}>
                        <ModalHeader toggle={dialogOpen} tag='strong'>Delete Confirmation</ModalHeader>
                        <ModalBody>{dialogText}</ModalBody>
                        <ModalFooter>
                            <Button type="button" color="danger" onClick={this.handleDelete}>Confirm</Button>
                            <Button type="button" color="secondary" onClick={()=> this.setState({target:undefined, dialogText:'', dialogOpen: false})}>Cancel</Button>
                        </ModalFooter>
                    </Modal>




                </Card>
            </Fragment>
        )
    }
}
function mapStateToProps(state) {
    return {...state}
}
function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch({type: 'FETCH_DATA'}),
        fetchComplete: (payload) => dispatch({type: 'FETCH_COMPLETE', payload}),
        handleEdit :(payload) => dispatch({type: 'HANDLE_EDIT', payload}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListSong));
