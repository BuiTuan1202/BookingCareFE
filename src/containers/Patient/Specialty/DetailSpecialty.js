import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialty, getAllcodeService } from '../../../services/userService'
import _ from 'lodash';
import { languages } from '../../../utils';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialTy: {},
            listProvince: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
        // 
        // }
    }
    async componentDidMount() {
        if (this.props.match.params && this.props.match && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getAllDetailSpecialty({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllcodeService('PROVINCE')
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data;

                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        type: "PROVINCE",
                        keyMap: "ALL",
                        valueVi: 'Toàn quốc',
                        valueEn: 'All'
                    })
                }
                this.setState({
                    dataDetailSpecialTy: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : [],
                })
            }

        }

    }
    handleOnChangeSelect = async (event) => {

        if (this.props.match.params && this.props.match && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;


            let res = await getAllDetailSpecialty({
                id: id,
                location: location
            })
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialTy: res.data,
                    arrDoctorId: arrDoctorId,

                })
            }
        }
    }
    render() {
        let { arrDoctorId, dataDetailSpecialTy, listProvince } = this.state;
        let { language } = this.props;

        return (
            <div className='specialty-detail-container'>
                <HomeHeader />
                <div className="specialty-detail-body">


                    <div className='description-specialty'>
                        {dataDetailSpecialTy && !_.isEmpty(dataDetailSpecialTy) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialTy.descriptionHTML }}>
                            </div>
                        }
                    </div>
                    <div className="sort-sp-doctor">
                        <select onChange={(event) => this.handleOnChangeSelect(event)} >
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option value={item.keyMap} key={index} >
                                            {language === languages.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })}

                        </select>

                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescriptionDoctor={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}

                                        />
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className="doctor-extra-info">
                                            <DoctorExtraInfo
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
