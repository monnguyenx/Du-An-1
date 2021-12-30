import React, { Component } from 'react';
import PositionService from '../services/PositionService';



class CreatePositionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            namePosition: '',
            positionDescription: ''
        }
        this.changeNamePositionHandler = this.changeNamePositionHandler.bind(this);
        this.changePositionDescriptionHandler = this.changePositionDescriptionHandler.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        PositionService.getPositionById(this.state.id).then((res) => {
            let position = res.data;
            this.setState({
                namePosition: position.namePosition,
                positionDescription: position.positionDescription
            });
        });
    }

    updatePosition = (e) => {
        e.preventDefault();
        let position = { namePosition: this.state.namePosition, positionDescription: this.state.positionDescription };
        console.log('position => ' + JSON.stringify(position));



        PositionService.updatePosition(position, this.state.id).then(res => {
            this.props.history.push('/positions');
        });
    }

    cancel() {
        this.props.history.push('/positions');
    }

    changeNamePositionHandler = (event) => {
        this.setState({ namePosition: event.target.value });
    }

    changePositionDescriptionHandler = (event) => {
        this.setState({ positionDescription: event.target.value });
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div>
                            <h3 className='text-center'>Cập Nhật Chức Vụ</h3>
                            <div className='card-body card col-md-6 offset-md-3 offset-md-3'>
                                <form>
                                    <div className='form-group'>
                                        <label>Tên chức vụ:</label>
                                        <input placeholder='Tên chức vụ' name='namePosition' className='form-control'
                                            value={this.state.namePosition} onChange={this.changeNamePositionHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Mô tả:</label>
                                        <input placeholder='Mô tả' name='positionDescription' className='form-control'
                                            value={this.state.positionDescription} onChange={this.changePositionDescriptionHandler} />
                                    </div>

                                    <button className='btn btn-success fix' onClick={this.updatePosition}>Cập nhật</button>
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

export default CreatePositionComponent;