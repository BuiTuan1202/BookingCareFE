import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import './ManageSchedule.scss'
import * as actions from '../../../store/actions'
import { languages } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux()
        this.props.fetchAllCodeScheduleTime()
    }
    buildDataSelectInput = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = ` ${item.lastName} ${item.firstName}`;
                let labelEn = `  ${item.firstName} ${item.lastName}`;
                object.label = language === languages.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctor !== this.props.AllDoctor) {
            let dataSelect = this.buildDataSelectInput(this.props.AllDoctor)
            this.setState({
                listDoctor: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataSelectInput(this.props.AllDoctor)
            this.setState({
                listDoctor: dataSelect,
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {

            this.setState({
                rangeTime: this.props.allScheduleTime,
            })
        }
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });

    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })

    }

    render() {
        console.log('check state', this.state);
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'><FormattedMessage id='manage-schedule.title' /></div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}

                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                // value={this.state.currentDate}
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className='btn btn-schedule' key={index}>
                                            {language === languages.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )

                                })
                            }


                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'><FormattedMessage id='manage-schedule.save' /></button>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        AllDoctor: state.admin.AllDoctor,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllCodeScheduleTime: () => dispatch(actions.fetchAllCodeScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
