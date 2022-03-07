import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
class MedicalFacility extends Component {

    render() {
        

        return (
            <div className='section-medical-facility section-share'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tilte-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'> xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-slide-item'>
                                <div className='bg-image section-medical-facility' />
                                <div >bệnh viện Chợ Rẫy1</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-medical-facility' />
                                <div>bệnh viện Chợ Rẫy2</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-medical-facility' />
                                <div>bệnh viện Chợ Rẫy3</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-medical-facility' />
                                <div>bệnh viện Chợ Rẫy4</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-medical-facility' />
                                <div>bệnh viện Chợ Rẫy5</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-medical-facility' />
                                <div>bệnh viện Chợ Rẫy6</div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
