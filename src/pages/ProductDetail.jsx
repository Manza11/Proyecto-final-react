import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ProductDetail = () => {

  const { id } = useParams()
  const [ detail, setDetail ] = useState({})

  useEffect( () => {
    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then( resp => setDetail(resp.data) )
        .catch( error => console.error(error) )

  },[] )

  return (
    <div>
        <h1>{detail.title}</h1>
    </div>
  )
}

export default ProductDetail