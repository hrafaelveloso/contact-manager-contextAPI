import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';

//Como é um componente não funcional, acedemos a variaveis através de  this.props, num componente funcional basta props.
class Contact extends Component {
  state = {
    showContactInfo: false
  };

  //Evita que seja necessário fazer o bind se usar arrow functions
  onArrowClick = e => {
    //Altera o estado passado em argumento, e esta é a solução para dar toggle, coloca no estado que não estava
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  };

  onDeleteClick = (id, dispatch) => {
    dispatch({
      type: 'DELETE_CONTACT',
      payload: id
    });
  };

  render() {
    //Desconstruir o que vem no this.props e tiro as variaveis que vem la
    const { name, email, phone, id } = this.props.contact;
    const showContactInfo = this.state.showContactInfo;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  onClick={this.onArrowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    color: 'red'
                  }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Telemóvel: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
