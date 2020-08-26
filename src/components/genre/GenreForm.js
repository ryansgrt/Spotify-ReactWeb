import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Col, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap'
import * as Service from './services/GenreServices'
import FaIcon from '../../shared/FontAwesome/FaIcon'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {createGenre, updateGenre} from "./services/GenreServices";

class GenreForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSubmiting:false
        }
    }



    submitGenreData = async() => {
         const { form } = this.props;
         return await createGenre(form)
        // if (form.id) return await updateGenre (form);
        // else return await createGenre (form);
        // return await Service.createGenre(form)
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { setLoading, submitComplete, history } = this.props;

        setLoading();
        this.submitGenreData().then((content) => {
            submitComplete(content);
            history.replace('/genre')
        });
    }

    isValidForm = () => {
        const { form, isLoading } = this.props;
        return (form.name.trim().length > 0 || isLoading);
    }

    handleReturn=()=>{
        const {history } = this.props;
        history.replace("/genre")
    }

    render() {

        const { form, isLoading, handleInputChanges } = this.props;
        return (
            <Fragment>
                <Card>
                    <CardHeader tag='form'> Genre Form </CardHeader>
                    <CardBody>
                        <Form onSubmit={(event)=>this.handleFormSubmit(event)}>
                            <FormGroup row>
                                <Label for='name' sm='3'>Genre Name</Label>
                                <Col sm="9">
                                    <Input type="text" id="name" name="name" value={form.name} placeholder="Genre name" onChange={(event)=>handleInputChanges('name', event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="submit" color="success" disabled={!this.isValidForm()}>
                                        <FaIcon icon='fas save'/> {!isLoading ? 'Save Genre' : 'Submitting...'}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GenreForm));