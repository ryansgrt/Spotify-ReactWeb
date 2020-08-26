import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Col, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap'
import * as Service from './services/AlbumServices'
import FaIcon from '../../shared/FontAwesome/FaIcon'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';

class AlbumForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            isSubmitting: false,
            selectedImage: '',
        }
    }

    handleImage = (event) => {
        event.preventDefault();
        this.setState({selectedImage: event.target.files[0]});
    }

    submitAlbumData = async() => {
        const { form } = this.props;
        console.log(form)
        return await Service.createAlbum(form, this.state.selectedImage);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { setLoading, submitComplete } = this.props;
        setLoading();
        this.submitAlbumData().then((content) => {
            submitComplete(content);
            this.handleReturn()
        });
    }

    optionYear(x, y) {
        let year = [];
        
        for (let i = x; i <= y; i++) {
            year.push(<option key={i} value={year[i]}>{i}</option>);
        }
        return year;
        }

    loadData() {
        const{setLoading, fetchComplete} = this.props;

        setLoading();
        Service.getAlbums()
            .then((albums)=>{
                fetchComplete(albums);
            });
    }
    
    componentDidMount() {
        this.loadData();
    }

    isValidForm = () => {
        const { form, isLoading } = this.props;
        return (form.title.trim().length > 0
            && form.description.trim().length > 0
            && form.releaseYear !== (<option default> ---select year--- </option>)
            && form.discount > 0.0
        ) || isLoading;
    }

    handleReturn = () => {
        const { history, reset } = this.props;
        reset();
        history.replace('/album')
    }

    render() {

        const { form, isLoading, handleInputChanges } = this.props;
        return (
            <Fragment>
                <Card>
                    <CardHeader tag='form'> Album Form </CardHeader>
                    <CardBody>
                        <Form onSubmit={(event)=>this.handleFormSubmit(event)}>
                            <FormGroup row>
                                <Label for='title' sm='3'>Album Title</Label>
                                <Col sm="6">
                                    <Input type="text" id="title" name="title" value={form.title} placeholder="Album title" onChange={(event)=>handleInputChanges('title', event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='description' sm='3'>Album description</Label>
                                <Col sm='6'>
                                    <Input type="textarea" id='description' name='description' value={form.description} placeholder='Album description' onChange={(event)=>handleInputChanges('description', event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='releaseYear' sm='3'>Album Release Year</Label>
                                <Col sm="6">
                                    <Input type="select" id="releaseYear" name="releaseYear" value={form.releaseYear} onChange={(event) => handleInputChanges('releaseYear', event.target.value)}>
                                        < option default > ---select year--- </option>
                                        {this.optionYear(1920, 2020)}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="discount" sm="3">Discount </Label>
                                <Col sm='6'>
                                    <Input type="number" step="0.01" min="0" max="1" id='discount' name="discount" value={form.discount}  placeholder='(100% = 1)'onChange={(event)=>handleInputChanges('discount', event.target.value)}dd/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='image' sm='3'>Image</Label>
                                <Col sm="9">
                                    <Input type="file" name="image" accept='image/jpeg, image/jpg' onChange= {this.handleImage} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="submit" color="success" disabled={!this.isValidForm()}>
                                        <FaIcon icon='fas paper-plane'/> {!isLoading ? 'Save Album' : 'Submitting...'}
                                    </Button>
                                </Col>
                                <Col>
                                    <Button type='reset' color='secondary' onClick={this.handleReturn}>Return</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return { ...state };
}

function mapDispatchToProps(dispatch) {
    return {
        handleInputChanges: (inputName, inputValue) => dispatch({ type: 'HANDLE_INPUT', payload: { inputName, inputValue } }),
        setLoading: () => dispatch({ type: 'FETCH_DATA' }),
        submitComplete: () => dispatch({ type: 'SUBMIT_COMPLETE' }),
        fetchComplete: (payload) => dispatch({ type: 'FETCH_COMPLETE', payload }),
        reset: () => dispatch({ type: 'RESET' }),
        handleImage: (payload) => dispatch({ type: 'HANDLE_IMAGE', payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlbumForm));