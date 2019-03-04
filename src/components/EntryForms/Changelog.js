import React, { Component } from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import Datetime from "react-datetime";

import Form from 'react-bootstrap/Form';


class ChangelogForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            log_date: moment().format('YYYY-MM-DD'),
            log_message: '',
            log_type: 'Medicine',
            error: null,
        };
    }

    handleDateChange = (dateObj) => {
        console.dir(dateObj);
        this.setState({
            log_date: dateObj.format('YYYY-MM-DD'),
        }, this.handleFormChange);
    }

    handleMessageChange = (e) => {
        this.setState({
            log_message: e.target.value,
        }, this.handleFormChange);
    }

    handleTypeChange = (e) => {
        this.setState({
            log_type: e.target.value,
        }, this.handleFormChange);
    }

    handleFormChange = () => {
        let form_data = {};
        form_data['date'] = this.state.log_date;
        form_data['message'] = this.state.log_message;
        form_data['type'] = this.state.log_type;

        this.props.updateFormData(form_data);
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formChangelogDate">
                    <Form.Label>Date</Form.Label>
                    <Datetime
                        defaultValue={moment()}
                        onChange={this.handleDateChange}
                        timeFormat={false}
                    />
                </Form.Group>
                <Form.Group controlId="formChangelogType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" onChange={this.handleTypeChange}>
                        <option>Medicine</option>
                        <option>Diet</option>
                        <option>Other</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formChangelogMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={this.handleMessageChange} />
                </Form.Group>
            </Form>
        );
    }
}

export default ChangelogForm;