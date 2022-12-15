import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const AddPhone = () => {
    const [data, setData] = React.useState({
        name: '',
        stock: '',
        price: '',
        image: ''
    })

    const changeHandler = (e) => {
        const name = e.target.id
        let value = name == 'image' ? e.target.files[0] : e.target.value
        if (name == 'stock' || name == 'price') {
            value = Number(value)
        }
        setData((prevstate) => {
            return {
                ...prevstate,
                [name]: value
            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', data.image)
        formData.append('price', data.price)
        formData.append('stock', data.stock)
        formData.append('name', data.name)
        axios.post('http://localhost:3000/addproduct', formData)
            .then((res) => {
                console.log(res)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully registered!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    window.location.href = `http://${window.location.host}`

                }, 1500);
            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Fill the inputs correctly!'
                })
            })
        console.log(formData)
    }

    return (
        <form onSubmit={submitHandler} onChange={changeHandler} method="post">
            <>
                {/* <select required onChange={(e) => brandHandler(e)}>
                <option value={0}>Select brand</option>

                {
                    brands.map((brand) => {
                        return (
                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                        )
                    })
                }
            </select> */}
                {/* <input onChange={modelHandler} type="text" required placeholder="model" />
            <input onChange={imgHandler} type="text" required placeholder="img" />
            <input onChange={colorHandler} type="text" required placeholder="color" />
            <input onChange={ramHandler} type="number" required placeholder="ram" />
            <input onChange={priceHandler} type="number" required placeholder="price" />
            <input onChange={memoryHandler} type="number" required placeholder="memory" /> */}
            </>
            <input type='text' id='name' placeholder="Name" required />
            <input type='number' id='stock' placeholder="Stock" required />
            <input type='number' id='price' placeholder="Price" required />
            <input type="file" accept=".png,.jpeg,.webp,.jps" id="image" required />
            <button type="submit">Add Product</button>
        </form>
    )
}