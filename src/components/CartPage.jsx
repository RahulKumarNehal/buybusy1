import React from 'react'
import Sidebar from './Sidebar';
import Products from './Products';
import {DataProviderContext} from '../DataProviderContext';

const CartPage = ({ cartTrue }) => {
    return (
        <>
            <DataProviderContext>
                <div className="flex justify-between">
                    <Sidebar cartTrue={cartTrue}  />
                    <div className='w-10/12 p-10'>
                        <Products cartTrue={cartTrue} />
                    </div>
                </div>
            </DataProviderContext>
        </>
    )
}

export default CartPage
