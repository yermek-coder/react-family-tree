import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Root from '@/components/pages/Root.jsx'
import Home from '@/components/pages/Home.jsx'
import Info from '@/components/pages/Info.jsx'
import Create from '@/components/pages/Create.jsx'
import Search from '@/components/pages/Search.jsx'
import Connection from '@/components/pages/Connection.jsx'
import ConnectionResult from '@/components/pages/connection/Result.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route path="/info" element={<Info />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="connection">
          <Route index element={<Connection />} />
          <Route path="result" element={<ConnectionResult />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>,
)
