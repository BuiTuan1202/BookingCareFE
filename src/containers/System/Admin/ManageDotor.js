import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDotor.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { languages } from '../../../utils';
const mdParser = new MarkdownIt();

class ManageDotor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: []

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux()
    }
    buildataSelectInput = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let lableVi = ` ${item.lastName} ${item.firstName}`;
                let labelEn = `  ${item.firstName} ${item.lastName}`;
                object.label = language === languages.VI ? lableVi : labelEn;
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctor !== this.props.AllDoctor) {
            let dataselect = this.buildataSelectInput(this.props.AllDoctor)
            this.setState({
                listDoctor: dataselect,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataselect = this.buildataSelectInput(this.props.AllDoctor)
            this.setState({
                listDoctor: dataselect,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })

    }

    hanleSaveContentMarkdown = () => {
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,

        })
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        console.log("check list doctor", this.state.listDoctor);
        return (
            <div className='Manage-doctor-container'>
                <div className='manage-doctor-title'>Thêm Thông tin Bác Sĩ</div>
                <div className='more-infor'>
                    <div className='content-left form-group' >

                        <label> chọn bác sĩ:</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}

                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows='5'
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>

                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button className='save-content-markdown'
                    onClick={() => this.hanleSaveContentMarkdown()}
                >Lưu thông tin</button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        AllDoctor: state.admin.AllDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchAllDoctorRedux: (id) => dispatch(actions.fetchAllDoctor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDotor);
