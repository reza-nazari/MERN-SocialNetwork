import React, { useState } from 'react'
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { input_helper as profile_inputs_helper } from '../../helpers/inputs_helper';
import { input_helper as social_inputs_helper } from '../../helpers/inputs_helper';

export const CreateProfile = (props) => {
    const [displaySocialInputs, toggleSocialInput] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [profileForm, setProfileForm] = useState({
        status: {
            elementType: 'select',
            elementConfig: {
                type: 'text',
                placeholder: '',
                options: [
                    { value: '0', displayValue: '* Select Professional Status' },
                    { value: 'Developer', displayValue: 'Developer' },
                    { value: 'Junior Developer', displayValue: 'Junior Developer' },
                    { value: 'Senior Developer', displayValue: 'Senior Developer' },
                    { value: 'Manager', displayValue: 'Manager' },
                    { value: 'Student or Learning', displayValue: 'Student or Learning' },
                    { value: 'Instructor or Teacher', displayValue: 'Instructor or Teacher' },
                    { value: 'Intern', displayValue: 'Intern' },
                    { value: 'Other', displayValue: 'Other' }
                ]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            text: 'Give us an idea of where you are at in your career'
        },
        company: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Company Name',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: 'Could be your own company or one you work for'
        },
        website: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Website',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: 'Could be your own or a company website'
        },
        location: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Location',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: 'City & state suggested (eg. Boston, MA)'
        },
        skills: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: '* Skills',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            text: 'Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'
        },
        github: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Github Username',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: 'If you want your latest repos and a Github link, include your username'
        },
        bio: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: 'Bio',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: 'Tell us a little about yourself'
        },

    });

    const [socialForm, setSocialForm] = useState({
        twitter: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Twitter URL',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: ''
        },
        facebook: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Facebook URL',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: ''
        },
        youTube: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'YouTube URL',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: ''
        },
        linkedIn: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'LinkedIn URL',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: ''
        },
        instagram: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Instagram URL',
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            text: ''
        },
    })    

    const formElementArray = [];
    const socialFormElementArray = [];

    for (let key in profileForm) {
        formElementArray.push({
            id: key,
            config: profileForm[key],
        });
    };

    for (let key in socialForm) {
        socialFormElementArray.push({
            id: key,
            config: socialForm[key],
        });
    };

    let form = (
        <form action=''>
            {formElementArray.map((formElement) => {
                return (
                    (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation.required}
                            touched={formElement.config.touched}
                            changed={(event) =>                              
                                setFormIsValid(profile_inputs_helper.changedHandler(event, formElement.id, profileForm, setProfileForm))
                            }
                            text={formElement.config.text}
                        />
                    )
                )
            })}

            <div className="my-2">
                <Button type="Success" clicked={ (e) =>  displaySocialInputsHandler(e)}>
                    Add Social Network Links
                </Button>
                <span>Optional</span>
            </div>

            { displaySocialInputs && socialFormElementArray.map((formElement) => {
                return (
                    (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation.required}
                            touched={formElement.config.touched}
                            changed={(event) =>
                                setFormIsValid(social_inputs_helper.changedHandler(event, formElement.id, socialForm, setSocialForm))
                            }
                            text={formElement.config.text}
                        />
                    )
                )
            })}
            <Button
                type='Success'
                disabled={!formIsValid}
                clicked={submitFormHandler}
            >
                Submit
            </Button>
        </form>
    );


    function displaySocialInputsHandler(e){
        e.preventDefault();
        toggleSocialInput(!displaySocialInputs)
    }

    function submitFormHandler(e){
        e.preventDefault();

        let form_model = {
            company: profileForm['company'].value,
            status: profileForm['status'].value,
            website: profileForm['website'].value,
            location: profileForm['location'].value,
            skills: profileForm['skills'].value,
            github: profileForm['github'].value,
            bio: profileForm['bio'].value,
        
            twitter: socialForm['twitter'].value,
            facebook: socialForm['facebook'].value,
            youTube: socialForm['youTube'].value,
            linkedIn: socialForm['linkedIn'].value,
            instagram: socialForm['instagram'].value,
        };

        console.log(form_model)
        
    }

    return (
        <div className="container">
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            {form}
            {/* <section class="container">
            
           
                <input type="submit" class="btn btn-primary my-1" />
                <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </section> */}
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile)
