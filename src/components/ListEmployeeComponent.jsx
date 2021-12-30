import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then(res => {
            this.setState({ employees: res.data.filter(employee => !employee.actionStatus) });
        });
    }

    editEmployee(id) {
        this.props.history.push(`/update-employees/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then((res) => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        })
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employees/${id}`);
    }


    addEmployee() {
        this.props.history.push('/add-employees');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Danh sách nhân viên</h2>
                <div className='width'>
                    <button className='btn btn-primary' onClick={this.addEmployee}>Thêm Nhân Viên</button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Họ và Tên</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Địa chỉ</th>
                                <th>Email</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.name}</td>
                                            <td>{employee.gender ? 'Nam' : 'Nữ'}</td>
                                            <td>{employee.date}</td>
                                            <th>{employee.address}</th>
                                            <th>{employee.emailId}</th>
                                            <td>
                                                <button onClick={() => this.editEmployee(employee.id)} className='btn btn-info'>Cập nhật</button>
                                                <button onClick={() => this.deleteEmployee(employee.id)} className='btn btn-danger' style={{ marginLeft: '30px' }}>Xóa</button>
                                                <button onClick={() => this.viewEmployee(employee.id)} className='btn btn-info' style={{ marginLeft: '30px' }}>Xem chi tiết</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;