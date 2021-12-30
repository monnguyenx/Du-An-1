import React, { Component } from 'react';
import DegreeService from '../services/DegreeService';

class UpdateDegreeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nameDegree: '',
            degreeDescription: ''
        }
        this.changeNameDegreeHandler = this.changeNameDegreeHandler.bind(this);
        this.changeDegreeDescriptionHandler = this.changeDegreeDescriptionHandler.bind(this);
        this.updateDegree = this.updateDegree.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        DegreeService.getDegreeById(this.state.id).then((res) => {
            let degree = res.data;
            this.setState({
                nameDegree: degree.nameDegree,
                degreeDescription: degree.degreeDescription
            });
        });
    }

    updateDegree = (e) => {
        e.preventDefault();
        let degree = { nameDegree: this.state.nameDegree, degreeDescription: this.state.degreeDescription };
        console.log('degree => ' + JSON.stringify(degree));



        DegreeService.updateDegree(degree, this.state.id).then(res => {
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

                                    <button className='btn btn-success fix' onClick={this.updateDegree}>Cập nhật</button>
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

export default UpdateDegreeComponent;