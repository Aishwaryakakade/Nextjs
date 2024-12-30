"use client";
import { Product } from "./product-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductsList({
  products,
  initialCartProducts,
}: {
  products: Product[];
  initialCartProducts: Product[];
}) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  async function addtoCart(productId: string) {
    const response = await fetch("http://localhost:3000/api/users/2/cart", {
      method: "POST",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);
  }

  function productIsInCart(productId: string) {
    return cartProducts.some((cp) => cp.id === productId);
  }

  async function removetoCart(productId: string) {
    const response = await fetch("http://localhost:3000/api/users/2/cart", {
      method: "DELETE",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((pro) => (
        <Link
          key={pro.id}
          href={"/products/" + pro.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
        >
          <div className=" flex justify-center mb-4 h-48 relative">
            <Image
              src={"/" + pro.imageUrl}
              alt="product"
              width={150}
              height={150}
            />
          </div>

          <h2 className="text-xl font-semibold mb-2">{pro.name}</h2>
          <p className="text-gray-600">${pro.price}</p>
          {productIsInCart(pro.id) ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                removetoCart(pro.id);
              }}
            >
              Remove from cart
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault;
                addtoCart(pro.id);
              }}
            >
              Add to Cart
            </button>
          )}
        </Link>
      ))}
    </div>
  );
}
