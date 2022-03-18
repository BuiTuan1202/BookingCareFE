import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './BillModal.scss'
import _ from 'lodash';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';

class BillModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }


    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })

    }
    handleONchangeImage = async (event) => {

        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })

        }
    }
    handleSendBill = () => {
        this.props.sendBill(this.state); //send data for managePatient
    }
    render() {
        let { isOpenBillModal, closeBillModal, dataModal, sendBill } = this.props;


        return (

            <Modal
                isOpen={isOpenBillModal}
                toggle={this.toggle}
                className={'booking-model-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={this.toggle}>Gửi Hóa đơn/ đơn thuốc khám bệnh</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className="col-6 form-group">
                            <label> Email bệnh nhân</label>
                            <input className="form-control" type="text" value={this.state.email}
                                onChange={(event) => this.handleOnchangeEmail(event)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label> chọn hình hóa đơn/ đơn thuốc</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) => this.handleONchangeImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendBill()}>Gửi</Button>{' '}
                    <Button color="secondary" onClick={closeBillModal}>Thoát</Button>
                </ModalFooter>
            </Modal>


        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillModal);
