import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = (props) => {
    const {onSuccess,formData,isEditing} = props;

    const [user, setUser] = useState({
        ...formData
    });
    
    useEffect(()=>{
        setUser({...formData})
    },[formData]);
    
    const { name, surname, email, phone } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        console.log(user);
       if(isEditing){
           const {id, ...userData} = user;
            // user:{id,name,phone}
            // userData:{name,phone}
            await axios.put(`http://localhost:3003/users/${id}`, userData);
       }
       else {
        await axios.post("http://localhost:3003/users", user);
       }
        onSuccess();
    };


    return (
        <div className="container py-4">
            <div className="py-4 mt-4">
                <form class="row g-3 border shadow py-4 needs-validation" onSubmit={e => onSubmit(e)}>
                    <div class="col-md-6">
                        <label for="validationCustom01" class="form-label">Name</label>
                        <input type="text" class="form-control" id="validationCustom01" maxLength="30" required
                            name="name"
                            value={name}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div class="col-md-6">
                        <label for="validationCustom02" class="form-label">Surname</label>
                        <input type="text" class="form-control" id="validationCustom02" value={surname} maxLength="30" required
                            name="surname"
                            onChange={e => onInputChange(e)} />
                    </div>
                    <div class="col-md-6">
                        <label for="validationCustom03" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="validationCustom03" value={email} required
                            name="email"
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div class="col-md-6">
                        <label for="validationCustom05" class="form-label">Phone number</label>
                        <small> (format: 05..)</small>
                        <input class="form-control" type="tel" id="phone" name="phone" value={phone} maxLength="11"
                            pattern="[0]{1}[5]{1}[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}"
                            required
                            name="phone"
                            onChange={e => onInputChange(e)}>
                        </input>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary " type="submit">Save</button>
                    </div>
                </form>
            </div>

        </div>
    )



}

export default Form;
