import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isNull } from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';

import FormModal from '../components/FormModal';

import { fetchData, isApiKeyMissing } from '../common/utils'


class Overview extends Component {

    constructor(props) {
        super(props);
        this.dataInterval = null;
        this.state = {
            redirect_to_login: false,
            which_form: null,
            show_form_modal: false,
            show_save_success: false,
        };
    }

    componentDidMount() {
        this.initializeData();
    }


    apiKeyMissing = () => {
        let keyMissing = isApiKeyMissing();
        this.setState({
            redirect_to_login: keyMissing,
        });
        return keyMissing;
    }

    initializeData = () => {
        if (!this.apiKeyMissing()) {

        }
    }

    closeModal = () => {
        this.setState({
            show_form_modal: false,
            which_form: null,
        });
    }

    showWaterForm = () => {
        this.setState({
            show_form_modal: true,
            which_form: 'water',
        })
    }

    showChangelogForm = () => {
        this.setState({
            show_form_modal: true,
            which_form: 'changelog',
        })
    }

    toggleSaveSuccessAlert = () => {
        const { show_save_success } = this.state;

        this.setState({
            show_save_success: !show_save_success,
        });
    }

    handleSaveSuccess = () => {
        this.toggleSaveSuccessAlert();
        window.setTimeout(this.toggleSaveSuccessAlert, 2000);
    }


    render() {
        if (this.state.redirect_to_login) {
            return <Redirect to="/login" />
        }

        return (
            <Container fluid className="rootContainer">
                <FormModal
                    showModal={this.state.show_form_modal}
                    closeModal={this.closeModal}
                    whichForm={this.state.which_form}
                    onSaveSuccess={this.handleSaveSuccess}
                />

                <Row>
                    <Col>
                        <Card>
                            <Card.Body className="dataEntryButtons">
                                <Button onClick={this.showWaterForm}>Water</Button>
                                <Button onClick={this.showChangelogForm}>Changelog</Button>
                            </Card.Body>
                        </Card>
                        <Alert
                            variant="success"
                            show={this.state.show_save_success}>
                            Data saved.
                        </Alert>
                    </Col>
                </Row>


            </Container>
        );
    }
}

export default Overview;
