import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './tableManageUser.scss';
import * as actions from '../../../store/actions'




class tableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)

    }

    handleEditUser = (user) => {
        this.props.handlEditUserFromParentkey(user)
    }


    render() {
        let arrUser = this.state.userRedux
        return (
            <React.Fragment>
                <table id='tableManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {arrUser && arrUser.length > 0 &&
                            arrUser.map((item, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}
                                            ><i className="fas fa-trash"></i></button>

                                        </td>
                                    </tr>

                                )
                            })
                        }





                    </tbody>
                </table>

            </React.Fragment>

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

export default connect(mapStateToProps, mapDispatchToProps)(tableManageUser);
