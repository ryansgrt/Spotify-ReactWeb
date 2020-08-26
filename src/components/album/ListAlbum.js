import React, { Component, Fragment } from 'react'
import { Card, CardHeader, Table, Spinner, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Service from './services/AlbumServices'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import FaIcon from '../../shared/FontAwesome/FaIcon';

class ListAlbum extends Component{

        constructor(props) {
        super(props);
        this.state = {
            target: undefined,
            dialogOpen: false,
            imageOpen: false,
            dialogText:'',
        }
    }

    loadData() {
        const{fetchData, fetchComplete} = this.props;

        fetchData();
        Service.getAlbums()
        .then((albums)=>{
            fetchComplete(albums);
        });
    }

    componentDidMount() {
        this.loadData();
    }

    handleEdit = (albumId)=>{
        const {handleEdit, history} = this.props;
        handleEdit(albumId);
        history.replace("/album/form")
    }

    handleDelete = () => {
        // const { setLoading } = this.props;
        const { target } = this.state;
        this.setState({dialogOpen: false});
        Service.deleteAlbum(target)
            .then((isSuccess)=>{
                if(isSuccess) this.loadData();
            });
    }

    confirmDelete = (target) => {
        this.setState({
            target, dialogOpen: true,
            dialogText: `Are you sure you want to delete ${target.title}?`
        });
    }


    showImage = (target) => {
        this.setState({
        target, imageOpen: true,
        // dialogText: `Picture ${target.title}`
    });
}

    generatedTableRows() {
        const { content, isLoading } = this.props;
        // const { imageOpen } = this.state;
        let rows = <tr>
            <td colSpan="2" className="text-center"><Spinner color="primary"/></td>
        </tr>
        if (!isLoading) {
            rows = content.map((album, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{album.title}</td>
                        <td>{album.description}</td>
                        <td>{album.releaseYear}</td>
                        <td>{album.discount}</td>
                        <td><img src={`http://localhost:8080/album/photos/${album.id}`} width='163' height='130' className="App-logo" alt="logo" /></td>
                        <td>
                            <Button type="button" color="info"><FaIcon icon='fas info-circle'/></Button>
                        </td>
                        <td>
                            <Button type="button" color="warning" onClick={()=>this.handleEdit(album.id)}><FaIcon icon='fas edit'/></Button>
                        </td>
                        <td>
                            <Button type="button" color="danger" onClick={()=>this.confirmDelete(album)}> <FaIcon icon='fas trash-alt'/> </Button>
                        </td>
                    </tr>
                )
            })
        }
        return rows;
    }

    render() {
        const { dialogOpen, dialogText } = this.state;
        return (
            <Fragment>
                <Card className="shadow">
                    <CardHeader tag='strong'>Albums
                        <Link to='/album/form' className="float-right">
                            <Button type="button" color="light"><FaIcon icon='fas plus-square'/> New Album </Button>
                        </Link>
                    </CardHeader>
                    <Table responsive striped hover className='m-0'>
                        <thead>
                            <tr>
                                <th width="5%">#</th>
                                <th>Album</th>
                                <th>Description</th>
                                <th>Release Year</th>
                                <th>Discount</th>
                                <th>Image</th>
                                <th colSpan="2" width="2%">Action</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListAlbum));
