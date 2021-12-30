import React, { Component } from 'react';
import LevelService from '../services/LevelService';

class ListLevelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            levels: []
        }
        this.addLevel = this.addLevel.bind(this);
        this.editLevel = this.editLevel.bind(this);
        this.deleteLevel = this.deleteLevel.bind(this);
    }

    componentDidMount() {
        LevelService.getLevels().then(res => {
            this.setState({ levels: res.data });
        });
    }

    editLevel(id) {
        this.props.history.push(`/update-levels/${id}`);
    }

    deleteLevel(id) {
        LevelService.deleteLevel(id).then((res) => {
            this.setState({ levels: this.state.levels.filter(level => level.id !== id) });
        })
    }

    addLevel() {
        this.props.history.push('/add-levels');
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Trình độ tốt nghiệp</h2>
                <div className='width'>
                    <button className='btn btn-primary' onClick={this.addLevel}>Thêm Trình Độ Tốt Nghiệp</button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Trình độ tốt nghiệp</th>
                                <th>Thông tin</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.levels.map(
                                    level =>
                                        <tr key={level.id}>
                                            <td>{level.nameLevel}</td>
                                            <td>{level.levelDescription}</td>
                                            <td>
                                                <button onClick={() => this.editLevel(level.id)} className='btn btn-info'>Cập nhật</button>
                                                <button onClick={() => this.deleteLevel(level.id)} className='btn btn-danger' style={{ marginLeft: '30px' }}>Xóa</button>
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

export default ListLevelComponent;