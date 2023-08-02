import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import axios from 'axios'

function AddBook() {
    const [bookList, setBookList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBooklist = async () => {
            const response = await axios.get('http://localhost:3001/booklist')
            setBookList(response.data)
        }

        fetchBooklist()
    }, [])

    const validate = (values) => {
        const errors = {}

        if (!values.title) {
            errors.title = 'Title required!'
        } else {
            const found = bookList.find(book => book.title === values.title)
            if (found) {
                errors.title = 'Book title already exists!'
            }
        }

        if (!values.quantity) {
            errors.quantity = 'Quantity required!'
        }

        return errors
    }

    const handleSubmit = async (values) => {
        try {
            await axios.post('http://localhost:3001/booklist', {
                title: values.title,
                quantity: values.quantity
            })

            alert('Thêm sách thành công')
            navigate('/')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Formik
            initialValues={{
                title: '',
                quantity: ''
            }}
            validate={validate}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <div className='main'>
                    <form className='form' onSubmit={handleSubmit}>
                        <h1 className='heading'>Thêm Sách</h1>
                        <div className={`form-group ${errors.title && touched.title ? 'invalid' : ''}`}>
                            <label className='form-label' htmlFor="title">Title</label>
                            <input
                                type="text"
                                id='title'
                                className='form-control'
                                name="title"
                                placeholder="Tiêu đề"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            {errors.title && touched.title && <span className='form-message'>{errors.title}</span>}
                        </div>

                        <div className={`form-group ${errors.quantity && touched.quantity ? 'invalid' : ''}`}>
                            <label className='form-label' htmlFor='quantity'>Số lượng</label>
                            <input
                                type="number"
                                id='quantity'
                                className='form-control'
                                name="quantity"
                                placeholder="Số lượng"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            {errors.quantity && touched.quantity && <span className='form-message'>{errors.quantity}</span>}
                        </div>


                        <button className='btn btn-form-submit' type="submit">Thêm</button>
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default AddBook