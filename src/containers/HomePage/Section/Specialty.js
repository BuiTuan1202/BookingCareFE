import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './Specialty.scss'
import { withRouter } from 'react-router-dom';
import { getAllSpecialty } from '../../../services/userService'
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []


        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }

    }
    handleViewDetailSpecialty = (Specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${Specialty.id}`)
        }
    }
    render() {
        let { dataSpecialty } = this.state;
        console.log(' check data specialty', dataSpecialty);
        return (
            <div className='section-specialty section-share'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tilte-section'><FormattedMessage id="homepage.specialty-popular" /></span>
                        <button className='btn-section'> <FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (

                                        <div
                                            className='section-slide-item specialty-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >

                                            <div className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='specialty-name' >{item.name}</div>
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
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
