import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik"
import { Message } from 'primereact/message';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import Card from "./Card";
import useUserApi from '../lib/hooks/useUserApi'


function Auth() {
  const { login, register, loading, error, resetError } = useUserApi()
  const [isLoginForm, setIsLoginForm] = useState(true)

  const changeLogin = () => {
    error && resetError()
    setIsLoginForm(prev => !prev)
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
    },
    onSubmit: async (data, formikBag) => {
      isLoginForm ? login({ email: data.email, password: data.password }) : register({ ...data })

    }

  });
  const isFormFieldInvalid = (name: keyof typeof formik.touched | keyof typeof formik.errors) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: keyof typeof formik.touched | keyof typeof formik.errors) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">
      &nbsp;
    </small>;
  };
  return (
    <div className="flex justify-content-center">
      <Card minWidth="400px" padding="30px">
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-3 justify-content-center w-full">
          {!isLoginForm && <>
            <span className="p-float-label ">
              <InputText
                id="firstName"
                className={classNames({ 'p-invalid': isFormFieldInvalid('firstName') }, 'w-full')}
                name="firstName"
                value={formik.values.firstName}
                onChange={(e) => {
                  formik.setFieldValue('firstName', e.target.value);
                }}

              />
              <label htmlFor="firstName">Имя</label>
            </span>
            {getFormErrorMessage('firstName')}
            <span className="p-float-label ">
              <InputText
                id="secondName"
                name="secondName"
                value={formik.values.secondName}
                onChange={(e) => {
                  formik.setFieldValue('secondName', e.target.value);
                }}

                className={classNames({ 'p-invalid': isFormFieldInvalid('firstName') }, 'w-full')}
              />
              <label htmlFor="secondName">Фамилия</label>
            </span>
            {getFormErrorMessage('secondName')}
          </>}

          <span className="p-float-label ">
            <InputText
              id="email"
              name="email"
              value={formik.values.email}
              onChange={(e) => {
                formik.setFieldValue('email', e.target.value);
              }}
              className={classNames({ 'p-invalid': isFormFieldInvalid('firstName') }, 'w-full')}
            />
            <label htmlFor="input_name">e-mail</label>
          </span>
          {getFormErrorMessage('email')}
          <span className="p-float-label w-full">
            <Password
              id="password"
              name="password"
              value={formik.values.password}
              toggleMask
              inputStyle={{ width: '100%' }}
              weakLabel="Простой"
              mediumLabel="Средний"
              strongLabel="Сложный"
              onChange={(e) => {
                formik.setFieldValue('password', e.target.value);
              }}
              className={classNames({ 'p-invalid': isFormFieldInvalid('firstName') }, 'w-full')}
            />
            <label htmlFor="input_password">Пароль</label>
          </span>
          {getFormErrorMessage('password')}
          {(error && formik.touched) && <Message severity="error" text={error} />}

          <Button type="submit" label="Отправить" loading={loading} />
          {isLoginForm ? <p>Нет учетной записи? <a onClick={changeLogin} className="cursor-pointer">Зарегестрироваться</a></p> : <p>Уже есть учетная запись? <a className="cursor-pointer" onClick={changeLogin}>Войти</a></p>}



        </form>
      </Card>
    </div>


  )
}

export default Auth