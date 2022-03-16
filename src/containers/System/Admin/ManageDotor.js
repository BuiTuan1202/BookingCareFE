import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDotor.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { languages, CRUD_Actions } from '../../../utils';
import { getDetailInforDotor } from '../../../services/userService'
const mdParser = new MarkdownIt();

class ManageDotor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: [],

            hasOldData: false,
            // save to doctor info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux()
        this.props.getRequireDoctorInfoRedux()
    }
    buildDataSelectInput = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = ` ${item.lastName} ${item.firstName}`;
                    let labelEn = ` ${item.firstName} ${item.lastName}`;
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = ` ${item.valueVi}`;
                    let labelEn = ` ${item.valueEn} USD`;
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {

                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = ` ${item.valueVi}`;
                    let labelEn = ` ${item.valueEn}`;
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'SPECIALTY') {

                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctor !== this.props.AllDoctor) {
            let dataSelect = this.buildDataSelectInput(this.props.AllDoctor, 'USERS')
            this.setState({
                listDoctor: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataSelectInput(this.props.AllDoctor, 'USERS')
            let { resPrice, resPayment, resProvince } = this.props.allRequireDoctorInfo;
            let dataSelectPrice = this.buildDataSelectInput(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataSelectInput(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataSelectInput(resProvince, 'PROVINCE');
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })

        }
        if (prevProps.allRequireDoctorInfo !== this.props.allRequireDoctorInfo) {
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequireDoctorInfo;
            let dataSelectPrice = this.buildDataSelectInput(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataSelectInput(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataSelectInput(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataSelectInput(resSpecialty, 'SPECIALTY');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
            })


        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })

    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctorRedux({

            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_Actions.EDIT : CRUD_Actions.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.clinicId && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty } = this.state
        console.log('check state handle change select', this.state);
        let res = await getDetailInforDotor(selectedOption.value)
        console.log('check res getDetailInforDotor', res);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', specialtyId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '',
                selectedSpecialty = ''
            if (res.data.DoctorInfo) {
                addressClinic = res.data.DoctorInfo.addressClinic;
                nameClinic = res.data.DoctorInfo.nameClinic;
                note = res.data.DoctorInfo.note;
                paymentId = res.data.DoctorInfo.paymentId;
                provinceId = res.data.DoctorInfo.provinceId;
                priceId = res.data.DoctorInfo.priceId;
                specialtyId = res.data.DoctorInfo.specialtyId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId;

                })



            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,

                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,

                selectedSpecialty: selectedSpecialty


            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
            })
        }
    };
    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })

    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData, } = this.state;

        return (
            <div className='Manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group' >
                        <label> <FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            name='selectedSpecialty'
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-specialty" />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            name='selectedClinic'
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button className={hasOldData === true ? 'save-content-markdown' : 'create-content-markdown'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >{hasOldData === true ?
                    <span><FormattedMessage id='admin.manage-doctor.save' /> </span>
                    :
                    <span><FormattedMessage id='admin.manage-doctor.add' /> </span>
                    }</button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        AllDoctor: state.admin.AllDoctor,
        language: state.app.language,
        allRequireDoctorInfo: state.admin.allRequireDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        getRequireDoctorInfoRedux: () => dispatch(actions.getRequireDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDotor);
