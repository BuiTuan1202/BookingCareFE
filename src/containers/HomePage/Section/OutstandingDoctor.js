import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import { languages } from '../../../utils'
import { withRouter } from 'react-router-dom';

class OutstandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: []


        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            let topDoctorRedux = this.props.topDoctorRedux;
            this.setState({
                arrDoctor: topDoctorRedux,
            })
        }
    }
    componentDidMount() {
        this.props.loadingTopDoctor()
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctor;
        let { language } = this.props;
        return (
            <div className='section-outstanding-doctor section-share'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tilte-section'><FormattedMessage id="homepage.outstanding-doctor" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer.from(item.image, 'base64').toString('binary')

                                        // setImage(imageBase64)
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`
                                    return (
                                        <div className='section-slide-item' key={index}
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                        >
                                            <div className='customize-boder'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }} />
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === languages.VI ? nameVi : nameEn}</div>
                                                    <div> sức khỏe tinh thần </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}






                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadingTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
