import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input, Select, Button, Table } from 'antd'
import { toast } from 'react-toastify';

const { Option } = Select;

const studentColumns = [
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
    }
]

const CreateSection = () => {
    const [professors, updateProfessors] = useState([])
    const [students, updateStudents] = useState([])
    const [sectionName, updateSectionName] = useState('')
    const [professorId, updateProfessorId] = useState('')
    const [timeslot, updateTimeSlot] = useState('8:00 AM - 12:00 PM')
    const [selectedkeys, updateselectedkeys] = useState([])
    const [loading, updateloading] = useState(false)

    useEffect(() => {
        GetUsers()
    }, [1])

    const GetUsers = async () => {
        await axios.get('https://amsserver.herokuapp.com/user/allusers').then((response) => {
            if (response.status === 200) {
                const users = response.data
                updateProfessors(users.filter((user) => user.UserType === 'PROFESSOR'))
                updateStudents(users.filter((user) => user.UserType === 'STUDENT'))
            }
        })
    }

    const selectChange = (rowkeys) => {
        updateselectedkeys(rowkeys)
    }

    const rowSelection = {
        selectedRowKeys: selectedkeys,
        onChange: selectChange,
    };

    const CreateSection = async () => {
        if (!sectionName) {
            toast.error('Please enter a valid section name !!!')
            return;
        }

        if (!professorId) {
            toast.error('Please select a professor !!!')
            return
        }

        if (!timeslot) {
            toast.error('Please select a time slot !!!')
            return
        }

        if (selectedkeys.length <= 0) {
            toast.error('Please select a student !!!')
            return
        }

        const userdetails = {
            SectionName: sectionName,
            ClassTime: timeslot,
            ProfessorDetails: professors.find((professor) => professor._id === professorId),
            Students: students.filter((studentInfo) => selectedkeys.includes(studentInfo._id))
        }

        await axios.post('https://amsserver.herokuapp.com/section/addnewsection', userdetails).then((response) => {
            if (response.status === 201) {
                if (response.data) {
                    toast.success('Section Created Successfully !!!');
                   // setTimeout(() => { window.location.href = '/home' }, 2000)
                } else {
                    toast.error('User Invalid Credentials !!!');
                }
            } else {
                toast.error('Something Went Wrong ! Please try again later !');
            }
        })


    }

    return (<div>
        <h1 className="text-center">Create Section</h1>
        <div className="createsectionform">
            <div className="formfield">
                <label><b>Section Name</b></label>
                <Input placeholder="Enter Section Name" value={sectionName} onChange={(event) => updateSectionName(event.target.value)} />
            </div>
            <div className="formfield">
                <label><b>Professor</b></label>
                <Select value={professorId} onChange={(professorId) => updateProfessorId(professorId)}>
                    {professors.map((professor) => {
                        return <Option key={professor._id} value={professor._id}>{`${professor.FirstName} ${professor.LastName}`}</Option>
                    })}
                </Select>
            </div>
            <div className="formfield">
                <label><b>Time Slot</b></label>
                <Select value={timeslot} onChange={(timeslot) => updateTimeSlot(timeslot)}>
                    <Option value="8:00 AM - 12:00 PM">8:00 AM - 12:00 PM</Option>
                    <Option value="12:00 PM - 4:00 PM">12:00 PM - 4:00 PM</Option>
                    <Option value="4:00 PM - 8:00 PM">4:00 PM - 8:00 PM</Option>
                    <Option value="8:00 PM - 12:00 PM">8:00 PM - 12:00 PM</Option>
                </Select>
            </div>
            <div className="formfield">
                <Button type="primary" loading={loading} className="my-4" onClick={() => CreateSection()}> Create Section </Button>
            </div>
        </div>
        <div className="studenstable">
            <Table
                rowSelection={rowSelection}
                rowKey="_id"
                columns={studentColumns}
                dataSource={students} />
        </div>
    </div>)
}

export default CreateSection