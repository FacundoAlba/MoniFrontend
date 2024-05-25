import { Formik, Form, Field, ErrorMessage } from 'formik';
import ClipLoader from 'react-spinners/ClipLoader';

const LoanForm = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
  {({ isSubmitting }) => (
    <Form className="custom-form">
      <h1 className="title-text">
        Solicitá tu préstamo
      </h1>

      <div className="form-group">
        <label htmlFor="dni">DNI</label>
        <Field name="dni" type="text" className="text-input" />
        <ErrorMessage name="dni" component="div" className="error" />
      </div>

      <div className="form-group">
        <label htmlFor="full_name">Nombre y Apellido</label>
        <Field name="full_name" type="text" className="text-input" />
        <ErrorMessage name="full_name" component="div" className="error" />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Género</label>
        <Field name="gender" as="select" className="text-input">
          <option value="">Seleccione un género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="No Binario">No Binario</option>
        </Field>
        <ErrorMessage name="gender" component="div" className="error" />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Field name="email" type="email" className="text-input" />
        <ErrorMessage name="email" component="div" className="error" />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Monto Solicitado</label>
        <Field name="amount" type="number" className="text-input" />
        <ErrorMessage name="amount" component="div" className="error" />
      </div>

      <button type="submit" className="btn btn-accent w100" disabled={isSubmitting}>
        Quiero un préstamo
      </button>

      {isSubmitting && (
        <div className="loader-container">  
          <ClipLoader loading={true} size={32} color="#5493e7" />
        </div>
      )}
    </Form>
  )}
</Formik>

  );
};

export default LoanForm;