import React, { Component } from 'react';
import LevelService from '../services/LevelService';

class UpdateLevelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nameLevel: '',
            levelDescription: ''
        }
        this.changeNameLevelHandler = this.changeNameLevelHandler.bind(this);
        this.changeLevelDescriptionHandler = this.changeLevelDescriptionHandler.bind(this);
        this.updateLevel = this.updateLevel.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        LevelService.getLevelById(this.state.id).then((res) => {
            let level = res.data;
            this.setState({
                nameLevel: level.nameLevel,
                levelDescription: level.levelDescription
            });
        });
    }

    updateLevel = (e) => {
        e.preventDefault();
        let level = { nameLevel: this.state.nameLevel, levelDescription: this.state.levelDescription };
        console.log('level => ' + JSON.stringify(level));



        LevelService.updateLevel(level, this.state.id).then(res => {
            this.props.history.push('/levels');
        });
    }

    cancel() {
        this.props.history.push('/levels');
    }

    changeNameLevelHandler = (event) => {
        this.setState({ nameLevel: event.target.value });
    }

    changeLevelDescriptionHandler = (event) => {
        this.setState({ levelDescription: event.target.value });
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div>
                            <h3 className='text-center'>Thêm Học Vấn</h3>
                            <div className='card-body card col-md-6 offset-md-3 offset-md-3'>
                                <form>
                                    <div className='form-group'>
                                        <label>Trình độ tốt nghiệp:</label>
                                        <input placeholder='Trình độ tốt nghiệp' name='nameLevel' className='form-control'
                                            value={this.state.nameLevel} onChange={this.changeNameLevelHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Thông tin:</label>
                                        <input placeholder='Thông tin' name='levelDescription' className='form-control'
                                            value={this.state.levelDescription} onChange={this.changeLevelDescriptionHandler} />
                                    </div>

                                    <button className='btn btn-success fix' onClick={this.updateLevel}>Cập nhật</button>
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

export default UpdateLevelComponent;