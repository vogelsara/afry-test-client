import React, { Component } from 'react'
import CreateCompanyForm from '../features/companies/CreateCompanyForm'
import CompanyList from '../features/companies/CompanyList'

export default class Companies extends Component {
    render() {
        return (
            <div>
                <h1>Companies</h1>
                <CreateCompanyForm />
                <CompanyList />
            </div>
        )
    }
}
