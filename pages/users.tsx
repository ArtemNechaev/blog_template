import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import prisma from '../lib/prisma'
import { getSession } from 'next-auth/client'
interface Props {
    users: {
        name?: string,
        id:number,
        email?: string
    }[]
}
export const getServerSideProps:GetServerSideProps = async ({req,res}) => {
    const users = await prisma.user.findMany({
        select: {
            name:true,
            id: true,
            email:true,
        }
    });
    return {props: {users}}
}
const Users = (props: Props) => {
    const getUserID = async() => {
        const session = await getSession()
        console.log(session?.user)
    }
    
    return (
        <Layout>
            <button onClick={getUserID}>getUser</button>
            {props.users.map((user) =>
            <div key={user.id}>
                {user.id}
                {user.name}
                {user.email}
            </div>
            )}
        </Layout>
    );
}

export default Users