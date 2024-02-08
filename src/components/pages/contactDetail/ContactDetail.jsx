import { useState } from "react";
import { FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import natural from "../../../assets/natural.png"
import lineCart from "../../../assets/lineCart.png"
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const ContactDetail = () => {


    const [isHomeDelivery, setIsHomeDelivery] = useState(true);


    const formik = useFormik({
        initialValues: {
            name: "",
            last_name: "",
            email: "",
            phone: "",
            street_name: "",
            street_number: "",
            apartment: "",
            zip_code: "",
            aditional_info: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('*Campo requerido')
                .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números, símbolos'),
            last_name: Yup.string()
                .required('*Campo requerido')
                .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números, símbolos'),
            email: Yup.string()
                .email('Email no válido')
                .required('*Campo requerido'),
            phone: Yup.string()
                .required('*Campo requerido')
                .matches(/^[0-9]+$/, 'Solo se permiten números')
                .length(10, 'Debe contener 10 números'),
            street_name: Yup.string()
                .required('*Campo requerido')
                .matches(/^[a-zA-Z0-9\s]+$/, 'Solo se permiten letras y números'),
            street_number: Yup.string()
                .required('*Campo requerido')
                .matches(/^[0-9]+$/, 'Solo se permiten números'),
            apartment: Yup.string()
                .matches(/^[a-zA-Z0-9\s]+$/, 'Solo se permiten letras y números'),
            zip_code: Yup.string()
                .required('*Campo requerido')
                .matches(/^[0-9]+$/, 'Solo se permiten números')
                .length(4, 'Debe contener 4 números'),
        }),
        onSubmit: values => {
            handleBuy(values);
        },
    });

    const navigate = useNavigate();

    const handleBuy = () => {
        if (formik.isValid && (formik.values.name || formik.values.last_name || formik.values.email || formik.values.phone)) {
            let order = {
                ...formik.values,
            };
            localStorage.setItem("order", JSON.stringify(order));
            navigate("/checkout");
        } else {
            alert("Existen campos que se deben completar correctamente.");
            return;
        }
    };





    return (
        <div className="contactDetail">
            <ThemeProvider theme={theme}>
                <div className="contactContainer">
                    <img src={natural} alt="Nombre del emprendimiento: Natural" className="contactImg" />
                    <Typography className="subtitulo" variant="h2">Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
                    <div className="contactStatus">
                        <Typography variant="h4" style={{ color: "#164439" }} className="titleContactStatus">Productos</Typography>
                        <img src={lineCart} className="contactLine" alt="Linea recta" />
                        <Typography variant="titulo" sx={{ fontSize: "0.875rem" }} className="titleContactStatus" >Detalle de entrega</Typography>
                        <img src={lineCart} className="contactLine" alt="Linea recta" />
                        <Typography variant="h4" style={{ color: "#164439" }} className="titleContactStatus">Medios de pago</Typography>
                    </div>
                    <div className="contactBox">
                        <div className="infoBox">
                            <Typography variant="titulo" sx={{ fontSize: "0.875rem" }}>Información de contacto</Typography>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer">
                                <Typography variant="h4Custom">Nombre:</Typography>
                                <TextField
                                    name="name"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''} />

                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer">
                                <Typography variant="h4Custom">Apellido:</Typography>
                                <TextField
                                    name="last_name"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.last_name}
                                    helperText={formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : ''} />
                            </div>
                            <div style={{ marginBottom: "0.625rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Email:</Typography>
                                <TextField
                                    name="email"
                                    placeholder="Ejem:Tunombre@gmail.com"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Teléfono:</Typography>
                                <TextField
                                    name="phone"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                    helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''} />
                            </div>
                        </div>

                        <div className="controlersBox">
                            <Typography variant="titulo" sx={{ fontSize: "0.875rem" }}>Método de envío</Typography>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={isHomeDelivery ? "homeDelivery" : "pickup"}
                                onChange={() => setIsHomeDelivery(!isHomeDelivery)} >
                                <FormControlLabel value="pickup" control={<Radio />} label="Retiro en local" />
                                <FormControlLabel value="homeDelivery" control={<Radio />} label="Envío a domicilio" />

                                <Typography>
                                    {isHomeDelivery
                                        ? "Nos contactaremos para informarle el precio del envío"
                                        : "Presentate en el local para retirar tu pedido"
                                    }
                                </Typography>
                            </RadioGroup>

                        </div>

                        <div className="shippingInformation infoBox" style={{ display: isHomeDelivery ? 'block' : 'none' }}>
                            <Typography variant="titulo" sx={{ fontSize: "0.875rem" }}>Datos de envío</Typography>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Calle:</Typography>
                                <TextField
                                    name="street_name"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.street_name}
                                    helperText={formik.touched.street_name && formik.errors.street_name ? formik.errors.street_name : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Número:</Typography>
                                <TextField
                                    name="street_number"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.street_number}
                                    helperText={formik.touched.street_number && formik.errors.street_number ? formik.errors.street_number : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Departamento:</Typography>
                                <TextField
                                    name="apartment"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.apartment}
                                    helperText={formik.touched.apartment && formik.errors.apartment ? formik.errors.apartment : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Código postal:</Typography>
                                <TextField
                                    name="zip_code"
                                    className="textField"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.zip_code}
                                    helperText={formik.touched.zip_code && formik.errors.zip_code ? formik.errors.zip_code : ''} />
                            </div>
                            <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                                <Typography variant="h4Custom">Observaciones:</Typography>
                                <TextField
                                    name="aditional_info"
                                    className="textField"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.aditional_info}
                                    helperText={formik.touched.aditional_info && formik.errors.aditional_info ? formik.errors.aditional_info : ''} />
                            </div>
                        </div>

                        

                    </div>

                    <div className="optionsContainer">
                        <Link to="/cart" className="linksOptions">
                            <Icon icon="grommet-icons:next" transform="rotate(180)" />
                            <Typography variant="stock" style={{ color: '#164439' }}>Volver al carrito</Typography>
                        </Link>
                        <Typography onClick={handleBuy} variant="stock" style={{ color: '#164439', cursor: 'pointer' }}>
                            Siguiente paso <Icon icon="grommet-icons:next" />
                        </Typography>

                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default ContactDetail;