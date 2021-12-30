import React, {useState} from 'react'

const Cart = () => {
  let item = JSON.parse(localStorage.getItem("item"))
  const [items, setItems] = useState(item);
  console.log("Item in localStorage:", items)
  // const [products, setProducts] = useState(items)

  const handleDelete = (key) => {
    console.log("Id of item", key)
    // localStorage.removeItem("item")
    console.log("Items array at handleDelete:", item)
    items.splice(key, 1);
    localStorage.setItem('item',JSON.stringify(items));
    console.log("Items after delete:", item)
    setItems(items)

    // localStorage.removeItem(id)
    // items.splice(id, 1)
    // localStorage.setItem('items', JSON.stringify(items));

  }

  return (
    <>
      <section className="product_section layout_padding">
        {items ? (<div className="container">
          <div className="row">
            {items?.map((item, key) => (
              <div className="col-sm-6 col-md-4 col-lg-3" index={key}>
                <div className="box">
                  <div className="img-box">
                    <img src={item.image[0]} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>
                      {item.description}
                    </h5>
                    <h6>
                      {item.price}
                    </h6>
                  </div>
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex my-2">
            <h2>Total Amount:</h2>
            <div>
              <h2>
              {
                items.reduce(function(prev, current) {
                  return prev + +current.price;
                  }, 0)
              }
              </h2>
            </div>
          </div>

        </div>
        ): <h3>You have not selected yet any item.</h3>}
        
      </section>
    </>
  )
}
export default Cart