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
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            hasOldData: false,

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux()
    }
    buildDataSelectInput = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = ` ${item.lastName} ${item.firstName}`;
                let labelEn = `  ${item.firstName} ${item.lastName}`;
                object.label = language === languages.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.AllDoctor !== this.props.AllDoctor) {
            let dataSelect = this.buildDataSelectInput(this.props.AllDoctor)
            this.setState({
                listDoctor: dataSelect,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataSelectInput(this.props.AllDoctor)
            this.setState({
                listDoctor: dataSelect,
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
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_Actions.EDIT : CRUD_Actions.CREATE

        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDotor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <div className='Manage-doctor-container'>
                <div className='manage-doctor-title'>Thêm Thông tin Bác Sĩ</div>
                <div className='more-infor'>
                    <div className='content-left form-group' >

                        <label> chọn bác sĩ:</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
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
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button className={hasOldData === true ? 'save-content-markdown' : 'create-content-markdown'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >{hasOldData === true ?
                    <span>Lưu thông tin </span> : <span>Tạo thông tin</span>
                    }</button>
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
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDotor);
