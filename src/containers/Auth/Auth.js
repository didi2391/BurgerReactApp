import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Inputs/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        isSignup : true
    }

    checkValidity = (value, rules) => {
        let isValid = false;
    
        if (!rules) return true;
    
        if (rules.required) {
          isValid = value.trim() !== "";
        }
    
        return isValid;
      };

      inputChangedhandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value , this.state.controls[controlName].validation),
                touched : true
            }
        }

        this.setState({controls : updatedControls});
      };

      switchAuthModeHandler = () => {
          this.setState(prevState => {
              return {isSignup : !prevState.isSignup}
          })
      }

      submitHandler = event => {
          event.preventDefault();
          this.props.onAuth(this.state.controls.email.value , this.state.controls.password.value , this.state.isSignup);
      }

    render() {
        const formElementsArray = [];

        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={event => this.inputChangedhandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
            />            
        ));

        return (
            <div className={classes.Auth} onSubmit={this.submitHandler}>
                <form>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth : (email , password , isSignup) => (dispatch(actions.auth(email,password,isSignup)))
    }
}

export default connect(null ,mapDispatchToProps) (Auth);