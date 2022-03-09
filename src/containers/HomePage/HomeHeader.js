import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.svg'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import { withRouter } from 'react-router-dom';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {

        let language = this.props.lang;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} onClick={() => this.returnToHome()} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.healt-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i><FormattedMessage id="homeheader.support" /></div>
                            <div className={language === languages.VI ? 'language-vn active' : 'language-vn'}>
                                <span onClick={() => this.changeLanguage(languages.VI)}>VN</span>
                            </div>
                            <div className={language === languages.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(languages.EN)}>EN</span>
                            </div>
                        </div>

                    </div>
                </div>
                {this.props.ishowbanner === true &&
                    <div className='home-header-baner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1" /> </div>
                            <div className='title2'><FormattedMessage id="banner.title2" /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.specialist-examination" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.remote-examination" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-stethoscope"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.general-examination" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-vial"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.medical-testing" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-heartbeat"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.mental-health" /></div>
                                </div>
                                <div className='options-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.dental-examination" /></div>
                                </div>

                            </div>
                        </div>


                    </div>
                }
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
