import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Divider,
  Tag,
  Select,
  message,
} from "antd/lib";
import Layout from "@/components/Layout";
import { getCurrentUser } from "@/services/authServices";
import axios from "axios";

const { Option } = Select;

const TagStatus = ({ loanStatus }) => (
  <Tag
    style={{ minWidth: "77px", textAlign: "center" }}
    color={loanStatus === "approve" ? "green" : "red"}
  >
    {loanStatus === "approve" ? "Aprobado" : "Rechazado"}
  </Tag>
);

const LoanAdmin = () => {
  const [loans, setLoans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);
  const [form] = Form.useForm();

  const fetchLoans = async () => {
    try {
      const user = getCurrentUser();
      const token = user?.access;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoans(response.data);
    } catch (error) {
      message.error("Error al obtener los préstamos");
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleEdit = (record) => {
    setEditingLoan(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const user = getCurrentUser();
      const token = user?.access;
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoans(loans.filter((loan) => loan.id !== id));
      message.success("Préstamo eliminado correctamente");
    } catch (error) {
      message.error("Error al eliminar el préstamo");
    }
  };

  const handleOk = async () => {
    try {
      const user = getCurrentUser();
      const token = user?.access;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/${editingLoan.id}/`,
        editingLoan,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedLoan = response.data;
      setLoans(
        loans.map((loan) => (loan.id === editingLoan.id ? updatedLoan : loan))
      );
      setIsModalOpen(false);
      message.success("Préstamo actualizado correctamente");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = Object.values(error.response.data).flat().join(" ");
        message.error(errorMsg);
      } else {
        message.error("Error al actualizar el préstamo");
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "DNI",
      dataIndex: "dni",
    },
    {
      title: "Nombre Completo",
      dataIndex: "full_name",
    },
    {
      title: "Género",
      dataIndex: "gender",
    },
    {
      title: "Monto",
      dataIndex: "amount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "Estado del Préstamo",
      dataIndex: "loan_status",
      align: "center",
      render: (status) => <TagStatus loanStatus={status} />,
    },
    {
      title: "Acciones",
      key: "actions",
      align: "center",
      render: (record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Editar
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Administración de Préstamos</title>
      </Head>

      <Layout>
        <Divider>
          <p className="txt-subtitle">Préstamos</p>
        </Divider>

        <Table dataSource={loans} columns={columns} rowKey="id" bordered />

        <Modal
          title={<p className="txt-subtitle">Editar Prestamo</p>}
          open={isModalOpen}
          onOk={form.submit}
          onCancel={handleCancel}
        >
          {editingLoan && (
            <Form
              form={form}
              layout="vertical"
              onFinish={(values) => {
                setEditingLoan({ ...editingLoan, ...values });
                handleOk();
              }}
            >
              <Form.Item
                label="DNI"
                name="dni"
                rules={[
                  { required: true, message: "El campo DNI no puede estar vacío" },
                  { pattern: /^\d{1,8}$/, message: "El DNI debe ser un número con un máximo de 8 dígitos" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nombre y Apellido"
                name="full_name"
                rules={[{ required: true, message: "El campo Nombre y Apellido no puede estar vacío" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Género"
                name="gender"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Femenino">Femenino</Option>
                  <Option value="No Binario">No Binario</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "El campo Email no puede estar vacío" },
                  { type: "email", message: "Por favor, introduce una dirección de correo electrónico válida" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Monto"
                name="amount"
                rules={[
                  { required: true, message: "El campo Monto no puede estar vacío" },
                  { pattern: /^\d+(\.\d{1,2})?$/, message: "El monto solicitado no puede tener más de 2 decimales" },
                  {
                    validator: (_, value) => {
                      if (parseFloat(value) > 1000000) {
                        return Promise.reject("El monto solicitado no puede superar un millón");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  onKeyDown={(e) => {
                    if (e.key === "," || e.key === "e" || e.key === "E") {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Estado del Préstamo"
                name="loan_status"
                rules={[{ required: true}]}
              >
                <Select>
                  <Option value="approve">Aprobado</Option>
                  <Option value="rejected">Rechazado</Option>
                </Select>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </Layout>
    </>
  );
};

export default LoanAdmin;
