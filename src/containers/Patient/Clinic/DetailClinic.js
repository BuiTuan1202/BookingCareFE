import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinic, getAllcodeService } from '../../../services/userService'
import _ from 'lodash';
import { languages } from '../../../utils';
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},

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
            let res = await getAllDetailClinic({
                id: id,
            })

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }

        }

    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        console.log(' check dataDetailClinic', dataDetailClinic);
        let { language } = this.props;

        return (
            <div className='clinic-detail-container'>
                <HomeHeader />
                <div className="clinic-detail-body">
                    <div className="clinic-intro">
                        <div className='bg-clinic' style={{ backgroundImage: `url(${dataDetailClinic.image})` }}></div>
                        <div className="clinic-intro-content" >
                            <div className='clinic-content-left' >
                                <div className='avt-clinic' style={{ backgroundImage: `url(${dataDetailClinic.image})` }}></div>
                            </div>
                            <div className='clinic-content-right'>
                                <div className="name-clinic">{dataDetailClinic.name}</div>
                                <div className="address-clinic">
                                    <i className="fas fa-map-marker-alt icon"></i>
                                    <span>{dataDetailClinic.address}</span>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='description-clinic'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                            </div>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
