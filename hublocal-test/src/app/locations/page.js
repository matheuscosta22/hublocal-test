"use client";
import { Suspense } from 'react';

import Locations from "../components/locations";

export default function locations() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Locations />
      </Suspense>
    </>
  );
}
