import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <Layout>
      <Home />
      <Signup />
      <Login />
    </Layout>
  );
}

export default App;
