"use client"
import { Navigation } from "@/components/ui/Navigation";
import { useEffect, useState } from "react";
import {Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import DisplayRole from "@/components/ui/Role";

export default function Page() {
    const [topUsers, setTopUsers] = useState("Loading...");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/get10TopUsers");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTopUsers(data.response); // Set to data.response
            } catch (error) {
                console.error('Fetch error:', error);
                setTopUsers("Failed to load data");
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navigation/>
            <div
                className="absolute inset-0 -z-10 bg-[image:radial-gradient(80%_50%_at_50%_-20%,hsl(var(--secondary)),rgba(255,255,255,0))]"/>
            <div className="flex flex-col p-6">
                <Table aria-label="Example static collection table" className={`opacity-85`} layout={"fixed"}>
                    <TableHeader>
                        <TableColumn>NUMBER</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>VIEWS</TableColumn>
                        <TableColumn>BADGES</TableColumn>
                        <TableColumn>LINK</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            typeof topUsers === 'string' ?
                                null :
                                topUsers.map((user, index) => (
                                    <TableRow key={index} emptyContent={"No rows to display."}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell className={`uppercase font-light`}>{user.profileid}</TableCell>
                                        <TableCell>{user.views}</TableCell>
                                        <TableCell><DisplayRole roleName={user.role} /></TableCell>
                                        <TableCell><Link href={`/${user.profileid}`}>Click to visit</Link></TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
