import React, { Component } from 'react';
import DegreeService from '../services/DegreeService';

class ListDegreeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            degrees: []
        }
        this.addDegree = this.addDegree.bind(this);
        this.editDegree = this.editDegree.bind(this);
        this.deleteDegree = this.deleteDegree.bind(this);
    }

    componentDidMount() {
        DegreeService.getDegrees().then(res => {
            this.setState({ degrees: res.data });
        });
    }

    editDegree(id) {
        this.props.history.push(`/update-degrees/${id}`);
    }

    deleteDegree(id) {
        DegreeService.deleteDegree(id).then((res) => {
            this.setState({ degrees: this.state.degrees.filter(degree => degree.id !== id) });
        })
    }

    addDegree() {
        this.props.history.push('/add-degrees');
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Bằng cấp</h2>
                <div className='width'>
                    <button className='btn btn-primary' onClick={this.addDegree}>Thêm Bằng Cấp</button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Bằng cấp</th>
                                <th>Chứng chỉ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.degrees.map(
                                    degree =>
                                        <tr key={degree.id}>
                                            <td>{degree.nameDegree}</td>
                                            <td>{degree.degreeDescription}</td>
                                            <td>
                                                <button onClick={() => this.editDegree(degree.id)} className='btn btn-info'>Cập nhật</button>
                                                <button onClick={() => this.deleteDegree(degree.id)} className='btn btn-danger' style={{ marginLeft: '30px' }}>Xóa</button>
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

export default ListDegreeComponent;