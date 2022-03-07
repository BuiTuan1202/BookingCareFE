import React, { Component } from 'react';
import { connect } from 'react-redux';
class HomeFooter extends Component {


    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2022 Đặt lịch khám bệnh. More infomation, please contact with my facebook 
                    <a target='_blank' href='https://www.facebook.com/tuanbv12'> &#8594; click here &#8592;</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
