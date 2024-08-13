import logo from './logo.svg';
import './App.css';
import EditRole from './components/RoleManagement/RoleEdit';
import ShowUser from './components/RoleManagement/RoleManagementIndex';

function App() {
  
  return (
    <div className="App">
      <ShowUser />
      <br/>
      <br/>
      <br/>
      {/* <EditRole userId={50}/> */}
    </div>
  );
}

export default App;
