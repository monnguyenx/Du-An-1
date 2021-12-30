import React, { Component } from 'react';
import DepartmentService from '../services/DepartmentService';

class ListDepartmentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            departments: []
        }
        this.addDepartment = this.addDepartment.bind(this);
        this.editDepartment = this.editDepartment.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);
    }

    componentDidMount() {
        DepartmentService.getDepartments().then(res => {
            this.setState({ departments: res.data });
        });
    }

    editDepartment(id) {
        this.props.history.push(`/update-departments/${id}`);
    }

    deleteDepartment(id) {
        DepartmentService.deleteDepartment(id).then((res) => {
            this.setState({ departments: this.state.departments.filter(department => department.id !== id) });
        })
    }

    addDepartment() {
        this.props.history.push('/add-departments');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Phòng Ban</h2>
                <div className='width'>
                    <button className='btn btn-primary' onClick={this.addDepartment}>Thêm Phòng Ban</button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Tên phòng ban</th>
                                <th>Mô tả</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.departments.map(
                                    department =>
                                        <tr key={department.id}>
                                            <td>{department.nameDepartment}</td>
                                            <td>{department.departmentDescription}</td>
                                            <td>
                                                <button onClick={() => this.editDepartment(department.id)} className='btn btn-info'>Cập nhật</button>
                                                <button onClick={() => this.deleteDepartment(department.id)} className='btn btn-danger' style={{ marginLeft: '30px' }}>Xóa</button>
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

export default ListDepartmentComponent;