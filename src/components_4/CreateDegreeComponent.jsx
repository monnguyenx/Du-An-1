import React, { Component } from 'react';
import DegreeService from '../services/DegreeService';

class CreateDegreeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameDegree: '',
            degreeDescription: ''
        }
        this.changeNameDegreeHandler = this.changeNameDegreeHandler.bind(this);
        this.changeDegreeDescriptionHandler = this.changeDegreeDescriptionHandler.bind(this);
        this.saveDegree = this.saveDegree.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    saveDegree = (e) => {
        e.preventDefault();
        let degree = { nameDegree: this.state.nameDegree, degreeDescription: this.state.degreeDescription };
        console.log('degree => ' + JSON.stringify(degree));



        DegreeService.createDegree(degree).then(res => {
            this.props.history.push('/degrees');
        });
    }

    cancel() {
        this.props.history.push('/degrees');
    }

    changeNameDegreeHandler = (event) => {
        this.setState({ nameDegree: event.target.value });
    }

    changeDegreeDescriptionHandler = (event) => {
        this.setState({ degreeDescription: event.target.value });
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div>
                            <h3 className='text-center'>Thêm Bằng Cấp</h3>
                            <div className='card-body card col-md-6 offset-md-3 offset-md-3'>
                                <form>
                                    <div className='form-group'>
                                        <label>Bằng cấp:</label>
                                        <input placeholder='Bằng cấp' name='nameDegree' className='form-control'
                                            value={this.state.nameDegree} onChange={this.changeNameDegreeHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Chứng chỉ:</label>
                                        <input placeholder='Chứng chỉ' name='degreeDescription' className='form-control'
                                            value={this.state.degreeDescription} onChange={this.changeDegreeDescriptionHandler} />
                                    </div>

                                    <button className='btn btn-success fix' onClick={this.saveDegree}>Lưu</button>
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

export default CreateDegreeComponent;