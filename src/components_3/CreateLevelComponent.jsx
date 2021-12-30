import React, { Component } from 'react';
import LevelService from '../services/LevelService';

class CreateLevelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameLevel: '',
            levelDescription: ''
        }
        this.changeNameLevelHandler = this.changeNameLevelHandler.bind(this);
        this.changeLevelDescriptionHandler = this.changeLevelDescriptionHandler.bind(this);
        this.saveLevel = this.saveLevel.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    saveLevel = (e) => {
        e.preventDefault();
        let level = { nameLevel: this.state.nameLevel, levelDescription: this.state.levelDescription };
        console.log('level => ' + JSON.stringify(level));



        LevelService.createLevel(level).then(res => {
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

                                    <button className='btn btn-success fix' onClick={this.saveLevel}>Lưu</button>
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

export default CreateLevelComponent;