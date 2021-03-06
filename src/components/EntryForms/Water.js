import React, { Component } from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';

import Form from 'react-bootstrap/Form';


class WaterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            water_date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
            water_weight: 0,
            kibble_eaten: false,
            water_notes: '',
            error: null,
            water_actual: 0,
        };
    }

    handleWeightChange = (e) => {
        let val = parseInt(e.target.value) || 0;
        this.setState({
            water_weight: parseInt(val),
        }, this.handleFormChange);
    }

    handleKibbleKlick = () => {
        let { kibble_eaten } = this.state;
        this.setState({
            kibble_eaten: !kibble_eaten,
        }, this.handleFormChange);

    }

    handleNotesChange = (e) => {
        this.setState({
            water_notes: e.target.value,
        }, this.handleFormChange);
    }

    handleDateChange = (e) => {
        this.setState({
            water_date: e.target.value,
        });
    }

    handleFormChange = () => {
        this.getActualVolume();
        let form_data = {};
        form_data['date'] = this.state.water_date;
        form_data['water'] = this.state.water_weight;
        form_data['kibble_eaten'] = this.state.kibble_eaten;
        if (!isEmpty(this.state.water_notes)) {
            form_data['notes'] = this.state.water_notes;
        }

        this.props.updateFormData(form_data);
    }

    getActualVolume = () => {
        let water_actual;
        if (this.state.water_weight === 0) {
            water_actual = 0;
        } else {
            water_actual = 3000 - (this.state.water_weight - 1595);
        }
        this.setState({
            water_actual: water_actual,
        });
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formWaterDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" onChange={this.handleDateChange} value={this.state.water_date} />
                </Form.Group>
                <Form.Group controlId="formWaterWeight">
                    <Form.Label>Water Bowl Weight</Form.Label>
                    <Form.Control type="number" onChange={this.handleWeightChange} autoFocus />
                    <Form.Text className="text-muted">
                        The total weight of the water bowl first thing in the morning.
                    </Form.Text>
                    <span className="small">Water consumed: {this.state.water_actual / 1000} l</span>
                </Form.Group>
                <Form.Group controlId="formKibbleEaten">
                    <Form.Check
                        type="checkbox"
                        label="Kibble Eaten?"
                        id="kibble-eaten"
                        checked={this.state.kibble_eaten}
                        onChange={this.handleKibbleKlick}
                    />
                </Form.Group>
                <Form.Group controlId="formWaterNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={this.handleNotesChange} />
                </Form.Group>
            </Form>
        );
    }
}

export default WaterForm;