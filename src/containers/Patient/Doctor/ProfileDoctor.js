import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { languages } from '../../../utils'
import { getProfileDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let doctorId = this.props.doctorId;
            let data = await this.getInfoDoctor(doctorId)
            this.setState({
                dataProfile: data,
            });
        }
    }
    async componentDidMount() {
        let doctorId = this.props.doctorId;
        let data = await this.getInfoDoctor(doctorId)
        this.setState({
            dataProfile: data
        })
        // if (this.props.match.params && this.props.match && this.props.match.params.id) {

        // }

    }
    getInfoDoctor = async (doctorId) => {
        let result = {};
        if (doctorId) {
            let res = await getProfileDoctorById(doctorId);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === languages.VI ?
                dataTime.timeTypeData.valueVi
                :
                dataTime.timeTypeData.valueEn
            let date = language === languages.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd-DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd-MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div> <FormattedMessage id='patient.booking-modal.free-booking' /></div>
                </>
            )
        }
        return <></>
    }

    render() {

        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime,
            isShowPrice, isShowLinkDetail, doctorId } = this.props;
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        return (
            <div className="profile-doctor-container">
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile.image})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === languages.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }

                        </div>
                    </div>

                </div>
                {isShowLinkDetail === true &&

                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`}  >Xem thêm</Link>

                    </div>}
                {isShowPrice === true &&
                    <div className="price">
                        <FormattedMessage id='patient.booking-modal.price' />
                        {dataProfile && dataProfile.DoctorInfo && language === languages.VI ?
                            <NumberFormat
                                className='currency'
                                value={dataProfile.DoctorInfo.priceData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'} />
                            : ''
                        }
                        {dataProfile && dataProfile.DoctorInfo && language === languages.EN ?
                            <NumberFormat
                                className='currency'
                                value={dataProfile.DoctorInfo.priceData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'} /> : ''
                        }
                    </div>
                }
            </div>



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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
