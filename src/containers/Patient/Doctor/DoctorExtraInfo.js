import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DoctorExtraInfo.scss'
import NumberFormat from 'react-number-format';

import { languages } from '../../../utils';
import { getExtraInfoById } from '../../../services/userService'
class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: []


        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInfoById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }

    }
    async componentDidMount() {
        let res = await getExtraInfoById(this.props.doctorIdFromParent);
        if (res && res.errCode === 0) {
            this.setState({
                extraInfo: res.data
            })
        }

    }

    isShowHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }


    render() {

        let { language } = this.props;
        let { isShowDetailInfo, extraInfo } = this.state;

        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id='patient.extra-info-doctor.text-address' /></div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='address-clinic'>
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>

                    {isShowDetailInfo === false ?
                        <div className='short-info'><FormattedMessage id='patient.extra-info-doctor.price' />
                            {extraInfo && extraInfo.priceData && language === languages.VI &&

                                <NumberFormat
                                    className='currency'
                                    value={extraInfo.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'} />

                            }
                            {extraInfo && extraInfo.priceData && language === languages.EN &&

                                <NumberFormat
                                    className='currency'
                                    value={extraInfo.priceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'} />

                            }


                            <span className='detail' onClick={() => this.isShowHideDetailInfo(true)}>
                                <FormattedMessage id='patient.extra-info-doctor.detail' />
                            </span>
                        </div>
                        :
                        <>
                            <div className='title-price'><FormattedMessage id='patient.extra-info-doctor.price' /></div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id='patient.extra-info-doctor.price' /></span>
                                    <span className='right'>
                                        {extraInfo && extraInfo.priceData && language === languages.VI &&

                                            <NumberFormat
                                                className='currency'
                                                value={extraInfo.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'} />

                                        }
                                        {extraInfo && extraInfo.priceData && language === languages.EN &&

                                            <NumberFormat
                                                className='currency'
                                                value={extraInfo.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'} />

                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id='patient.extra-info-doctor.payment' />
                                {extraInfo && extraInfo.paymentData && language === languages.VI ?
                                    extraInfo.paymentData.valueVi
                                    :
                                    extraInfo.paymentData.valueEn
                                }
                            </div>

                            <div className='hide-price'>
                                <span onClick={() => this.isShowHideDetailInfo(false)}>
                                    <FormattedMessage id='patient.extra-info-doctor.hide-price' />
                                </span>
                            </div>
                        </>


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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
