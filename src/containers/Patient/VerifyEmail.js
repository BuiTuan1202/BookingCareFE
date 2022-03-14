import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyBookingAppointment } from '../../services/userService';
import './VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
        // 
        // }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {

            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode && res ? res.errCode : -1
                })

            }
        }

        // if (this.props.match.params && this.props.match && this.props.match.params.id) {

        // }

    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            loading data.....
                        </div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='info-booking'>xác nhận lịch hẹn thành công</div>
                                :
                                <div className='info-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
                            }
                        </div>
                    }
                </div>

            </>


        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
