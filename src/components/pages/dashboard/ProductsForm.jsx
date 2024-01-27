import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { db, uploadFile } from "../../../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const ProductsForm = ({
  handleClose,
  setIsChange,
  productSelected,
  setProductSelected,
}) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    unit_price: 0,
    stock: 0,
    category: "",
    image: "",
    image1: "",
    image2: "",
    image3: "",
  });
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [selectedImage, setSelectedImage] = useState(productSelected?.image || "");
  const [selectedImage1, setSelectedImage1] = useState(productSelected?.image1 || "");
  const [selectedImage2, setSelectedImage2] = useState(productSelected?.image2 || "");
  const [selectedImage3, setSelectedImage3] = useState(productSelected?.image3 || "");
  const [isUploadButtonVisible, setIsUploadButtonVisible] = useState(true);
  const [isUploadButtonVisible1, setIsUploadButtonVisible1] = useState(true);
  const [isUploadButtonVisible2, setIsUploadButtonVisible2] = useState(true);
  const [isUploadButtonVisible3, setIsUploadButtonVisible3] = useState(true);


  const handleImage = async () => {
    if (file) {
      let url = await uploadFile(file);
      if (productSelected) {
        setProductSelected({ ...productSelected, image: url });
        updateImageInDatabase(productSelected.id, url);
      } else {
        setNewProduct({ ...newProduct, image: url });
      }
      setSelectedImage(url);
    }
    setIsUploadButtonVisible(false);
  };
  const updateImageInDatabase = async (productId, imageUrl) => {
    const productsCollection = collection(db, "products");
    const productRef = doc(productsCollection, productId);
    await updateDoc(productRef, { image: imageUrl });
  };
  const handleImage1 = async () => {
    if (file1) {
      let url1 = await uploadFile(file1);
      if (productSelected) {
        setProductSelected({ ...productSelected, image1: url1 });
        updateImageInDatabase1(productSelected.id, url1);
      } else {
        setNewProduct({ ...newProduct, image1: url1 });
      }
      setSelectedImage1(url1);
    }
    setIsUploadButtonVisible1(false);
  };
  const updateImageInDatabase1 = async (productId, imageUrl1) => {
    const productsCollection = collection(db, "products");
    const productRef = doc(productsCollection, productId);
    await updateDoc(productRef, { image1: imageUrl1 });
  };
  const handleImage2 = async () => {
    if (file2) {
      let url2 = await uploadFile(file2);
      if (productSelected) {
        setProductSelected({ ...productSelected, image2: url2 });
        updateImageInDatabase2(productSelected.id, url2);
      } else {
        setNewProduct({ ...newProduct, image2: url2 });
      }
      setSelectedImage2(url2);
    }
    setIsUploadButtonVisible2(false);
  };
  const updateImageInDatabase2 = async (productId, imageUrl2) => {
    const productsCollection = collection(db, "products");
    const productRef = doc(productsCollection, productId);
    await updateDoc(productRef, { image2: imageUrl2 });
  };
  const handleImage3 = async () => {
    if (file3) {
      let url3 = await uploadFile(file3);
      if (productSelected) {
        setProductSelected({ ...productSelected, image3: url3 });
        updateImageInDatabase3(productSelected.id, url3);
      } else {
        setNewProduct({ ...newProduct, image3: url3 });
      }
      setSelectedImage3(url3);
    }
    setIsUploadButtonVisible3(false);
  };
  const updateImageInDatabase3 = async (productId, imageUrl3) => {
    const productsCollection = collection(db, "products");
    const productRef = doc(productsCollection, productId);
    await updateDoc(productRef, { image3: imageUrl3 });
  };


  const handleChange = (e) => {
    if (productSelected) {
      setProductSelected({
        ...productSelected,
        [e.target.name]: e.target.value,
      });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productsCollection = collection(db, "products");

    if (productSelected) {
      let obj = {
        ...productSelected,
        unit_price: +productSelected.unit_price,
        stock: +productSelected.stock,
      };
      updateDoc(doc(productsCollection, productSelected.id), obj).then(() => {
        setIsChange(true);
        handleClose();
      });
    } else {
      let obj = {
        ...newProduct,
        unit_price: +newProduct.unit_price,
        stock: +newProduct.stock,
      };
      addDoc(productsCollection, obj).then(() => {
        setIsChange(true);
        handleClose();
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <TextField
          variant="outlined"
          defaultValue={productSelected?.title}
          label="nombre"
          name="title"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.description}
          label="descripcion"
          name="description"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.unit_price}
          label="precio"
          name="unit_price"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.stock}
          label="stock"
          name="stock"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.category}
          label="categoria"
          name="category"
          onChange={handleChange}
        />
        {!selectedImage && (
          <TextField type="file" onChange={(e) => setFile(e.target.files[0])} />
        )}
        {selectedImage && (
          <div>
            <img src={selectedImage} alt="Imagen Seleccionada" style={{ maxWidth: "6.25rem" }} />
            <Button onClick={() => setSelectedImage("")}>Eliminar Imagen</Button>
            <Button variant="contained" type="submit">
              {productSelected ? "modificar" : "crear"}
            </Button>
          </div>
        )}
        {isUploadButtonVisible && file && (
          <Button onClick={handleImage} type="button">
            Cargar imagen
          </Button>
        )}
        {!selectedImage1 && (
          <TextField type="file" onChange={(e) => setFile1(e.target.files[0])} />
        )}
        {selectedImage1 && (
          <div>
            <img src={selectedImage1} alt="Imagen Seleccionada" style={{ maxWidth: "6.25rem" }} />
            <Button onClick={() => setSelectedImage1("")}>Eliminar Imagen</Button>
            <Button variant="contained" type="submit">
              {productSelected ? "modificar" : "crear"}
            </Button>
          </div>
        )}
        {isUploadButtonVisible1 && file1 && (
          <Button onClick={handleImage1} type="button">
            Cargar imagen
          </Button>
        )}
        {!selectedImage2 && (
          <TextField type="file" onChange={(e) => setFile2(e.target.files[0])} />
        )}
        {selectedImage2 && (
          <div>
            <img src={selectedImage2} alt="Imagen Seleccionada" style={{ maxWidth: "6.25rem" }} />
            <Button onClick={() => setSelectedImage2("")}>Eliminar Imagen</Button>
            <Button variant="contained" type="submit">
              {productSelected ? "modificar" : "crear"}
            </Button>
          </div>
        )}
        {isUploadButtonVisible2 && file2 && (
          <Button onClick={handleImage2} type="button">
            Cargar imagen
          </Button>
        )}
        {!selectedImage3 && (
          <TextField type="file" onChange={(e) => setFile3(e.target.files[0])} />
        )}
        {selectedImage3 && (
          <div>
            <img src={selectedImage3} alt="Imagen Seleccionada" style={{ maxWidth: "6.25rem" }} />
            <Button onClick={() => setSelectedImage3("")}>Eliminar Imagen</Button>
            <Button variant="contained" type="submit">
              {productSelected ? "modificar" : "crear"}
            </Button>
          </div>
        )}
        {isUploadButtonVisible3 && file3 && (
          <Button onClick={handleImage3} type="button">
            Cargar imagen
          </Button>
        )}
      </form>
    </div>
  )
};

export default ProductsForm;