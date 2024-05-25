"use client"
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ClipLoader from 'react-spinners/ClipLoader';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import { login } from '../../services/authServices';
import { message } from 'antd/lib';

const Login = () => {
  const router = useRouter();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Ingrese su nombre de usuario'),
    password: Yup.string().required('Ingrese su contraseña'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await login(values.username, values.password);
      router.push('/administracion');
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Usuario o contraseña incorrectos';
      message.error(errorMsg);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Iniciar Sesión</title>
      </Head>

      <Layout>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="custom-form">
              <h1 className="title-text">Iniciar Sesión</h1>

              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <Field name="username" type="text" className="text-input" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Field name="password" type="password" className="text-input" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
                Iniciar Sesión
              </button>

              {isSubmitting && (
                <div className="loader-container">
                  <ClipLoader loading={true} size={32} color="#5493e7" />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </Layout>
    </>
  );
};

export default Login;
