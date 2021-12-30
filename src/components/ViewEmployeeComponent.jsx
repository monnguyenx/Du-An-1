import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {},
            nameDepartment: '',
            namePosition: '',
            nameLevel: '',
            nameDegree: ''
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            console.log("mon đẹp trai", res.data)
            this.setState({ employee: res.data, nameDepartment: res.data.department.nameDepartment, namePosition: res.data.position.namePosition, nameLevel:res.data.level.nameLevel,nameDegree:res.data.degree.nameDegree });
        })
    }

    render() {
        return (
            <div>
                <div className='card col-md-6 offset-md-3'>
                    <h3 className='text-center'>Xem chi tiết nhân viên</h3>
                    <div className='card-body'>
                        <div className='row'>
                            <label>Họ Nhân Viên: {this.state.employee.name}</label>
                        </div>
                        <div className='row'>
                            <label>Tên Nhân Viên: {this.state.employee.address}</label>
                        </div>
                        <div className='row'>
                            <label>Giới tính: {this.state.employee.gender ? "Nam" : "Nữ"}</label>
                        </div>
                        <div className='row'>
                            <label>Ngày sinh: {this.state.employee.date}</label>
                        </div>
                        <div className='row'>
                            <label>Email Nhân Viên: {this.state.employee.emailId}</label>
                        </div>
                        <div className='row'>
                            <label>Phòng ban: {this.state.nameDepartment}</label>
                        </div>
                        <div className='row'>
                            <label>Chức vụ: {this.state.namePosition}</label>
                        </div>
                        <div className='row'>
                            <label>Trình độ: {this.state.nameLevel}</label>
                        </div>
                        <div className='row'>
                            <label>Bằng cấp: {this.state.nameDegree}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;