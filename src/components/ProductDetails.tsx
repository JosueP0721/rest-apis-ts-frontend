import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { formatCurrency } from "../helpers"
import { Product } from "../types"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({product} : ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className=" border-b text-center">
            <td className=" p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className=" p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className=" p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type='submit'
                        name='id'
                        value={product.id}
                        className={`${isAvailable ? 'text-green-600 border-green-600 hover:bg-green-400/30' : 'text-red-600 border-red-600 hover:bg-red-400/30'} rounded-lg p-2 text-xs uppercase font-bold w-full border-2 transition duration-300 `}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className=" p-3 text-lg text-gray-800">
                <div className=" flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        className=" bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-sm text-center hover:bg-indigo-800 transition duration-200"
                    >
                        Editar
                    </button>
                    <Form
                        method="POST"
                        className="w-full"
                        action={`products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if(!confirm('¿Estás seguro de eliminar este producto?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input 
                            type="submit" 
                            value="Eliminar"
                            className=" bg-red-600 cursor-pointer text-white rounded-lg w-full p-2 uppercase font-bold text-sm text-center hover:bg-red-800 transition duration-200"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
