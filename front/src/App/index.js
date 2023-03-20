import "./style.css";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
// {/* <AppNav v-if="isLoggedIn"/> */}

export default App;
