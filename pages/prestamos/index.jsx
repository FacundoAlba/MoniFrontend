"use client";
import Head from 'next/head';
import { useState } from 'react';
import * as Yup from 'yup';
import LoanForm from '@/components/Form';
import Layout from '@/components/Layout';
import NotificationModal from '@/components/NotificationModal';
import { message } from 'antd/lib';

export const Loan = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loanStatus, setLoanStatus] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const initialValues = {
    dni: '',
    full_name: '',
    gender: '',
    email: '',
    amount: '',
  };

  const validationSchema = Yup.object({
    dni: Yup.string()
      .required('* DNI es requerido')
      .matches(/^\d+$/, '* El campo DNI solo debe contener números'),
    full_name: Yup.string()
      .required('* Complete este campo')
      .matches(/^[a-zA-Z\s]+$/, '* Ingrese solo letras'),
    gender: Yup.string().required('* Seleccione el Género'),
    email: Yup.string()
      .email('* Email inválido')
      .required('* Email es requerido'),
    amount: Yup.number()
      .required('* Monto es requerido')
      .typeError('* Debe ingresar un número')
      .test(
        'is-decimal',
        '* Monto debe ser un número válido',
        value => !isNaN(value) && !/e/.test(value.toString().toLowerCase())
      ),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dni: values.dni,
          full_name: values.full_name,
          gender: values.gender,
          email: values.email,
          amount: values.amount,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setLoanStatus(responseData.loan_status);
        setName(responseData.full_name);
        setAmount(responseData.amount);
        setModalIsOpen(true);
        resetForm();
      } else {
        const errorData = await response.json();
        for (const [field, errors] of Object.entries(errorData)) {
          if (errors && errors.length > 0) {
            message.error(`${errors[0]}`);
          }
        }
      }
    } catch (error) {
      message.error('Error al enviar el formulario: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>Préstamos</title>
      </Head>
      <Layout>
        <LoanForm 
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        />
        <NotificationModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          status={loanStatus}
          userName={name}
          amount={amount}
        />
      </Layout>
    </>
  );
};

export default Loan;