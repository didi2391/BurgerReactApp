import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Inputs/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation : {
          required : true
        },
        valid : false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation : {
          required : true
        },
        valid : false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation : {
          required : true
        },
        valid : false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation : {
          required : true
        },
        valid : false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email',
        },
        value: '',
        validation : {
          required : true
        },
        valid : false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
    },
    loading: false
  };

  checkValidity = (value , rules) => {
    let isValid = false;

    if(rules.required) {
      isValid = value.trim() !=='';
    }

    return isValid;
  }

  inputChangedhandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}; 
    updatedFormElement.value= event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm : updatedOrderForm});
  }

  orderHandler = event => {
    event.preventDefault();

    const formData = {};

    for (const formatElementIdentifier in this.state.orderForm) {
      formData[formatElementIdentifier] =this.state.orderForm[formatElementIdentifier].value;
    }

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData : formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {
          formElementsArray.map(formElement => {
            return <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value} 
              changed={(event) => this.inputChangedhandler(event , formElement.id)}
              />;
          })
        }
        <Button btnType="Success">
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
