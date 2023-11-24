import React, { useEffect } from 'react'
import axios from 'axios';
import prismadb from '@/lib/prismadb';

async function getUser() {
    try {
        const response = await axios.get('/api/auth/session');
        const CurrentUser = prismadb.user.findUnique({
            where: {
                email: response.data.user.email
            }
        })
        console.log(CurrentUser);
    } catch (error) {
        console.error(error);
    }
}

export default function page() {
    getUser();


    return (
        <div>1</div>
    )
}
