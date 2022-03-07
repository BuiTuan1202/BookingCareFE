import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class HandBook extends Component {


    render() {

        return (
            <div className='section-handbook section-share'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tilte-section'>Cẩm nang</span>
                        <button className='btn-section'> xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-slide-item'>
                                <div className='bg-image section-handbook' />
                                <div >Cơ cương khớp1</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ cương khớp2</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ cương khớp3</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ cương khớp4</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ cương khớp5</div>
                            </div>
                            <div className='section-slide-item'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ cương khớp6</div>
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
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
