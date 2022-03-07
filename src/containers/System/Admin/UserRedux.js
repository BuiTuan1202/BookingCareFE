import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllcodeService } from '../../../services/userService'
import { languages, CRUD_Actions, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './tableManageUser';
import { data } from 'jquery';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            action: '',
            userEditId: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',


        }
    }

    async componentDidMount() {
        //get gender using redux
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        //get render using api
        // try {
        //     let res = await getAllcodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenderRedux = this.props.genderRedux;
            this.setState({
                genderArr: arrGenderRedux,
                gender: arrGenderRedux && arrGenderRedux.length > 0 ? arrGenderRedux[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoleRedux = this.props.roleRedux;
            this.setState({
                roleArr: arrRoleRedux,
                role: arrRoleRedux && arrRoleRedux.length > 0 ? arrRoleRedux[0].keyMap : ''

            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositionRedux = this.props.positionRedux;
            this.setState({
                positionArr: arrPositionRedux,
                position: arrPositionRedux && arrPositionRedux.length > 0 ? arrPositionRedux[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {

            let arrGenderRedux = this.props.genderRedux;
            let arrRoleRedux = this.props.roleRedux;
            let arrPositionRedux = this.props.positionRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: arrGenderRedux && arrGenderRedux.length > 0 ? arrGenderRedux[0].keyMap : '',
                role: arrRoleRedux && arrRoleRedux.length > 0 ? arrRoleRedux[0].keyMap : '',
                position: arrPositionRedux && arrPositionRedux.length > 0 ? arrPositionRedux[0].keyMap : '',
                avatar: '',
                action: CRUD_Actions.CREATE,
                previewImgUrl:'',
            })
        }
    }
    handleONchangeImage = async (event) => {

        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('check file base64', base64);
            let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: ObjectUrl,
                avatar: base64
            })

        }
    }

    openpreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    checkValidateInput = () => {
        let isvalid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'address', 'phoneNumber']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isvalid = false;
                alert('this input is required: ' + arrCheck[i])
                break;
            }
        }
        return isvalid;
    }
    handleSaveUser = () => {
        let isvalid = this.checkValidateInput();

        if (isvalid === false) return;
        let { action } = this.state;
        if (action === CRUD_Actions.CREATE) {
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })

        }
        if (action === CRUD_Actions.EDIT) {
            // fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            });

        }


    }
    onchangInput = (event, id) => {
        let copysate = { ...this.state }
        copysate[id] = event.target.value
        this.setState({
            ...copysate
        })

    }

    handlEditUserFromParent = (user) => {
        let imageBase64=''
        if(user.image){
            imageBase64 = new Buffer(user.image,'base64').toString('binary')
            
            // setImage(imageBase64)
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgUrl: imageBase64,
            action: CRUD_Actions.EDIT,
            userEditId: user.id
        })
    }
    render() {

        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr
        let language = this.props.lang;
        let isloadingGender = this.props.isLoadingGender;
        let { email, password, firstName, lastName,
            address, phoneNumber, gender, position,
            role, avatar
        } = this.state;
        return (
            <div className="user-redux-container" >
                <div className='title '>
                    <FormattedMessage id='manage-user.title' />
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>{isloadingGender === true ? "Loading Gender" : ""}</div>
                            <div className='col-12 my-3'>
                                {this.state.action === CRUD_Actions.EDIT ?
                                    <FormattedMessage id='manage-user.title-edit' />
                                    :
                                    <FormattedMessage id='manage-user.title-add' />}
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onchangInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_Actions.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onchangInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_Actions.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onchangInput(event, 'firstName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onchangInput(event, 'lastName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onchangInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onchangInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender'
                                /></label>
                                <select className="form-control"
                                    value={gender}
                                    onChange={(event) => { this.onchangInput(event, 'gender') }}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{
                                                    language === languages.VI ? item.valueVi : item.valueEn
                                                }
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role' /></label>
                                <select className="form-control"
                                    value={role}
                                    onChange={(event) => { this.onchangInput(event, 'role') }}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{
                                                    language === languages.VI ? item.valueVi : item.valueEn
                                                }
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /> </label>
                                <select className="form-control"
                                    value={position}
                                    onChange={(event) => { this.onchangInput(event, 'position') }}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{
                                                    language === languages.VI ? item.valueVi : item.valueEn
                                                }
                                                </option>
                                            )

                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleONchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'><i class="fas fa-upload">Tải ảnh</i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openpreviewImage()}>
                                    </div>

                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_Actions.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_Actions.EDIT ?
                                        <FormattedMessage id='manage-user.edit' />
                                        :
                                        <FormattedMessage id='manage-user.save' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handlEditUserFromParentkey={this.handlEditUserFromParent}
                                    action={this.state.action} />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />}


            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isloadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
