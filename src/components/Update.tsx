import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const Update = (props) => {
    const { phoneId } = useParams()
    const [brandd, setBrand] = React.useState(0)
    const [model, setModel] = React.useState('')
    const [img, setImg] = React.useState('')
    const [color, setColor] = React.useState('')
    const [ram, setRam] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [memory, setMemory] = React.useState('')
    const [brands, setBrands] = React.useState([])
    const [product, setProduct] = React.useState({
        name: '',
        stock: '',
        price: '',
        image: '',
    })

    // setTimeout(() => {
    //     const phone = {
    //         brand: brandd,
    //         model: model,
    //         ram: Number(ram),
    //         img: img,
    //         price: Number(price),
    //         color: color,
    //         memory: Number(memory)
    //     }


    //     // console.log(phone)
    // }, 1200);

    // useEffect(() => {
    //     axios.get('http://localhost:3000/brands')
    //         .then((result) => {
    //             // console.log(result.data)
    //             setBrands(result.data)
    //             console.log(brands)
    //         })

    //     axios.get(`http://localhost:3000/phone/${phoneId}`)
    //         .then((res) => {
    //             setBrand(res.data.brand)
    //             setModel(res.data.model)
    //             setImg(res.data.img)
    //             setColor(res.data.color)
    //             setRam(res.data.ram)
    //             setPrice(res.data.price)
    //             setMemory(res.data.memory)

    //         })

    // }, [])
    // const brandHandler = (e) => {
    //     setBrand(e.target.value)
    // }
    // const modelHandler = (e) => {
    //     setModel(e.target.value)
    // }
    // const imgHandler = (e) => {
    //     setImg(e.target.value)
    // }
    // const colorHandler = (e) => {
    //     setColor(e.target.value)
    // }
    // const ramHandler = (e) => {
    //     setRam(e.target.value)
    // }
    // const priceHandler = (e) => {
    //     setPrice(e.target.value)
    // }
    // const memoryHandler = (e) => {
    //     setMemory(e.target.value)
    // }

    useEffect(() => {
        axios.get(`http://localhost:3000/getproduct/${phoneId}`)
            .then(({ data }) => {
                setProduct(data)
            })
    }, [])

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
        e.preventDefault()
        const phone = {
            brand: brandd,
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

            axios.put(`http://localhost:3000/update/${phoneId}`, phone).then(({ status }) => {
                if (status == 200) {
                    console.log("ag");
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully updated!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.href = `http://${window.location.host}`
                    }, 1500);
                }
            }).catch((err) => {
                console.log(err)
            })


            console.log('salam')
        }


        console.log(phone)
    }
    return (
        
        <div className="container">
        <h3>Update</h3>
            <form onSubmit={submitHandler} onChange={changeHandler} method="post">
                <span>id : {phoneId}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3>Current image :</h3>
                    <img width="100" src={`http://localhost:3000/${product.image}`} />
                </div>
                <input defaultValue={product.name} type='text' id='name' placeholder="Name" required />
                <input defaultValue={product.stock} type='number' id='stock' placeholder="Stock" required />
                <input defaultValue={product.price} type='number' id='price' placeholder="Price" required />
                <input type="file" accept=".png,.jpeg,.webp,.jpg" id="image" required />
                <button type="submit">Update Product</button>
            </form>
        </div>
          
       

    )
}