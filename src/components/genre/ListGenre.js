import React, { Component, Fragment } from 'react'
import { Card, CardHeader, Table, Spinner, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Service from './services/GenreServices'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import FaIcon from '../../shared/FontAwesome/FaIcon'
class ListGenre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            target: undefined,
            dialogOpen: false,
            dialogText:'',
        }
    }
    loadData() {
        const{fetchData, fetchComplete} = this.props;
        fetchData();
        Service.getGenres()
            .then((genres)=>{
                fetchComplete(genres);
            });
    }
    handleEdit = (genreId)=>{
        const {handleEdit, history} = this.props;
        handleEdit(genreId);
        history.replace("/genre/form")
    }
    handleDelete = () => {
        // const { setLoading } = this.props;
        const { target } = this.state;
        this.setState({dialogOpen: false});
        Service.deleteGenre(target)
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
    componentDidMount() {
        this.loadData();
    }
    generatedTableRows() {
        const { content, isLoading } = this.props;
        let rows = <tr>
            <td colSpan="2" className="text-center"><Spinner color="primary"/></td>
        </tr>
        if (!isLoading) {
            rows = content.map((genre, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{genre.name}</td>
                        <td>
                            <Button type="button" color="info"><FaIcon icon='fas info-circle'/></Button>
                        </td>
                        <td>
                            <Button type="button" color="warning" onClick={()=>this.handleEdit(genre.id)}><FaIcon icon='fas edit'/></Button>
                        </td>
                        <td>
                            <Button type="button" color="danger" onClick={()=>this.confirmDelete(genre)}> <FaIcon icon='fas trash-alt'/> </Button>
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
                    <CardHeader tag='strong'>Genres
                        <Link to='/genre/form' className="float-right">
                            <Button type="button" color="light"><FaIcon icon='fas plus-square'/> New Genre </Button>
                        </Link>
                    </CardHeader>
                    <Table responsive striped hover className='m-0'>
                        <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th>Genre</th>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListGenre));