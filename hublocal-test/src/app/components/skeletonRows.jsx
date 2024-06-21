"use client";
import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

export default function SkeletonRows({ skeletonRowsLength }) {
  const skeletonCells = Array.from(Array(skeletonRowsLength).keys());
  return skeletonCells.map((_, index) => (
    <TableRow>
      <TableCell colSpan={3} key={`skeletonCells-${index}`}>
        <Skeleton />
      </TableCell>
    </TableRow>
  ));

}