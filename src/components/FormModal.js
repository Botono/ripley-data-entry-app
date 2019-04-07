import React, { Component } from 'react';
import { isNull } from 'lodash';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { postData } from '../common/utils'

import WaterForm from './EntryForms/Water';
import ChangelogForm from './EntryForms/Changelog';


class FormModal extends Component {

    constructor(props) {
        super(props);

        this.form_config = {
            water: {
                endpoint: '/water',
                title: 'Water',
            },
            changelog: {
                endpoint: '/changelog',
                title: 'Changelog',
            }
        };

        this.state = {
            form_data: {},
            form_error: null,
            saving: false,
        };
    }

    componentDidMount() {

    }

    updateFormData = (data) => {
        this.setState({
            form_data: data,
            form_error: null,
        });
    }

    getFormComponent = () => {
        let { whichForm } = this.props;

        let theForm = null;

        if (!isNull(whichForm)) {
            switch (whichForm) {
                case 'water':
                    theForm =  (
                        <WaterForm updateFormData={this.updateFormData} />
                    );
                    break;
                case 'changelog':
                    theForm = (
                        <ChangelogForm updateFormData={this.updateFormData} />
                    );
                    break;
                default:
                    break;
            }
        }



        return theForm;
    }

    getTitle = () => {
        let { whichForm } = this.props;
        if (!isNull(whichForm)) {
            return this.form_config[this.props.whichForm].title;
        }

        return '';
    }

    getEndpoint = () => {
        let { whichForm } = this.props;
        if (!isNull(whichForm)) {
            return this.form_config[this.props.whichForm].endpoint;
        }

        return '';
    }

    toggleSaving = () => {
        const { saving } = this.state;

        this.setState({
            saving: !saving,
        });
    }

    saveForm = () => {
        const that = this;
        let { form_data } = this.state;

        this.toggleSaving();

        postData(this.getEndpoint(), form_data)
            .then(function (json_data) {
                console.dir(json_data);
                if (json_data['error']) {
                    that.setState({
                        form_error: json_data.error,
                    });
                } else {
                    that.props.closeModal();
                    that.setState({
                        form_data: {},
                        form_error: null,
                    });
                    that.props.onSaveSuccess();
                }
                that.toggleSaving();
            });
    }

    render() {
        const { saving } = this.state;
        let saveButtonValue = 'Save';

        if (saving) {
            saveButtonValue = <i class="fas fa-sync fa-spin"></i>;
        }

        return (
            <Modal
                show={this.props.showModal}
                centered
            >
                <Modal.Header>
                    <Modal.Title>{this.getTitle()}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Alert variant="danger" show={!isNull(this.state.form_error)} >
                        {this.state.form_error}
                    </Alert>
                    {this.getFormComponent()}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal}>Cancel</Button>
                    <Button variant="primary" onClick={this.saveForm}>{saveButtonValue}</Button>
                </Modal.Footer>
            </Modal>
        );

    }
}

export default FormModal;