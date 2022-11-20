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

    useEffect(() => {
        axios.get('http://localhost:3000/brands')
            .then((result) => {
                // console.log(result.data)
                setBrands(result.data)
                console.log(brands)
            })

        axios.get(`http://localhost:3000/phone/${phoneId}`)
            .then((res) => {
                setBrand(res.data.brand)
                setModel(res.data.model)
                setImg(res.data.img)
                setColor(res.data.color)
                setRam(res.data.ram)
                setPrice(res.data.price)
                setMemory(res.data.memory)

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

            axios.put(`http://localhost:3000/update/${phoneId}`, phone).then(({status})=>{
                if(status==200){
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
            }).catch((err)=>{
                console.log(err)
            })
            

            console.log('salam')
        }


        console.log(phone)
    }
    return (
        <>
            <h3>Update</h3>
            <span>id : {phoneId}</span>


            <form onSubmit={submitHandler} >
                <select required onChange={(e) => brandHandler(e)}>
                    <option value={0}>Select brand</option>
                    {
                        brands.map((brand) => {
                            return (
                                <option selected={brand._id == brandd ? true : false} key={brand._id} value={brand._id}>{brand.name}</option>
                            )
                        })
                    }
                </select>
                <input onChange={modelHandler} defaultValue={model} type="text" required placeholder="model" />
                <input onChange={imgHandler} defaultValue={img} type="text" required placeholder="img" />
                <input onChange={colorHandler} type="text" defaultValue={color} required placeholder="color" />
                <input onChange={ramHandler} type="number" defaultValue={ram} required placeholder="ram" />
                <input onChange={priceHandler} type="number" defaultValue={price} required placeholder="price" />
                <input onChange={memoryHandler} type="number" defaultValue={memory} required placeholder="memory" />
                <button type="submit">Add Phone</button>
            </form>
        </>

    )
}