import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";
import { BASE_API_URL } from "../../utils/api/bigjuice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ConfirmationMessage } from "../ConfirmationMessage/ConfirmationMessage";
import { EditUser } from "./EditUser";
import "./Users.css";

export function Users() {
  const [users, setUsers] = useState([]);
  const [showUsersData, setShowUsersData] = useState(true);
  const [showUsersMessage, setShowUsersMessage] = useState(false);
  const [unauthorizedMessage, setUnauthorizedMessage] = useState("");
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showButtonNewUserForm, setShowButtonNewUserForm] = useState(true);
  const [usersMessage, setUsersMessage] = useState("");
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");
  const rol = localStorage.getItem("rol");
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    rol: "",
    ubication: "",
    id: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    cedula: "",
  });

  const getData = async () => {
    if (rol !== "admin") {
      setShowUsersData(false);
      setUnauthorizedMessage(true);
      setShowButtonNewUserForm(false);
    }

    try {
      const getUsers = await axios.get(`${BASE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUsers(getUsers.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const passUserData = (dataUser) => {
    setUser(dataUser);
    setShowEditUserForm(true);
  };

  // Funcion para eliminar un usuario.
  const deleteRequest = async () => {
    try {
      const request = await axios.delete(
        `${BASE_API_URL}/users/remove/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (request.data.status === 200) {
        setUserId("");
        setUser({});
        setShowDelete(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showDeleteUserMessage = (user) => {
    setUserId(user.id);
    setUser(user);
    setShowDelete(true);
    getData();
  };

  const cancelDeleteFunciton = () => {
    setUserId("");
    setUser({
      name: "",
      rol: "",
      ubication: "",
      id: "",
      password: "",
      email: "",
      phone: "",
      address: "",
      cedula: "",
    });
    setShowDelete(false);
  };

  // Funcion para Crear un usuario.
  const newUserFunction = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        `${BASE_API_URL}/users/new`,
        {
          ...userForm,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (request.status === 201) {
        getData();
        setShowNewUserForm(false);
        setUserForm({
          name: "",
          rol: "",
          ubication: "",
          id: "",
          password: "",
          email: "",
          phone: "",
          address: "",
          cedula: "",
        });
        setShowUsersMessage(false);
        setUsersMessage("");
      }
    } catch (error) {
      setUsersMessage(error.response.data.message);
      setShowUsersMessage(true);
    }
  };

  const fillDataUserForm = async (e) => {
    const dataNewUser = { ...userForm };
    dataNewUser[e.target.name] = e.target.value;
    setUserForm(dataNewUser);
  };

  const openNewUserForm = () => {
    setShowNewUserForm(true);
  };

  const closeNewUserForm = (e) => {
    e.preventDefault();
    setShowNewUserForm(false);
    setUserId("");
    setUser({ name: "", rol: "", ubication: "", id: "", password: "" });
  };

  const closeEditUserFormFunction = (e) => {
    e.preventDefault();
    setShowEditUserForm(false);
    setUserId("");
    setUser({ name: "", rol: "", ubication: "", id: "", password: "" });
  };

  return (
    <div>
      <Navbar />
      {unauthorizedMessage && (
        <p className="inventory-message">
          Inicia Sesión con una cuenta autorizada.
        </p>
      )}
      {showButtonNewUserForm && (
        <button className="register-user-button" onClick={openNewUserForm}>
          Nuevo
        </button>
      )}
      {showEditUserForm && (
        <EditUser
          user={user}
          setShowEditUserForm={setShowEditUserForm}
          getData={getData}
          closeEditUserFormFunction={closeEditUserFormFunction}
        />
      )}
      {showDelete && (
        <ConfirmationMessage>
          <h2
            style={{ textAlign: "center" }}
          >{`¿Desea eliminar al usuario ${user.name.toUpperCase()}?`}</h2>
          <div className="buttons-delete-supplier-container">
            <button className="confirm-delete-supplier" onClick={deleteRequest}>
              Confirmar
            </button>
            <button
              className="confirm-cancel-supplier"
              onClick={cancelDeleteFunciton}
            >
              Cancelar
            </button>
          </div>
        </ConfirmationMessage>
      )}
      {showNewUserForm && (
        <ConfirmationMessage height={"36rem"}>
          <h2 style={{ textAlign: "center" }}>Crear nuevo usuario</h2>
          <form className="form-new-user">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={fillDataUserForm}
              required
            />
            <label>Rol</label>
            <select
              name="rol"
              type="text"
              value={userForm.rol}
              onChange={fillDataUserForm}
            >
              <option value="" disabled>
                ...
              </option>
              <option value="vendedor">Vendedor</option>
              <option value="admin">Administrador</option>
            </select>
            <label>Ubicación</label>
            <select
              name="ubication"
              type="text"
              value={userForm.ubication}
              onChange={fillDataUserForm}
            >
              <option value="" disabled>
                ...
              </option>
              <option value="villa colombia">Villa Colombia</option>
              <option value="unico">Unico</option>
            </select>
            <label>Id</label>
            <input
              type="number"
              name="id"
              value={userForm.id}
              onChange={fillDataUserForm}
            />
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={userForm.password}
              onChange={fillDataUserForm}
              required
            />
            <label>Correo</label>
            <input
              type="text"
              name="email"
              value={userForm.email}
              onChange={fillDataUserForm}
              required
            />
            <label>Teléfono</label>
            <input
              type="text"
              name="phone"
              value={userForm.phone}
              onChange={fillDataUserForm}
              required
            />
            <label>Dirección</label>
            <input
              type="text"
              name="address"
              value={userForm.address}
              onChange={fillDataUserForm}
              required
            />
            <label>Cédula</label>
            <input
              type="text"
              name="cedula"
              value={userForm.cedula}
              onChange={fillDataUserForm}
              required
            />
            {showUsersMessage && (
              <p className="error-message">{usersMessage}</p>
            )}
            <div className="buttons-edituser-container">
              <button
                className="confirm-edit-user"
                onClick={(e) => newUserFunction(e)}
              >
                Crear
              </button>
              <button
                className="confirm-cancel-user"
                onClick={(e) => closeNewUserForm(e)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </ConfirmationMessage>
      )}
      {showUsersData && (
        <div className="user-table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Id</th>
                <th>Rol</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Cédula</th>
                <th>Fecha de Registro</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.id}</td>
                  <td>{user.rol.toUpperCase()}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.cedula}</td>
                  <td>{user.registration_date}</td>
                  <td>{user.ubication.toUpperCase()}</td>
                  <td onClick={() => showDeleteUserMessage(user)}>
                    {<RiDeleteBin6Line color={"red"} />}
                  </td>
                  <td onClick={() => passUserData(user)}>
                    {<MdEdit color={"blue"} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
