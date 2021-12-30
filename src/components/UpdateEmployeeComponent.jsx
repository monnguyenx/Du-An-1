import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import DepartmentService from '../services/DepartmentService';
import LevelService from '../services/LevelService';
import PositionService from '../services/PositionService';
import DegreeService from '../services/DegreeService';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            gender: 1,
            address: '',
            emailId: '',
            date: new Date(),
            dateSave: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
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
        this.updateEmployee = this.updateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }


    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            console.log(40, employee)
            this.setState({
                date: employee.date ? new Date(employee.date) : new Date(),
                dateSave: employee.date ? employee.date : new Date(),
                name: employee.name,
                address: employee.address,
                emailId: employee.emailId,
                gender: employee.gender ? 1 : 0,
                selectDepartment: employee.department ? employee.department.id : '',
                selectDegree: employee.degree ? employee.degree.id : '',
                selectPosition: employee.position ? employee.position.id : '',
                selectLevel: employee.level ? employee.level.id : ''
            });
        });
        DepartmentService.getDepartments().then(res => {
            this.setState({ departments: res.data });
        });
        PositionService.getPositions().then(res => {
            this.setState({ positions: res.data });
        });
        LevelService.getLevels().then(res => {
            this.setState({ levels: res.data });
        });
        DegreeService.getDegrees().then(res => {
            this.setState({ degrees: res.data });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = { name: this.state.name, address: this.state.address, emailId: this.state.emailId, gender: this.state.gender, date: this.state.dateSave, departmentId: this.state.selectDepartment, degreeId: this.state.selectDegree, positionId: this.state.selectPosition, levelId: this.state.selectLevel };
        console.log('employee => ' + JSON.stringify(employee));

        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
            EmployeeService.createEmployeeJoinDepartment(this.state.id, employee.departmentId).then(res => {
                EmployeeService.createEmployeeJoinPosition(this.state.id, employee.positionId).then(res => {
                    EmployeeService.createEmployeeJoinLevel(this.state.id, employee.levelId).then(res => {
                        EmployeeService.createEmployeeJoinDegree(this.state.id, employee.degreeId).then(res => {
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
                            <h3 className='text-center'>Cập Nhật Nhân Viên</h3>
                            <div className='card-body card col-md-6 offset-md-3 offset-md-3'>
                                <form>
                                    <div className='form-group'>
                                        <label>Họ và tên:</label>
                                        <input placeholder='Họ và tên' name='name' className='form-control'
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
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
                                    <div className='form-group'>
                                        <label>Địa chỉ:</label>
                                        <input placeholder='Địa chỉ' name='address' className='form-control'
                                            value={this.state.address} onChange={this.changeAddressHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Email:</label>
                                        <input placeholder='Email' name='emailId' className='form-control'
                                            value={this.state.emailId} onChange={this.changeEmailIdHandler} />
                                    </div>
                                    <div style={{ display: "flex" }}>
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
                                        <div style={{
                                            marginLeft: '110px',
                                            marginTop: '10px'
                                        }}>
                                            <DatePicker
                                                selected={this.state.date}
                                                onChange={this.handleDate}
                                                name="date"
                                                dateFormat="yyyy/MM/dd"
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
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



                                    <button className='btn btn-success fix' onClick={this.updateEmployee}>Cập nhật</button>
                                    <button className='btn btn-danger fix' onClick={this.cancel} style={{ marginLeft: "10px" }}>Quay lại</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateEmployeeComponent;