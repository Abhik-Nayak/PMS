"use client"
import { useGetUsersQuery } from '@/state/api'
import React from 'react'
import { useAppSelector } from '../redux'

type Props = {}

const Users = (props: Props) => {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !users) return <div>Error fetching users</div>;

    return (
        <div>Users</div>
    )
}

export default Users;