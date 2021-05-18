import React, { Component } from 'react';
import CreatePersonForm from '../features/people/CreatePersonForm';

export default class CreatePeople extends Component {
    render() {
        return (
            <div>
                <h1>Create people</h1>
                <CreatePersonForm />
            </div>
        )
    }
}