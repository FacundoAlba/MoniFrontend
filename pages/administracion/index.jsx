import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Table, Button, Modal, Form, Input, Divider, Tag, Select } from 'antd/lib';
import Layout from '@/components/Layout';
import { getCurrentUser } from '@/services/authServices';
import axios from 'axios';

const TagStatus = ({ loanStatus }) => (
  <Tag style={{ minWidth: '77px', textAlign: 'center' }} color={loanStatus === 'approve' ? 'green' : 'red'}>
    {loanStatus === 'approve' ? 'Aprobado' : 'Rechazado'}
  </Tag>
);

const LoanAdmin = () => {
  const [loans, setLoans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);

  const fetchLoans = async () => {
    try {
      const user = getCurrentUser();
      const token = user?.access;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleEdit = (record) => {
    setEditingLoan(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const user = getCurrentUser();
      const token = user?.access;
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setLoans(loans.filter(loan => loan.id !== id));
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  const handleOk = async () => {
    try {
      const user = getCurrentUser();
      const token = user?.access;
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loans/${editingLoan.id}/`, editingLoan, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const updatedLoan = response.data;
      setLoans(loans.map(loan => (loan.id === editingLoan.id ? updatedLoan : loan)));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating loan:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      sorter: true,
    },
    {
      title: 'Nombre Completo',
      dataIndex: 'full_name',
      sorter: true,
    },
    {
      title: 'Genero',
      dataIndex: 'gender',
      sorter: true,
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      sorter: true,
      render: amount => `$${amount}`,
    },
    {
      title: 'Estado del Préstamo',
      dataIndex: 'loan_status',
      sorter: true,
      align: "center",
      render: status => (
        <TagStatus loanStatus={status} />
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      align: "center",
      render: (record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Editar</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Eliminar</Button>
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
        <Divider> <p className="txt-subtitle">Préstamos</p> </Divider>

        <Table dataSource={loans} columns={columns} rowKey="id" bordered/>

        <Modal title={<p className='txt-subtitle'>Editar Prestamo</p>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {editingLoan && (
            <Form layout="vertical">
              <Form.Item label="DNI">
                <Input value={editingLoan.dni} onChange={(e) => setEditingLoan({ ...editingLoan, dni: e.target.value })} />
              </Form.Item>
              <Form.Item label="Nombre Completo">
                <Input value={editingLoan.full_name} onChange={(e) => setEditingLoan({ ...editingLoan, full_name: e.target.value })} />
              </Form.Item>
              <Form.Item label="Género">
                <Select
                  value={editingLoan.gender}
                  onChange={(value) => setEditingLoan({ ...editingLoan, gender: value })}
                >
                  <Select.Option value="Masculino">Masculino</Select.Option>
                  <Select.Option value="Femenino">Femenino</Select.Option>
                  <Select.Option value="No Binario">No Binario</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Email">
                <Input value={editingLoan.email} onChange={(e) => setEditingLoan({ ...editingLoan, email: e.target.value })} />
              </Form.Item>
              <Form.Item label="Monto">
                <Input value={editingLoan.amount} onChange={(e) => setEditingLoan({ ...editingLoan, amount: e.target.value })} />
              </Form.Item>
              <Form.Item label="Estado del Préstamo">
                <Select
                  value={editingLoan.loan_status}
                  onChange={(value) => setEditingLoan({ ...editingLoan, loan_status: value })}
                >
                  <Select.Option value="approve">Aprobado</Select.Option>
                  <Select.Option value="rejected">Rechazado</Select.Option>
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