import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Button } from "reactstrap";
import { Table } from "antd";

const ProfessionalDashboard = () => {
    const [sections, updateSections] = useState([])

    useEffect(() => {
        getSections()
    }, [1])

    const getSections = async () => {
        await axios.get('https://amsserver.herokuapp.com/section/allsections').then((response) => {
            if (response.status === 200) {
                updateSections(response.data)
            }

        })
    }

    const sectionColumns = [
        {
            title: 'Section Name',
            key: 'SectionName',
            dataIndex: 'SectionName'
        },
        {
            title: 'Professor First Name',
            key: 'ProfessorName',
            dataIndex: ['ProfessorDetails', 'FirstName']
        },
        {
            title: 'Professor Last Name',
            key: 'ProfessorLastName',
            dataIndex: ['ProfessorDetails', 'LastName']
        },
        {
            title: 'Time Slot',
            key: 'ClassTime',
            dataIndex: 'ClassTime'
        },
        {
            title: 'Action',
            key: '_id',
            dataIndex: '_id',
            render: (rowid) => <Button type="primary" onClick={(event) => window.location.href = `/createattendance/${rowid}`}>Mark Attendance</Button>
        }
    ]




    return (<div>
        <h1 className="text-center">Student Dashboard</h1>
        <div className="studenstable">
            <Table
                rowKey="_id"
                columns={sectionColumns}
                dataSource={sections} />
        </div>
    </div>)
}

export default ProfessionalDashboard