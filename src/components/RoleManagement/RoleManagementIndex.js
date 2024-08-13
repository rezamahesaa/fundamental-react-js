import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ShowUser = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    // Fetch users
    fetch("http://localhost:8080/api/account/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-token-account-key": "123456789"
      }
    })
      .then(response => response.json())
      .then(dataSrc => setDataUsers(dataSrc.data))
      .catch(error => console.log(error));

    // Fetch roles
    fetch("http://localhost:8080/api/account/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-token-account-key": "123456789"
      }
    })
      .then(response => response.json())
      .then(dataSrc => setDataRoles(dataSrc.data))
      .catch(error => console.log(error));
  }, [dataUsers]);

  const clickEditRole = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const changeRole = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Request body dto di api
    const requestBody = {
      employee_id: selectedUser.id,
      role_id: selectedRole
    };

    // Post save
    fetch("http://localhost:8080/api/account/role/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-token-account-key": "123456789"
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data updated successfully", data);
        closeModal();
      })
      .catch(error => {
        console.error("Failed to update role", error);
      });
  };

  // if (!dataUsers.length || !dataRoles.length) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div className="container">
        <header>
          <h1 className="text-center mt-4">Role Management</h1>
        </header>
        <main>
          <table className="table table-striped table-bordered border-dark mt-4" id='tableUser'>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role.name}</td>
                  <td className="text-center">
                    <Button
                      className="text-decoration-none rounded text-light bg-primary px-4 py-1"
                      onClick={() => clickEditRole(user)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formId" hidden>
                  <Form.Label>ID</Form.Label>
                  <Form.Control type="text" readOnly value={selectedUser.id} />
                </Form.Group>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" readOnly value={selectedUser.username} />
                </Form.Group>
                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control as="select" value={selectedRole} onChange={changeRole}>
                    {dataRoles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ShowUser;
