import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
class ModalCreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',

        }
        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', ()=>{
           //reset state modal
           this.setState({
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
           })
        })
    }

    componentDidMount() {
       
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnchangeInput = (event, id) =>{
        //bad code
        // this.state[i]= event.target.value
        // this.setState({
        //     ...this.state
        // })
        

        //good code
        let copystate ={...this.state}
        copystate[id]= event.target.value
        this.setState({
                ...copystate
            })
        
    }
    checkvalidateInput= ()=>{
        let isValid =true;
        let arrInput= ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i =0 ;i< arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter '+arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = ()=>{
       let isValid= this.checkvalidateInput();
       if(isValid=== true){
           this.props.createNewUser(this.state);

       }
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>

                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' 
                            onChange={(event)=>{this.handleOnchangeInput(event, 'email')}}
                            value= {this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>password</label>
                            <input type='password' onChange={(event)=>{this.handleOnchangeInput(event, 'password')}}
                             value= {this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text' onChange={(event)=>{this.handleOnchangeInput(event, 'firstName')}}
                             value= {this.state.firstName}
                             />
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text' onChange={(event)=>{this.handleOnchangeInput(event, 'lastName')}}
                             value= {this.state.lastName}
                             
                             />
                        </div>
                        <div className='input-container max-w-input'>
                            <label>Address</label>
                            <input type='text' onChange={(event)=>{this.handleOnchangeInput(event, 'address')}}
                             value= {this.state.address}
                            />
                        </div>
                    </div>



                </ModalBody>
                <ModalFooter>
                    <Button 
                    color="primary" 
                    className='px-3' 
                    onClick={() => { this.handleAddNewUser() }}>Add</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);





