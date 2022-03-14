import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { languages } from '../../../../utils';
import Select from 'react-select';
import { postBookingAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            selectGender: '',
            timeType: '',


        }
    }
    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === languages.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            let doctorId = this.props.dataTime && !_.isEmpty(this.props.dataTime) ? this.props.dataTime.doctorId : '';
            console.log('check data time',);
            let timeType = this.props.dataTime.timeType;
            this.setState({
                doctorId: doctorId,
                timeType: timeType
            })
        }
    }
    async componentDidMount() {
        // if (this.props.match.params && this.props.match && this.props.match.params.id) {

        // }
        this.props.getGenderRedux()

    }
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectGender: selectedOption });
    }
    buildTimeBooking = (dataTime) => {
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
            return `${time} - ${date}`

        }
        return ''
    }
    buildNameBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let Name = language === languages.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName} `
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName} `

            return Name;

        }
        return ''
    }
    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildNameBooking(this.props.dataTime)
        let res = await postBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            doctorId: this.state.doctorId,
            selectGender: this.state.selectGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment success');
            this.props.closeBookingModal();
        } else {
            toast.error('Booking a new appointment fail');
        }
        console.log('check state', this.state);
    }

    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty({ dataTime }) ? dataTime.doctorId : '';
        console.log('check data time', dataTime);
        return (
            <Modal
                isOpen={isOpenModal}
                toggle={this.toggle}
                className={'booking-model-container'}
                size='lg'
                centered
            >
                <div className='booking-modal-content'>

                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.booking-modal.title' /> </span>
                        <span className='right'
                            onClick={closeBookingModal}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className='booking-modal-body container'>
                        <div className="doctorInfo">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label ><FormattedMessage id='patient.booking-modal.fullName' /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />

                            </div>
                            <div className="col-6 form-group">
                                <label ><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className="col-6 form-group">
                                <label ><FormattedMessage id='patient.booking-modal.email' /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')} />

                            </div>
                            <div className="col-6 form-group">
                                <label ><FormattedMessage id='patient.booking-modal.address' /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className="col-12 form-group">
                                <label ><FormattedMessage id='patient.booking-modal.reason' /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')} />

                            </div>
                            <div className="col-6 form-group">
                                <label ><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}

                                />
                            </div>
                            <div className="col-6 form-group">
                                <label ><FormattedMessage id='patient.booking-modal.gender' /></label>
                                <Select
                                    value={this.state.selectGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>


                    </div>
                    <div className='booking-modal-footer'>
                        <button className='booking-modal-confirm'
                            onClick={() => this.handleConfirmBooking()}>
                            <FormattedMessage id='patient.booking-modal.confirm' />
                        </button>
                        <button className='booking-modal-cancel'
                            onClick={closeBookingModal} >
                            <FormattedMessage id='patient.booking-modal.cancel' />
                        </button>
                    </div>
                </div>
            </Modal>


        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genderRedux: state.admin.genders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderRedux: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
