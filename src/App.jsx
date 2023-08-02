import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookList from './pages/BookList'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App