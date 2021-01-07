import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

const products = [
    {
        id:1,
        name:"Shoes",
        description:"Running shoes",
        price:"$10",
        image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cushion-shoes-7659-1584132587.jpg?crop=1.00xw:0.701xh;0,0.229xh&resize=1200:*"
    },
    {
        id:2,
        name:"Macbook",
        description:"Apple",
        price:"$10",
        image:"https://zdnet4.cbsistatic.com/hub/i/r/2020/11/16/37e33024-2892-4bb7-9d21-6ac6f7544def/thumbnail/770x433/5f1b7f881bfb80a9f2bbe02bc6d64b49/apple-macbook-pro-m1-2020-5.jpg"
    },
]

const Products = ({ products , onAddToCart }) =>{
    const classes = useStyles();

    return(
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={ 4 }>
                {
                    products.map(product =>(
                        <Grid item key={ product.id } xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                            <Product product={ product } onAddToCart={ onAddToCart }></Product>
                        </Grid>
                    ))
                }
            </Grid>
        </main>
    )
}

export default Products;