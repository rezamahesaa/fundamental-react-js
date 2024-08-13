// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState, useEffect } from 'react';

// let EditRole = ({userId}) => {
//   const [dataUser, setDataUser] = useState(null); 
//   const [roles, setRoles] = useState([]); 

//   useEffect(() => {
//     // fetch user by id
//     fetch(`http://localhost:8080/api/account/user/${userId}`, { 
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-token-account-key": "123456789"
//       }
//     })
//     .then(response => response.json())
//     .then(dataSrc => setDataUser(dataSrc.data))
//     .catch(error => console.log(error));

//     // fetch list roles
//     fetch("http://localhost:8080/api/account/roles", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-token-account-key": "123456789"
//       }
//     })
//     .then(response => response.json())
//     .then(dataSrc => setRoles(dataSrc.data))
//     .catch(error => console.log(error));
//   }, [userId]); // effectnya run setiap userId ada modifikasi


//   // ERROR
//   // Cannot read properties of null (reading 'id')
//   // TypeError: Cannot read properties of null (reading 'id')
//   // kondisi awal dataUser itu null sebelum di setDataUser
//   if (!dataUser || roles.length === 0) {
//     return <div>Loading...</div>; 
//   }

//   return(
//     <>
//       <div className="container">
//         <header>
//           <h1 className="text-center mt-4">Update Employee Role</h1>
//         </header>
//         <main>
//           <form
//             method="post"
//             className="d-flex flex-column mt-4 gap-4"
//           >
//             <input type="hidden" value={dataUser.id} />
//             <input
//               type="hidden"
//               value={dataUser.password} 
//             />
//             <div className="d-flex align-items-center">
//               <label htmlFor="username" className="form-label me-2 mb-0">
//                 Username:
//               </label>
//               <input
//                 readOnly
//                 type="text"
//                 id="username"
//                 className="form-control-plaintext"
//                 value={dataUser.username} 
//               />
//             </div>
//             <div className="d-flex align-items-center">
//               <label htmlFor="role" className="form-label me-2 mb-0">
//                 Update Role:
//               </label>
//               <select id="role" className="form-select w-25">
//                 <option value="" disabled>Select a role</option>
//                 {roles.map(role => (
//                   <option key={role.id} value={role.id}>
//                     {role.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary align-self-start px-4 py-2"
//             >
//               Submit
//             </button>
//           </form>
//         </main>
//       </div>
//     </>
//   );
// }

// export default EditRole;
