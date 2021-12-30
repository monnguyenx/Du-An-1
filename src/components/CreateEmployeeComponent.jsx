import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import DepartmentService from '../services/DepartmentService';
import LevelService from '../services/LevelService';
import PositionService from '../services/PositionService';
import DegreeService from '../services/DegreeService';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            gender: 1,
            date: new Date(),
            dateSave: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            address: '',
            emailId: '',
            departments: [],
            selectDepartment: '',
            positions: [],
            selectPosition: '',
            levels: [],
            selectLevel: '',
            degrees: [],
            selectDegree: '',
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        DepartmentService.getDepartments().then(res => {
            this.setState({ departments: res.data });
        });
        PositionService.getPositions().then(res => {
            this.setState({ positions: res.data });
        });
        LevelService.getLevels().then(res => {
            this.setState({ levels: res.data });
        })
        DegreeService.getDegrees().then(res => {
            this.setState({ degrees: res.data });
        })
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = { name: this.state.name, address: this.state.address, emailId: this.state.emailId, gender: this.state.gender, date: this.state.dateSave, departmentId: this.state.selectDepartment, degreeId: this.state.selectDegree, positionId: this.state.selectPosition, levelId: this.state.selectLevel };
        console.log('employee => ' + JSON.stringify(employee));

        EmployeeService.createEmployee(employee).then(res => {
            EmployeeService.createEmployeeJoinDepartment(res.data.id, employee.departmentId).then(res => {
                EmployeeService.createEmployeeJoinPosition(res.data.id, employee.positionId).then(res => {
                    EmployeeService.createEmployeeJoinLevel(res.data.id, employee.levelId).then(res => {
                        EmployeeService.createEmployeeJoinDegree(res.data.id, employee.degreeId).then(res => {
                            this.props.history.push('/employees');
                        });
                    });
                });
            });
        });
    }

    cancel() {
        this.props.history.push('/employees');
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value });
    }

    changeEmailIdHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }

    handleChangePosition = (e) => {
        this.setState({ selectPosition: e.target.value });
    }

    handleChangeLevel = (e) => {
        this.setState({ selectLevel: e.target.value });
    }

    handleChangeDegree = (e) => {
        this.setState({ selectDegree: e.target.value });
    }

    handleChange = (e) => {
        this.setState({ selectDepartment: e.target.value });
    }
    handleOptionChange = (e) => {
        this.setState({ gender: Number(e.target.value) });
    }
    handleDate = (date) => {
        this.setState({ date, dateSave: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` });
    }

    render() {
        const radio = {
            marginLeft: "5px"
        };
        const dropdow = {
            marginTop: "10px"
        };
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div>
                            <h3 className='text-center'>Thêm Nhân Viên</h3>
                            <div className='card-body card col-md-6 offset-md-3 offset-md-3'>
                                <form>
                                    {/* Họ và tên */}
                                    <div className='form-group'>
                                        <label>Họ và tên:</label>
                                        <input placeholder='Họ và tên' name='name' className='form-control'
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    {/* Giới tính */}
                                    <div className="col-sm-12">
                                        <input
                                            type="radio"
                                            name='gender'
                                            value='1'
                                            checked={this.state.gender === 1}
                                            onChange={this.handleOptionChange}
                                        /> Nam
                                        <input
                                            style={radio}
                                            type="radio"
                                            name='gender'
                                            value='0'
                                            checked={this.state.gender === 0}
                                            onChange={this.handleOptionChange}
                                        /> Nữ
                                    </div>
                                    {/* Địa chỉ */}
                                    <div className='form-group'>
                                        <label>Địa chỉ:</label>
                                        <input placeholder='Địa chỉ' name='address' className='form-control'
                                            value={this.state.address} onChange={this.changeAddressHandler} />
                                    </div>
                                    {/* Email */}
                                    <div className='form-group'>
                                        <label>Email:</label>
                                        <input placeholder='Email' name='emailId' className='form-control'
                                            value={this.state.emailId} onChange={this.changeEmailIdHandler} />
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        {/* Chọn Phòng Ban */}
                                        <div style={dropdow}>
                                            <select
                                                value={this.state.selectDepartment}
                                                onChange={this.handleChange}
                                            >
                                                <option value="">Select Department</option>
                                                {this.state.departments.map(department => (
                                                    <option key={department.id} value={department.id}>{department.nameDepartment}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* Ngày sinh */}
                                        <div style={{
                                            marginLeft: '160px',
                                            marginTop: '10px'
                                        }}>
                                            <DatePicker
                                                selected={this.state.date}
                                                onChange={this.handleDate}
                                                name="date"
                                                dateFormat="yyyy/MM/dd"
                                            /></div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        {/* Chọn Chức Vụ */}
                                        <div style={dropdow}>
                                            <select
                                                value={this.state.selectPosition}
                                                onChange={this.handleChangePosition}
                                            >
                                                <option value="">Select Position</option>
                                                {this.state.positions.map(position => (
                                                    <option key={position.id} value={position.id}>{position.namePosition}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* Chọn Trình Độ */}
                                        <div style={{
                                            dropdow,
                                            marginLeft: '138px',
                                            marginTop: '10px'
                                        }}>
                                            <select
                                                value={this.state.selectLevel}
                                                onChange={this.handleChangeLevel}
                                            >
                                                <option value="">Select Level</option>
                                                {this.state.levels.map(level => (
                                                    <option key={level.id} value={level.id}>{level.nameLevel}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* Chọn Bằng Cấp */}
                                        <div style={{ dropdow, marginLeft: '100px', marginTop: '10px' }}>
                                            <select
                                                value={this.state.selectDegree}
                                                onChange={this.handleChangeDegree}
                                            >
                                                <option value="">Select Degree</option>
                                                {this.state.degrees.map(degree => (
                                                    <option key={degree.id} value={degree.id}>{degree.nameDegree}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>



                                    <button className='btn btn-success fix' onClick={this.saveEmployee}>Lưu</button>
                                    <button className='btn btn-danger fix' onClick={this.cancel} style={{ marginLeft: "10px" }}>Quay lại</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default CreateEmployeeComponent;