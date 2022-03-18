import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendBill } from '../../../services/userService';
import moment from 'moment';
import { languages } from '../../../utils';
import BillModal from './BillModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenBillModal: false,
            dataModal: [],
            isShowLoading: false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
        // 
        // }
    }
    async componentDidMount() {

        this.getDataPatient()

    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate

        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {

            await this.getDataPatient()
        })

    }
    handleBtnConfirm = (item) => {

        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenBillModal: true,
            dataModal: data
        })

    }
    closeBillModal = () => {
        this.setState({
            isOpenBillModal: false,
            dataModal: {}
        })
    }
    sendBill = async (dataFromModalBill) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })

        let res = await postSendBill({
            email: dataFromModalBill.email,
            imgBase64: dataFromModalBill.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('send bill success');
            await this.getDataPatient();
            this.closeBillModal();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('send bill error');
        }
    }
    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { dataPatient, isOpenBillModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='Manage-patient-container'>
                        <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
                        <div className="mange-patient-body row">
                            <div className='col-2 form-group'>
                                <label >Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    // value={this.state.currentDate}
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className="col-12">
                                <table className='table-manage-patient'>
                                    <tbody>


                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian Khám</th>
                                            <th>Tên bệnh nhân</th>
                                            <th>Số điện thoại</th>
                                            <th>email</th>
                                            <th>Địa Chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Hành động</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let gender = language === languages.VI
                                                    ? item.patientData.genderData.valueVi
                                                    : item.patientData.genderData.valueEn;
                                                let time = language === languages.VI
                                                    ? item.timeTypeDataPatient.valueVi
                                                    : item.timeTypeDataPatient.valueEn
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.phonenumber}</td>
                                                        <td>{item.patientData.email}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className='btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >Hoàn thành khám
                                                            </button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan={8} style={{ textAlign: "center" }}>No data</td>
                                            </tr>
                                        }

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    <BillModal
                        isOpenBillModal={isOpenBillModal}
                        dataModal={dataModal}
                        closeBillModal={this.closeBillModal}
                        sendBill={this.sendBill}

                    />


                </LoadingOverlay>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        user: state.user.userInfo,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
