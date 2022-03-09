import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { languages } from '../../../utils'
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInforDotor } from '../../../services/userService'
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: [],





        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
        //     let topDoctorRedux = this.props.topDoctorRedux;
        //     this.setState({
        //         arrDoctor: topDoctorRedux,
        //     })
        // }
    }
    async componentDidMount() {
        if (this.props.match.params && this.props.match && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailInforDotor(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }

        }

    }

    render() {

        let { detailDoctor } = this.state
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        const { systemMenuPath, isLoggedIn, language } = this.props;
        return (
            <Fragment>
                <HomeHeader ishowbanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor.image})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === languages.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>

                    </div>
                    <div className='schedule-doctor'></div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>


                            </div>}
                    </div>
                    <div className='comment-doctor'></div>

                </div>
            </Fragment>


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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
