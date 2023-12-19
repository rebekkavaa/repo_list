import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { Repository } from '../app/api/api';

interface RepositoryTableProps {
  repositories: Repository[];
}

const RepositoryTable: React.FC<RepositoryTableProps> = ({ repositories }) => (
    <Table>
    <TableCaption>Top JavaScript Repositories on GitHub</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Description</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {repositories.map((repo) => (
            <TableRow key={repo.id}>
                <TableCell>{repo.id}</TableCell>
                <TableCell>{repo.name}</TableCell>
                <TableCell>{repo.owner.login}</TableCell>
                <TableCell>{repo.description}</TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
);

export default RepositoryTable;