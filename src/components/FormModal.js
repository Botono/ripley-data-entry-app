import React, { Component } from 'react';
import { isNull } from 'lodash';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import WaterForm from './EntryForms/Water';


class FormModal extends Component {

    constructor(props) {
        super(props);

        this.form_config = {
            water: {
                endpoint: '/water',
                title: 'Water',
            },
        };

        this.state = {
            form_data: {},
        };
    }

    componentDidMount() {

    }

    updateFormData = (data) => {
        this.setState({
            form_data: data,
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

    saveForm = () => {
        console.dir(this.state.form_data);
    }

    render() {
        return (
            <Modal
                show={this.props.showModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.getTitle()}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.getFormComponent()}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal}>Cancel</Button>
                    <Button variant="primary" onClick={this.saveForm}>Save</Button>
                </Modal.Footer>
            </Modal>
        );

    }
}

export default FormModal;