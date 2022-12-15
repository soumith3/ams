import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { DatePicker, Table, Switch } from 'antd'
import moment from 'moment'
import { toast } from 'react-toastify';



const CreateAttendance = () => {
    const locationDetails = useParams();
    const [attendanceDate, updateattendanceDate] = useState(moment())
    const [userDetails, updateuserDetails] = useState(localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null)
    const [students, updateStudents] = useState([])
    const [professorDetails, updateprofessorDetails] = useState(null)
    const [sectionName, updatesectionName] = useState('')
    const [timeSlot, updateTimeSlot] = useState('')
    const [sectionid, updatesectionId] = useState('')

    const attendanceColumns = [
        {
            title: 'Student First Name',
            key: 'FirstName',
            dataIndex: 'FirstName'
        },
        {
            title: 'Student Last Name',
            key: 'LastName',
            dataIndex: 'LastName'
        },
        {
            title: 'Phone',
            key: 'Phone',
            dataIndex: 'Phone'
        },
        {
            title: 'Email',
            key: 'Email',
            dataIndex: 'Email'
        },
        {
            title: 'Action',
            key: '_id',
            dataIndex: '_id',
            render: (rowid) => <Switch checkedChildren="absent" unCheckedChildren="present" onChange={(checked) => markattendance(checked, rowid)} />
        }
    ]

    const markattendance = async (checked, rowid) => {
        if (checked) {
            const attendance = {
                sectionId: sectionid,
                studentId: rowid,
                attendanceDate: moment(attendanceDate).format('YYYY-MM-DD')
            }
            await axios.post('https://amsserver.herokuapp.com/attendance/addnewattendance', attendance).then((response) => {
                if (response.status === 200) {
                    toast.success('Attendance marked successfully !!')
                }
            })
        }
    }


    useEffect(() => {
        getSections(locationDetails.sectionid)
    }, [1])

    const getSections = async (sectionid) => {
        await axios.get('https://amsserver.herokuapp.com/section/allsections').then((response) => {
            if (response.status === 200) {
                const sections = response.data
                const section = sections.find((section) => section._id === sectionid)
                updateprofessorDetails(section.ProfessorDetails)
                updatesectionName(section.SectionName)
                updateTimeSlot(section.ClassTime)
                updateStudents(section.Students)
                updatesectionId(section._id)
            }
        })
    }

    const attendanceDateChange = (date) => {
        updateattendanceDate(date)
    }

    return (<div>
        <h4 className="text-center my-4">Mark Attendance - {sectionName} {`(${timeSlot})`}</h4>
        <div className="createsectionform justify-content-center">
            <div className="formfield">
                <label><b>Attendance Date</b></label>
                <DatePicker value={attendanceDate} onChange={attendanceDateChange} />
            </div>
        </div>
        <div className="studenstable">
            <Table
                rowKey="_id"
                columns={attendanceColumns}
                dataSource={students} />
        </div>
    </div>)
}

export default CreateAttendance