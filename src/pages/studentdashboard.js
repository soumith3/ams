import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Button } from "reactstrap";
import { Table } from "antd";

const StudentDashboard = () => {
    const [attendanceDetails, updateattendanceDetails] = useState([])
    const [userdetails, updateuserdetails] = useState(localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null)

    useEffect(() => {
        getSectionsAndAttendances()
    }, [1])

    const getSectionsAndAttendances = async () => {
        const apiRequests = []
        const Section = await axios.get('http://localhost:4000/section/allsections')
        const Attendance = await axios.get('http://localhost:4000/attendance/fetchallattendances')
        apiRequests.push(Section)
        apiRequests.push(Attendance)
        Promise.all(apiRequests).then((response) => {
            if (response[0].status === 200 && response[1].status === 200) {
                const sections = response[0].data
                const attendances = response[1].data
                const mysections = sections.filter((section) => section.Students.map((student) => student._id).includes(userdetails._id))
                const studentattendances = mysections.map((section) => Object.assign({ ...section, attendanceDetails: attendances.filter((attendanceDetails) => attendanceDetails.sectionId === section._id && attendanceDetails.studentId === userdetails._id) }))
                updateattendanceDetails(studentattendances)
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
            title: 'Present Days',
            key: 'attendanceDetails',
            dataIndex: 'attendanceDetails',
            render: (attendanceDetails) => attendanceDetails.length
        }
    ]

    const childColumns = [
        {
            title: 'Present Date / Attendance Date',
            key: 'attendanceDate',
            dataIndex: 'attendanceDate'
        }
    ]




    return (<div>
        <h1 className="text-center">Student Dashboard</h1>
        <div className="studenstable">
            <Table
                rowKey="_id"
                columns={sectionColumns}
                dataSource={attendanceDetails}
                expandedRowRender={(record) => {
                    if (Array.isArray(record.attendanceDetails) && record.attendanceDetails) {
                        return <Table
                            rowKey="_id"
                            dataSource={record.attendanceDetails}
                            columns={childColumns} />
                    }
                }} />
        </div>
    </div>)
}

export default StudentDashboard