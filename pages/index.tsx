import React from 'react'
import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'
import { getSession } from 'next-auth/client'

interface Props {
    users: {
        name?: string,
        id: number,
        email?: string
    }[],
}
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const users = await prisma.user.findMany({
        select: {
            name: true,
            id: true,
            email: true,
        }
    });
    return { props: { users } }
}
const Users = (props: Props) => {
    const getUserID = async () => {
        const session = await getSession()
        console.log(session?.user)
    }

    return (
        <div style={{'display':'block'}}>
            {props.users.map((user) =>
                <div key={user.id}>
                    {user.id}
                    {user.name}
                    {user.email}
                </div>
            )}
        </div>
    );
}

export default Users