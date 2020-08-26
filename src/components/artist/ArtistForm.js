import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Col, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap'
import * as Service from './services/ArtistServices'
import FaIcon from '../../shared/FontAwesome/FaIcon'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';

class ArtistForm extends Component{

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

    submitArtistData = async() => {
        const { form } = this.props;
        console.log(form)
        return await Service.createArtist(form, this.state.selectedImage);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { setLoading, submitComplete } = this.props;
        setLoading();
        this.submitArtistData().then((content) => {
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
        Service.getArtists()
            .then((artists)=>{
                fetchComplete(artists);
            });
    }

    componentDidMount() {
        this.loadData();
    }

    isValidForm = () => {
        const { form, isLoading } = this.props;
        return (form.name.trim().length > 0
            && form.biography.trim().length > 0
            && form.debutYear !== (<option default> ---select year--- </option>)
            && form.gender  !== (< option default > ---select gender--- </option>)
        ) || isLoading;
    }

    handleReturn=()=>{
        const {history } = this.props;
        history.replace("/artist")
    }

    render() {

        const { form, isLoading, handleInputChanges } = this.props;
        return (
            <Fragment>
                <Card>
                    <CardHeader tag='form'> Artist Form </CardHeader>
                    <CardBody>
                        <Form onSubmit={(event)=>this.handleFormSubmit(event)}>
                            <FormGroup row>
                                <Label for='name' sm='3'>Artist Name</Label>
                                <Col sm="6">
                                    <Input type="text" id="name" name="name" value={form.name} placeholder="Artist name" onChange={(event)=>handleInputChanges('name', event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='releaseYear' sm='3'>Artist Debut Year </Label>
                                <Col sm="6">
                                    <Input type="select" id="releaseYear" name="debutYear" value={form.debutYear} onChange={(event) => handleInputChanges('debutYear', event.target.value)}>
                                        < option default > ---select year--- </option>
                                        {this.optionYear(1920, 2020)}
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for='gender' sm='3'>Gender </Label>
                                <Col sm="6">
                                    <Input type="select" id="gender" name="gender" value={form.gender} onChange={(event) => handleInputChanges('gender', event.target.value)}>
                                        < option default > ---select gender--- </option>
                                        <option>MALE</option>
                                        <option>FEMALE</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='description' sm='3'>Biography</Label>
                                <Col sm='6'>
                                    <Input type="textarea" id='biography' name='biography' value={form.biography} placeholder='Insert Biography' onChange={(event)=>handleInputChanges('biography', event.target.value)}/>
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
                                        <FaIcon icon='fas paper-plane'/> {!isLoading ? 'Save Artist' : 'Submitting...'}
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
        submitComplete: () => dispatch({ type: 'SUBMIT_COMPLETE'}),
        fetchComplete: (payload) => dispatch({ type: 'FETCH_COMPLETE', payload }),
        handleImage: (payload) => dispatch({ type: 'HANDLE_IMAGE', payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArtistForm));