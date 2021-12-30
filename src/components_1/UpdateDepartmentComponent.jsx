import React, { Component } from 'react';
import DepartmentService from '../services/DepartmentService';


class UpdateDepartmentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nameDepartment: '',
            departmentDescription: ''
        }
        this.changeNameDepartmentHandler = this.changeNameDepartmentHandler.bind(this);
        this.changeDepartmentDescriptionHanDler = this.changeDepartmentDescriptionHandler.bind(this);
        this.updateDepartment = this.updateDepartment.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        DepartmentService.getDepartmentById(this.state.id).then((res) => {
            let department = res.data;
            this.setState({
                nameDepartment: department.nameDepartment,
                departmentDescription: department.departmentDescription
            });
        });
    }

    updateDepartment = (e) => {
        e.preventDefault();
        let department = { nameDepartment: this.state.nameDepartment, departmentDescription: this.state.departmentDescription };
        console.log('department => ' + JSON.stringify(department));

        DepartmentService.updateDepartment(department, this.state.id).then((res) => {
            this.props.history.push('/departments');
        });
    }

    cancel() {
        this.props.history.push('/departments');
    }

    changeNameDepartmentHandler = (event) => {
        this.setState({ nameDepartment: event.target.value });
    }

    changeDepartmentDescriptionHandler = (event) => {
        this.setState({ departmentDescription: event.target.value });
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div>
                            <h3 className='text-center'>Cập Nhật Phòng Ban</h3>
                            <div className='card-body card col-md-6 offset-md-3 offset-md-3'>
                                <form>
                                    <div className='form-group'>
                                        <label>Tên phòng ban:</label>
                                        <input placeholder='Tên phòng ban' name='nameDepartment' className='form-control'
                                            value={this.state.nameDepartment} onChange={this.changeNameDepartmentHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Mô tả:</label>
                                        <input placeholder='Mô tả' name='departmentDescription' className='form-control'
                                            value={this.state.departmentDescription} onChange={this.changeDepartmentDescriptionHandler} />
                                    </div>

                                    <button className='btn btn-success fix' onClick={this.updateDepartment}>Cập nhật</button>
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

export default UpdateDepartmentComponent;