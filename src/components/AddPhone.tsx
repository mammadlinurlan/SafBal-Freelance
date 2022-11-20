import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const AddPhone = () => {
    const [brand, setBrand] = React.useState(0)
    const [model, setModel] = React.useState('')
    const [img, setImg] = React.useState('')
    const [color, setColor] = React.useState('')
    const [ram, setRam] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [memory, setMemory] = React.useState('')
    const [brands, setBrands] = React.useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/brands')
            .then((result) => {
                // console.log(result.data)
                setBrands(result.data)
                console.log(brands)
            })

    }, [])
    const brandHandler = (e) => {
        setBrand(e.target.value)
    }
    const modelHandler = (e) => {
        setModel(e.target.value)
    }
    const imgHandler = (e) => {
        setImg(e.target.value)
    }
    const colorHandler = (e) => {
        setColor(e.target.value)
    }
    const ramHandler = (e) => {
        setRam(e.target.value)
    }
    const priceHandler = (e) => {
        setPrice(e.target.value)
    }
    const memoryHandler = (e) => {
        setMemory(e.target.value)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const phone = {
            brand: brand,
            model: model,
            ram: Number(ram),
            img: img,
            price: Number(price),
            color: color,
            memory: Number(memory)
        }

        if (Number(phone.brand) == 0) {
            alert('select a brand')
        }
        else {

            axios.post('http://localhost:3000/postphone', phone).then(res => {
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
                .catch(err => {
                    console.log(err)
                })

        }


        console.log(phone)
    }
    return (
        <form onSubmit={submitHandler} method="post">
            {/* <input onChange={brandHandler} type="text" required placeholder="brand" /> */}
            <select required onChange={(e) => brandHandler(e)}>
                <option value={0}>Select brand</option>

                {
                    brands.map((brand) => {
                        return (
                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                        )
                    })
                }
            </select>
            <input onChange={modelHandler} type="text" required placeholder="model" />
            <input onChange={imgHandler} type="text" required placeholder="img" />
            <input onChange={colorHandler} type="text" required placeholder="color" />
            <input onChange={ramHandler} type="number" required placeholder="ram" />
            <input onChange={priceHandler} type="number" required placeholder="price" />
            <input onChange={memoryHandler} type="number" required placeholder="memory" />
            <button type="submit">Add Phone</button>
        </form>
    )
}