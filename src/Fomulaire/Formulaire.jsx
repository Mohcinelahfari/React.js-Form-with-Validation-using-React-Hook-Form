import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

const schema = yup.object({
  name : yup.string().required(),
  password : yup.string().required(),
  age : yup.number().required()

})
const Formulaire = () => {
  const { register, handleSubmit, control, setValue, formState } = useForm({
    resolver : yupResolver(schema),
    mode : 'onTouched'
  });
  const [userData, setUserData] = useState(null);
  const   { errors, disabled, isValid, submitCount} = formState
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const user = await response.json();
      setUserData(user);
    };
    fetchData();
  }, []);

  // Set form values once data is fetched
  useEffect(() => {
    if (userData) {
      setValue('name', userData.name);
      setValue('email', userData.email);
      setValue('country', 'canada'); // default value, adjust if necessary
    }
  }, [userData, setValue]);

  const handleSubmitForm = (data) => {
    console.log(data); // Data will be logged once the form is submitted
  };

  return (
    <div className="container mt-5">
      <DevTool control={control} />
      {submitCount && submitCount > 5 ? (<div className='alert alert-danger'>
        <strong>your block</strong>
      </div>) : (
        <>
        <h2 className="text-center mb-4">Create user</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {/* Champ Nom */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Entrez votre nom"
            {...register('name')}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        {/* Champ Âge */}
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Âge</label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="Entrez votre âge"
            {...register('age')}
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>

        {/* Champ Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Entrez votre email"
            {...register('email', {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" }
            })}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="passowrd" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Entrez votre nom"
            {...register('password')}
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>

        {/* Sélection Pays */}
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Pays</label>
          <select className="form-select" id="country" {...register('country')}>
            <option value="france">France</option>
            <option value="usa">États-Unis</option>
            <option value="canada">Canada</option>
            <option value="other">Autre</option>
          </select>
        </div>

        {/* Bouton Soumettre */}
        <button type="submit" disabled={!isValid} className="btn btn-primary">
          Soumettre
        </button>
      </form>
        </>
      )}
      
    </div>
  );
};

export default Formulaire;
