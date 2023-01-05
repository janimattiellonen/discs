import React from 'react';

import { DiscForm } from './DiscForm';

export function AddDiscPage() {
    return (
        <div className="mt-10 m-auto px-4 [max-width:800px]">
            <h1 className="mb-5">Add new disc</h1>

            <DiscForm />
        </div>
    );
}
