import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Container, Grid, Box, Stack, Typography, Button, InputLabel, Select, MenuItem, FormControl, Paper, Alert } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ProductScanner = () => {
    // Logged in 
    const { loggedIn } = useContext(AuthContext);

    // user allergen state
    const [userAllergen, setUserAllergen] = useState([]);

    // Select video input devices state
    const [device, setDevice] = useState('');
    const [deviceList, setDeviceList] = useState([]);

    // Product state
    const [product, setProduct] = useState({});
    const [receiveProduct, setReceiveProduct] = useState(false);

    // Suitability state of the product
    const [isSuitable, setIsSuitable] = useState(true);

    const hints = new Map();
    const formats = [BarcodeFormat.UPC_A, BarcodeFormat.UPC_E, BarcodeFormat.EAN_8, BarcodeFormat.EAN_13];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

    // Initialise barcode reader
    const reader = new BrowserMultiFormatReader(hints);

    useEffect(() => {
        // If logged in retrieve allergen list
        if (loggedIn) {
            axios.get('http://localhost:5000/allergen/', { withCredentials: true })
                .then((res) => {
                    setUserAllergen(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        // Get video input devices
        reader.listVideoInputDevices()
            .then((videoInputDevices) => {
                setDevice(videoInputDevices[0].deviceId);
                setDeviceList(videoInputDevices);
            })
            .catch((err) => {
                console.error('err')
            })
    }, [])

    // Handle device select change
    const handleChange = (e) => {
        // device = e.target.value;
        setDevice(e.target.value);
    }

    // Dialog state
    const [open, setOpen] = useState(false);

    // Handle dialog close
    const handleClose = () => {
        setOpen(false);
    }

    // Barcode scanner reset button
    const resetScanner = () => {
        reader.reset();
    }

    // Barcode scanner start button
    const startScanner = () => {
        setOpen(true);
        setReceiveProduct(false);
        setProduct({});
        reader.decodeOnceFromVideoDevice(device, 'video').then((result) => {
            axios.get('https://world.openfoodfacts.org/api/v2/product/' + result)
                .then((res) => {
                    // Check if the product contains allergens that matches with the allergen of the user
                    if (loggedIn){
                        userAllergen.forEach((allergen) => {
                            if (res.data.product.allergens_tags.includes(allergen.allergenId)){
                                setIsSuitable(false);
                            }
                        }) 
                    }
                    setProduct(res.data);
                    setReceiveProduct(true);
                })
            resetScanner();
            handleClose();
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <Container sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Stack direction='row' alignItems='center' mb={3}>
                    <QrCodeScannerIcon sx={{ fontSize: '2.5rem', color: 'primary.dark', mr: 1 }} />
                    <Typography variant='h6' sx={{ fontWeight: 500 }}>Product Scanner</Typography>
                </Stack>
                <Grid container mt={3} justifyContent='center'>
                    <Grid item xs={12} sm={6} md={3} mb={2} textAlign='center'>
                        <FormControl fullWidth>
                            <InputLabel id="device-select-label">Select video device</InputLabel>
                            <Select
                                labelId="device-select-label"
                                id="device-select"
                                value={device}
                                label="Change video device"
                                onChange={handleChange}
                                fullWidth
                            >
                                {
                                    deviceList.map((item) => (
                                        <MenuItem key={item.deviceId} value={item.deviceId}>{item.label}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} sm={6} md={3} mb={2}>
                        <Stack direction='row' spacing={1} justifyContent='center'>
                            <Button size='large' fullWidth onClick={startScanner} variant='contained' id="startButton">Scan product</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} sm={10} md={6} mt={3} mb={4}>
                        {/* If no product is received yet */}
                        {!receiveProduct &&
                            <Typography variant='body1' textAlign='center' sx={{ fontWeight: 500 }}>Start scanning your desired product using the scan button above</Typography>
                        }
                        {/* If product is received but no product details is found */}
                        {receiveProduct && product.status === 0 &&
                            <Typography variant='body1' textAlign='center' sx={{ fontWeight: 500 }}>This product could not be found</Typography>
                        }
                        {/* If product is retrieved and product details is found */}
                        {receiveProduct && product.status === 1 &&
                            <>
                                <Paper elevation={3} sx={{ px: { xs: 2, sm: 3 }, py: 3, borderRadius: 3 }}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 500, fontSize: '1.3rem'}}>{product.product.product_name} </Typography>
                                    <Grid container>
                                        {loggedIn && isSuitable &&
                                            <Grid item xs={12} mt={1} mb={2}>
                                                <Alert severity="success"><strong>This product is suitable for you</strong></Alert>
                                            </Grid>
                                        }
                                        {loggedIn && !isSuitable &&
                                            <Grid item xs={12} mt={1} mb={2}>
                                                <Alert severity="error"><strong>This product is not suitable for you</strong></Alert>
                                            </Grid>
                                        }
                                        <Grid item xs={12} md={6} mb={1}>
                                            <Typography variant='subtitle2' sx={{ fontWeight: 500 }}>
                                                Allergens:
                                                {product.product.allergens_tags.length === 0 &&
                                                    <Typography component='span' variant='subtitle2' sx={{ ml: 1, fontWeight: 400 }}>No recorded allergens</Typography>
                                                }
                                            </Typography>
                                            {product.product.allergens_tags.length !== 0 &&
                                                <List dense sx={{ pt: 0 }}>
                                                    {
                                                        product.product.allergens_tags.map((item) => (
                                                            <ListItem key={item}>
                                                                <ListItemText primary={item.slice(3, 4).toUpperCase() + item.slice(4)} />
                                                            </ListItem>
                                                        ))
                                                    }
                                                </List>
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={6} mb={1}>
                                            <Typography variant='subtitle2' sx={{ fontWeight: 500 }}>
                                                Nutrient levels:
                                                {product.product.nutrient_levels_tags.length === 0 &&
                                                    <Typography component='span' variant='subtitle2' sx={{ ml: 1, fontWeight: 400 }}>No recorded nutrient level</Typography>
                                                }
                                            </Typography>
                                            {product.product.nutrient_levels_tags !== 0 &&
                                                <List dense sx={{ pt: 0 }}>
                                                    {
                                                        product.product.nutrient_levels_tags.map((item) => (
                                                            <ListItem key={item}>
                                                                <ListItemText primary={(item.slice(3, 4).toUpperCase() + item.slice(4)).replace(/-/g, ' ')} />
                                                            </ListItem>
                                                        ))
                                                    }
                                                </List>
                                            }
                                        </Grid>
                                        <Grid item xs={12} mb={1}>
                                            <Typography variant='subtitle2' sx={{ fontWeight: 500 }}>
                                                Nutriscore-grade:
                                                {/* If nutriscore-grade is not empty*/}
                                                {product.product.nutriscore_grade &&
                                                    <Typography component='span' variant='subtitle2' sx={{ fontWeight: 400, ml: 1 }}>{product.product.nutriscore_grade}</Typography>
                                                }
                                                {/* If nutriscore-grade is empty*/}
                                                {!product.product.nutriscore_grade &&
                                                    <Typography component='span' variant='subtitle2' sx={{ fontWeight: 400, ml: 1 }}>No recorded nutriscore-grade</Typography>
                                                }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} mb={1}>
                                            <Typography variant='subtitle2' sx={{ fontWeight: 500 }}>
                                                Nutriscore-score:
                                                {/* If nutriscore-score is not empty */}
                                                {product.product.nutriscore_score &&
                                                    <Typography component='span' variant='subtitle2' sx={{ fontWeight: 400, ml: 1 }}>{product.product.nutriscore_score}</Typography>
                                                }
                                                {/* If nutriscore-score is empty */}
                                                {!product.product.nutriscore_score &&
                                                    <Typography component='span' variant='subtitle2' sx={{ fontWeight: 400, ml: 1 }}>No recorded nutriscore-score</Typography>
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </>
                        }
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <video id="video" style={{ maxWidth: '100%', height: 'auto' }} width={500} height={500}></video>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}

export default ProductScanner;