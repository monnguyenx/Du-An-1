import React, { Component } from 'react';
import PositionService from '../services/PositionService';


class ListPositionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            positions: []
        }
        this.addPosition = this.addPosition.bind(this);
        this.editPosition = this.editPosition.bind(this);
        this.deletePosition = this.deletePosition.bind(this);
    }

    componentDidMount() {
        PositionService.getPositions().then(res => {
            this.setState({ positions: res.data });
        });
    }

    editPosition(id) {
        this.props.history.push(`/update-positions/${id}`);
    }

    deletePosition(id) {
        PositionService.deletePosition(id).then((res) => {
            this.setState({ positions: this.state.positions.filter(position => position.id !== id) });
        })
    }

    addPosition() {
        this.props.history.push('/add-positions');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Chức vụ</h2>
                <div className='width'>
                    <button className='btn btn-primary' onClick={this.addPosition}>Thêm Chức vụ</button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Tên chức vụ</th>
                                <th>Mô tả</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.positions.map(
                                    position =>
                                        <tr key={position.id}>
                                            <td>{position.namePosition}</td>
                                            <td>{position.positionDescription}</td>
                                            <td>
                                                <button onClick={() => this.editPosition(position.id)} className='btn btn-info'>Cập nhật</button>
                                                <button onClick={() => this.deletePosition(position.id)} className='btn btn-danger' style={{ marginLeft: '30px' }}>Xóa</button>
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

export default ListPositionComponent;