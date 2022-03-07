import React, { Component } from 'react';
import { connect } from 'react-redux';
import suckhoedoisong from '../../../assets/images/socialmedia/suckhoedoisong.png'
class About extends Component {


    render() {

        return (
            <div className='section-about section-share'>
                <div className='section-about-header'>
                    Truyền thông nói gì về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="570" height="322"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                                    <a
                                        target="_blank"
                                        href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html">
                                    <div className='content-img suckhoedoisong'></div>
                                    </a>
                           
                                    <a
                                        target="_blank"
                                        href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm">
                                             <div className='content-img vtv1'></div>
                                    </a>
                            
                           
                                    <a
                                        target="_blank"
                                        href="https://ictnews.vn/kinh-doanh/doanh-nghiep/startup-bookingcare-chinh-thuc-ra-mat-phien-ban-di-dong-cua-nen-tang-ho-tro-dat-lich-kham-online-173512.ict">
                                             <div className='content-img ictnews'></div>
                                    </a>
                           
                                    <a
                                        target="_blank"
                                        href="https://video.vnexpress.net/tin-tuc/so-hoa/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html">
                                             <div className='content-img vnexpress'></div>
                                    </a>
                            
                           
                                    <a
                                        target="_blank"
                                        href="https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html">
                                             <div className='content-img vtcnews'></div>
                                    </a>
                           
                           
                                    <a
                                        target="_blank"
                                        href="https://ehealth.gov.vn/?action=News&newsId=46094">
                                             <div className='content-img boyte'></div>
                                    </a>
                           
                           
                                    <a
                                        target="_blank"
                                        href="https://infonet.vietnamnet.vn/khoe-dep/da-co-hon-20-000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html">
                                             <div className='content-img infonet'></div>
                                    </a>
                           

                           
                                    <a
                                        target="_blank"
                                        href="https://vtv.vn/video/ca-phe-khoi-nghiep-16-8-2018-317687.htm">
                                             <div className='content-img vtv1'></div>
                                    </a>
                          
                           
                                    <a
                                        target="_blank"
                                        href="https://www.youtube.com/watch?v=mstAc81lpMc">
                                             <div className='content-img vtc'></div>
                                    </a>
                           
                           
                                    <a
                                        target="_blank"
                                        href="https://vtv.vn/video/ca-phe-khoi-nghiep-16-8-2018-317687.htm">
                                             <div className='content-img vtv1'></div>
                                    </a>
                            
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
