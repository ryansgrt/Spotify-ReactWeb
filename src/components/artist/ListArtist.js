import React, { Component, Fragment } from 'react'
import {
    Card,
    CardHeader,
    Table,
    Spinner,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Col, Label
} from 'reactstrap';
import * as Service from './services/ArtistServices'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import FaIcon from '../../shared/FontAwesome/FaIcon'
class ListArtist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            target: undefined,
            dialogOpen: false,
            dialogText:'',
            imgOpen: false,
            img:'',
            artistId:'',
        }
    }
    loadData() {
        const{fetchData, fetchComplete} = this.props;
        fetchData();
        Service.getArtists()
            .then((artists)=>{
                fetchComplete(artists);
            });
    }
    handleEdit = (artistId)=>{
        const {handleEdit, history} = this.props;
        handleEdit(artistId);
        history.replace("/artist/form")
    }
    handleDelete = () => {
        // const { setLoading } = this.props;
        const { target } = this.state;
        this.setState({dialogOpen: false});
        Service.deleteArtist(target)
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

    showImage = (target, artist) => {
        this.setState({
            target, imgOpen: true,
            dialogText: `Picture ${target.name}`

        });
    }

    componentDidMount() {
        this.loadData();
    }
    generatedTableRows() {
        const { content, isLoading, keyword  } = this.props;
        const { imgOpen } =this.state;
        const filteredContents = keyword && keyword.length > 0 ? content.filter((song) => {
            if (song.name.toLowerCase().includes(keyword.toLowerCase())) return song;
            else return false;
        }) : content;
        let rows = <tr>
            <td colSpan="2" className="text-center"><Spinner color="primary"/></td>
        </tr>
        if (!isLoading) {
            rows = filteredContents.map((artist, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{artist.name}</td>
                        <td>{artist.gender}</td>
                        <td>{artist.debutYear}</td>
                        <td>{artist.biography}</td>
                        {/*<Modal isOpen={imgOpen} size="lg" centered={true}>*/}
                        {/*    <ModalHeader toggle={imgOpen}>Artist Photo</ModalHeader>*/}
                        {/*    <ModalBody><center><img src={`http://localhost:9090/artist/photos/${artist.id}`}alt="Example" width="500" height="300"/> </center> </ModalBody>*/}
                        {/*    <ModalFooter>*/}
                        {/*        <Button type="button" color="secondary" onClick={()=> this.setState({target:undefined, dialogText:'', imgOpen: false})}>Close</Button>*/}
                        {/*    </ModalFooter>*/}
                        {/*</Modal>*/}
                        <td><img src={`http://localhost:8080/artist/photos/${artist.id}`}alt="Example" width="193" height="130"/> </td>
                        {/*<td> <Button type="button" color="danger" onClick={()=>this.showImage(artist.id)}> <FaIcon icon='far eye'/></Button></td>*/}
                        <td>
                            <Button type="button" color="info"><FaIcon icon='fas info-circle'/></Button>
                        </td>
                        <td>
                            <Button type="button" color="warning" onClick={()=>this.handleEdit(artist.id)}><FaIcon icon='fas edit'/></Button>
                        </td>
                        <td>
                            <Button type="button" color="danger" onClick={()=>this.confirmDelete(artist)}> <FaIcon icon='fas trash-alt'/> </Button>
                        </td>
                    </tr>

                )
            })
        }
        return rows;
    }
    render() {
        const { dialogOpen, dialogText} = this.state;
        const { keyword, handleSearch} = this.props;
        return (
            <Fragment>
                <Card className="shadow">
                    <CardHeader tag='strong'>Artists

                            {/*<Col sm="7">*/}
                                {/*<Label for='title' sm='7'>Album Title</Label>*/}
                        <Input type="text"  className="float-right" value={keyword} id="search" name="search" placeholder="Search...." onChange={(event)=>handleSearch(event.target.value)}/>
                            {/*</Col>*/}

                        <Link to='/artist/form' className="float-right">
                            <Button type="button" color="light"><FaIcon icon='fas plus-square'/> New Artist </Button>
                        </Link>
                    </CardHeader>
                    <Table responsive striped hover className='m-0'>
                        <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th>Artist</th>
                            <th>Gender</th>
                            <th>Debut Year</th>
                            <th>Biography</th>
                            <th>Photo</th>
                            <th colSpan="3" width="20%">Action</th>
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
        handleSearch: (payload) => dispatch({ type: 'HANDLE_SEARCH', payload }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListArtist));
