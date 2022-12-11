import axios from 'axios';
import { useState, useEffect, forwardRef } from 'react';
import { Container, Grid, Box, Stack, Typography, Button, Autocomplete, TextField, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const AllergenProfile = () => {
    // Allergen state
    const [allergen, setAllergen] = useState([]);

    // User allergen state
    const [userAllergen, setUserAllergen] = useState([]);

    // Allergen input state
    const [value, setValue] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Add new allergen state
    const [addAllergen, setAddAllergen] = useState(false);

    // Alert state
    const [openAddAlert, setOpenAddAlert] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    // Alert
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // Open add alert
    const handleAddAlertOpen = () => {
        setOpenAddAlert(true);
    };

    // Close add alert
    const handleAddAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAddAlert(false);
    };

    // Open delete alert
    const handleDeleteAlertOpen = () => {
        setOpenDeleteAlert(true);
    };

    // Close delete alert
    const handleDeleteAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteAlert(false);
    };

    useEffect(() => {
        // Retrieve user allergen from database
        const getUserAllergen = async () => {
            await axios.get('http://localhost:5000/allergen/', { withCredentials: true })
                .then((res) => {
                    setAddAllergen(false);
                    setUserAllergen(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getUserAllergen();

        // Retrieve list of allergens from database
        const getAllergen = async () => {
            await axios.get('http://localhost:5000/allergen/allergens', { withCredentials: true })
                .then((res) => {
                    // Add firstLetter item to enable sorting
                    const allergens = res.data.map((option) => {
                        const firstLetter = option.allergenName[0].toUpperCase();
                        return {
                            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                            ...option,
                        };
                    })
                    setAllergen(allergens);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        getAllergen();
    }, [addAllergen]);

    // Sort allergen options
    const options = allergen.map((option) => {
        const firstLetter = option.allergenName[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    // Submits the select allergens to database
    const submitAllergens = (e) => {
        e.preventDefault();

        // Only allow submit if at least one allergen is selected
        if (value.length !== 0){
            const data = {
                allergens: value
            }
            const addNewAllergen = async () => {
                await axios.post('http://localhost:5000/allergen/add', data, { withCredentials: true })
                    .then((res) => {
                        setAddAllergen(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            setValue([]);
            setInputValue('');
            addNewAllergen();
            handleAddAlertOpen();
        }
    }

    // Delete allergen
    const deleteAllergen = (id) => {
        axios.delete('http://localhost:5000/allergen/delete/' + id, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
            }
            );

        setUserAllergen(userAllergen.filter(el => el._id !== id));
        handleDeleteAlertOpen();
    }

    return (
        <Container sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                {/* Add new allergen success alert */}
                <Snackbar open={openAddAlert} autoHideDuration={4000} onClose={handleAddAlertClose}>
                    <Alert onClose={handleAddAlertClose} severity="success" sx={{ width: '100%' }}>
                        Allergens successfully added
                    </Alert>
                </Snackbar>
                {/* Delete allergen success alert */}
                <Snackbar open={openDeleteAlert} autoHideDuration={4000} onClose={handleDeleteAlertClose}>
                    <Alert onClose={handleDeleteAlertClose} severity="success" sx={{ width: '100%' }}>
                        Allergen successfully deleted
                    </Alert>
                </Snackbar>
                {/* Title */}
                <Stack direction='row' alignItems='center' mb={3}>
                    <AccountCircleIcon sx={{ fontSize: '3rem', color: 'primary.dark', mr: 1 }} />
                    <Typography variant='h5' sx={{ fontWeight: 500 }}>Allergen Profile</Typography>
                </Stack>
                {/* Allergen search bar */}
                <Grid container justifyContent='center' mt={3} alignItems='center'>
                    <Grid item xs={12} md={8}>
                        {allergen.length !== 0 &&
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                sx={{ my: 3 }}
                                id="allergen-options"
                                multiple
                                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                isOptionEqualToValue={(option, value) => option.allergenId === value.allergenId}
                                getOptionLabel={(option) => option.allergenName || ''}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select allergens"
                                        placeholder="Select allergens to add"
                                    />
                                )}
                            />
                        }
                    </Grid>
                </Grid>
                {/* Add allergen button */}
                <Grid container justifyContent='center' textAlign='center'>
                    <Grid item xs={12} md={6}>
                        <Tooltip title={value.length === 0 ? "Please select an allergen in the search field": ""}>
                            <span>
                                <Button variant='contained' onClick={submitAllergens} size='large' endIcon={<AddIcon />} disabled={value.length === 0 ? true : false}>Add allergens</Button>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>
                {/* Allergen table */}
                <Grid container justifyContent='center' textAlign='center'>
                    <Grid item xs={12} md={8} my={6}>
                        <TableContainer component={Paper} sx={{ px: 2, py: 1 }}>
                            <Typography variant='subtitle1' sx={{ fontWeight: 500, fontSize: '1.05rem' }}>My allergens</Typography>
                            <Table aria-label="allergen table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Allergen</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userAllergen.length === 0 &&
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <Typography variant='subtitle1'>No allergens</Typography>
                                            </TableCell>
                                        </TableRow>
                                    }
                                    {userAllergen.map((allergen) => (
                                        <TableRow
                                            key={allergen._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {allergen.allergenName}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Delete" color='primary'>
                                                    <IconButton onClick={() => deleteAllergen(allergen._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default AllergenProfile;