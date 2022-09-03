import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddProduct({ modal, setModal, product }) {

  const navigate = useNavigate()
  const [name, setName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null)
 
  const [seller, setSeller] = useState("")
  const [productID, setProductID] = useState("");
  // console.log(localStorage.getItem("supplier"));

  const handleClose = () => setModal(false);
  
  const handleChange = async (e) => {
    e.preventDefault();

      // const data = new FormData();
      // data.set("name", name);
      // data.set("price", price);
      // data.set("description", description);
     
      // data.set("quantity", quantity);
      // // data.set("sellerID", sellerID);
      // data.set("image", selectedFile);
      
      console.log(seller)
      await axios
        .post("http://localhost:4001/product/add", {
          name,price, seller, quantity, description, image
        } )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setTimeout(() => {
              toast.success("new product added");
            }, 1000);
            handleClose()
            navigate('/')
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.message);
        });
    
  };
  useEffect(()=>{
    !seller && setSeller(JSON.parse(localStorage.getItem("user")).acNo)
    console.log(JSON.parse(localStorage.getItem("user")).acNo)
  },[])


  return (
    <>
    {/* {seller && */}
      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          
              {/* <Form.Group className="mb-3" controlId="productAdd">
                <Form.Label style={{ fontWeight: "bold" }}>SellerID</Form.Label>
                <Form.Control type="string" value={sellerID} />
              </Form.Group> */}
      
            <Form.Group className="mb-3" controlId="productAdd">
              <Form.Label style={{ fontWeight: "bolder" }}>
                Product name
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productAdd">
              <Form.Label style={{ fontWeight: "bolder" }}>
                Upload Image
              </Form.Label>{" "}
              <br />
              <Form.Control
                type="file"
                placeholder="select an image"
                // value={name}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productAdd">
              <Form.Label style={{ fontWeight: "bold" }}>
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productAdd">
              <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
              <Form.Control
                type="string"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="productAdd">
              <Form.Label style={{ fontWeight: "bold" }}> In-stock</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="how many in stock?"
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          ></div>
          <Button style={{ backgroundColor: "#162030" }} onClick={handleClose}>
            Close
          </Button>
          <Button style={{ backgroundColor: "#162030" }} onClick={handleChange}>
            Add new one
          </Button>
        </Modal.Footer>
      </Modal>
{/* } */}
    </>
            
  );
}

export default AddProduct;