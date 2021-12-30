import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                        <div><a href='/employees' className='navbar-brand'>Quản lý nhân sự</a></div>
                        <div><a href='/departments' className='navbar-brand'>Phòng ban</a></div>
                        <div><a href='/positions' className='navbar-brand'>Chức vụ</a></div>
                        <div><a href='/levels' className='navbar-brand'>Trình độ</a></div>
                        <div><a href='/degrees' className='navbar-brand'>Bằng cấp</a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;