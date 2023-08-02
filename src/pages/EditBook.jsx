import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import axios from 'axios'

function EditBook() {
  const [bookList, setBookList] = useState([])
  const [book, setBook] = useState({ title: '', quantity: '' })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchBooklist = async () => {
      const response = await axios.get('http://localhost:3001/booklist')
      setBookList(response.data)
    }
    fetchBooklist()
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/booklist/${id}`)
      .then(response => {
        setBook({ title: response.data.title, quantity: response.data.quantity })
        setLoading(false)
      })
  }, [id])

  const validate = (values) => {
    const errors = {}

    if (!values.title) {
      errors.title = 'Title required!'
    } else {
      const found = bookList.find(book => book.title === values.title)
      if (found && (values.title !== book.title)) {
        errors.title = 'Book already exists!'
      }
    }

    if (!values.quantity) {
      errors.quantity = 'Quantity required!'
    }

    return errors
  }

  const handleSubmit = async (values) => {
    await axios.put(`http://localhost:3001/booklist/${id}`, {
      title: values.title,
      quantity: values.quantity
    })
    navigate('/')
  }

  return loading ? ('Loading...') : (
    <Formik
      initialValues={book}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
        <div className='main'>
          <form className='form' onSubmit={handleSubmit}>
            <h1 className='heading'>Chỉnh Sửa Sách</h1>
            <div className={`form-group ${errors.title && touched.title ? 'invalid' : ''}`}>
              <label className='form-label' htmlFor='title'>Tên sách mới</label>
              <input
                type="text"
                className='form-control'
                id='title'
                name='title'
                placeholder='Nhập tên mới'
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.title && touched.title && <span className='form-message'>{errors.title}</span>}
            </div>

            <div className={`form-group ${errors.quantity && touched.quantity ? 'invalid' : ''}`}>
              <label className='form-label' htmlFor='quanity'>Số lượng</label>
              <input
                type="number"
                className='form-control'
                id='quantity'
                name='quantity'
                placeholder='Nhập vào số lượng'
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <button className='btn btn-form-submit' type="submit">Lưu</button>
          </form>
        </div>
      )}
    </Formik>
  )
}

export default EditBook