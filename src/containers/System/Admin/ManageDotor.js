import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDotor.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
const mdParser = new MarkdownIt();

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];




class ManageDotor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contenHTML: '',
            selectedDoctor:'',
            description:''

        }
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange =({ html, text })=> {
        this.setState({
            contentMarkdown:text,
            contenHTML:html,
        })
        
    }

    hanleSaveContentMarkdown = () => {
        console.log('check state', this.state);
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
          console.log(`Option selected:`, this.state.selectedDoctor)
        );
      };

      handleOnChangeDescription =(event)=>{
          this.setState({
              description: event.target.value
          })
      }

    render() {

        return (
            <div className='Manage-doctor-container'>
                <div className='manage-doctor-title'>Thêm Thông tin Bác Sĩ</div>
                <div className='more-infor'>
                    <div className='content-left form-group' >

                        <label> chọn bác sĩ:</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                            
                        />
                    </div>
                    <div className='content-right'>
                    <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows='5'
                        onChange={(event)=> this.handleOnChangeDescription(event)}
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
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDotor);
