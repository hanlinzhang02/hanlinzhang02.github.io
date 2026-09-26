'use client';

import { useEffect, useState } from 'react';

export default function PdfReaderPage() {
    const [message, setMessage] = useState('Opening online reader…');
    const [file, setFile] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const requestedFile = params.get('file') || '';
        const isSafePdf =
            requestedFile.startsWith('/') &&
            requestedFile.toLowerCase().endsWith('.pdf') &&
            !requestedFile.includes('..');

        if (!isSafePdf) {
            setMessage('The requested PDF link is invalid.');
            return;
        }

        setFile(requestedFile);
        const pdfUrl = `${window.location.origin}${requestedFile}`;
        const viewerUrl = `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(pdfUrl)}`;
        window.location.replace(viewerUrl);
    }, []);

    return (
        <div className="py-24 text-center">
            <h1 className="text-2xl font-serif font-bold text-primary mb-3">{message}</h1>
            {file && (
                <p className="text-neutral-600 dark:text-neutral-400">
                    If the reader does not open,{' '}
                    <a href={file} className="text-accent underline underline-offset-4">
                        open the PDF directly
                    </a>
                    .
                </p>
            )}
        </div>
    );
}
