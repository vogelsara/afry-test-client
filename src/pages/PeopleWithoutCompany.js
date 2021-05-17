import React, { Component } from 'react'
import PeopleList from '../features/people/PeopleList'

export default class PeopleWithoutCompany extends Component {
    render() {
        return (
            <div>
                <h1>People without company</h1>
                <PeopleList/>
            </div>
        )
    }
}