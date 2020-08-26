import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Col, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap'
import FaIcon from '../../shared/FontAwesome/FaIcon'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {createSong} from "./services/SongServices";

class SongForm extends Component {
        constructor(props){
            super(props);
            this.state = {
                isSubmiting:false
            }
        }

         optionYear(x, y) {
                let year = [];

                for (let i = x; i <= y; i++) {
                    year.push(<option key={i} value={year[i]}>{i}</option>);
                }
                return year;
                }



        submitSongData = async() => {
            const { form } = this.props;
            return await createSong(form)
            // if (form.id) return await updateGenre (form);
            // else return await createGenre (form);
            // return await Service.createGenre(form)
        }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { setLoading, submitComplete, history } = this.props;

        setLoading();
        this.submitSongData().then((content) => {
            submitComplete(content);
            history.replace('/song')
        });
    }

    isValidForm = () => {
        const { form, isLoading } = this.props;
        return (form.title.trim().length > 0 || isLoading);
    }

    handleReturn=()=>{
        const {history } = this.props;
        history.replace("/song")
    }

    render() {

        const { form, isLoading, handleInputChanges,song } = this.props;
        return (
            <Fragment>
                <Card>
                    <CardHeader tag='form'> Song Form </CardHeader>
                    <CardBody>
                        <Form onSubmit={(event)=>this.handleFormSubmit(event)}>
                            <FormGroup row>
                                <Label for='title' sm='3'>Song Title</Label>
                                <Col sm="6">
                                    <Input type="text" id="title" title="title" value={form.title} placeholder="Song title" onChange={(event)=>handleInputChanges('title', event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="duration" sm="3">Discount </Label>
                                <Col sm='6'>
                                    <Input type="number" step="1" min="1" max="500" id='duration' name="duration" value={form.duration}  placeholder='(input seconds)'onChange={(event)=>handleInputChanges('duration', event.target.value)}dd/>
                                </Col>
                            </FormGroup>

                             <FormGroup row>
                             <Label for="price" sm="3">Price </Label>
                             <Col sm='6'>
                                <Input type="number" step="100" min="1000" max="50000" id='price' name="price" value={form.price}  placeholder='(input prices)'onChange={(event)=>handleInputChanges('price', event.target.value)}dd/>
                               </Col>
                             </FormGroup>
                                <FormGroup row>
                                <Label for='releaseYear' sm='3'>Release Year</Label>
                                <Col sm="6">
                                    <Input type="select" id="releaseYear" name="releaseYear" value={form.releaseYear} onChange={(event) => handleInputChanges('releaseYear', event.target.value)}>
                                        < option default > ---select year--- </option>
                                        {this.optionYear(1920, 2020)}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                 <Label for='genre' sm='3'>genre </Label>
                            <Col sm="6">
                                                                                            <Input type="select" id="genre" name="genre" value={form.genre} onChange={(event) => handleInputChanges('genre', event.target.value)}>
                                                                                                < option default > ---select genre--- </option>
                                                                                                <option>8a8a8db471f9622c0171f99f1c350002</option>
                                                                                                <option>Indie Folk</option>
                                                                                            </Input>
                                                                                        </Col>
                                                                                    </FormGroup>

                            <FormGroup row>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="submit" color="success" disabled={!this.isValidForm()}>
                                        <FaIcon icon='fas save'/> {!isLoading ? 'Save Song' : 'Submitting...'}
                                    </Button>
                                    </Col>
                                    <Col>

                                    <Button type="reset" color="dark" class='btn btn-primary center-block' onClick={this.handleReturn}>Return

                                    </Button>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SongForm));