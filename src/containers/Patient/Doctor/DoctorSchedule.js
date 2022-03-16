import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { languages } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService'
import BookingModal from './Model/BookingModal';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTime: {}

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []

            })
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        if (this.props.doctorIdFromParent) {

            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []

            })
        }
        this.setState({
            allDays: allDays,
        })

    }
    capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === languages.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd-DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd-DD/MM');
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }
    handleOnchangeSelectDate = async (event) => {
        console.log('check props', this.props.detailDoctor);

        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            } else {

            }
            console.log('check res', res);

        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTime: time

        })
    }

    closeBookingModal = (time) => {
        this.setState({
            isOpenModalBooking: false

        })
    }
    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTime } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelectDate(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calender'>
                            <i className="fas fa-calendar-alt">
                                <span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <React.Fragment>
                                    <div className='time-content-btn'>
                                        {
                                            allAvailableTime.map((item, index) => {
                                                let timeDisplay = language === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >{timeDisplay}</button>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className="fas fa-hand-point-up"></i>
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </React.Fragment>
                                : <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }


                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTime}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
