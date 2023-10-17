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
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    unit_price: 0,
    stock: 0,
    category: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(productSelected?.image || "");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [isUploadButtonVisible, setIsUploadButtonVisible] = useState(true);


  const handleImage = async () => {
    setIsLoading(true);

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

    setIsImageLoaded(true);
    setIsUploadButtonVisible(false);
    setIsLoading(false);
  };

  const updateImageInDatabase = async (productId, imageUrl) => {
    const productsCollection = collection(db, "products");
    const productRef = doc(productsCollection, productId);

    await updateDoc(productRef, { image: imageUrl });
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
          gap: "20px",
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
            <img src={selectedImage} alt="Imagen Seleccionada" style={{ maxWidth: "100px" }} />
            <Button onClick={() => setSelectedImage("")}>Eliminar Imagen</Button>
          </div>
        )}
        {isUploadButtonVisible && file && (
          <Button onClick={handleImage} type="button">
            Cargar imagen
          </Button>
        )}
        {isImageLoaded && (
          <Button variant="contained" type="submit">
            {productSelected ? "modificar" : "crear"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default ProductsForm;
