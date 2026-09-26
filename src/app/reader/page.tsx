'use client';

import { useEffect, useState } from 'react';

export default function PdfReaderPage() {
    const [file, setFile] = useState('');
    const [title, setTitle] = useState('PDF Reader');
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const requestedFile = params.get('file') || '';
        const requestedTitle = params.get('title') || 'PDF Reader';
        const isSafePdf =
            requestedFile.startsWith('/') &&
            requestedFile.toLowerCase().endsWith('.pdf') &&
            !requestedFile.includes('..');

        if (!isSafePdf) {
            setInvalid(true);
            return;
        }

        setFile(requestedFile);
        setTitle(requestedTitle);
    }, []);

    if (invalid) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-serif font-bold text-primary mb-3">PDF unavailable</h1>
                <p className="text-neutral-600 dark:text-neutral-400">The requested PDF link is invalid.</p>
            </div>
        );
    }

    if (!file) {
        return <div className="py-20 text-center text-neutral-500">Loading PDF…</div>;
    }

    const pdfUrl = `${window.location.origin}${file}`;
    const viewerUrl = `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(pdfUrl)}`;

    return (
        <section className="py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h1 className="text-2xl font-serif font-bold text-primary">{title}</h1>
                <div className="flex gap-2">
                    <a href={file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-accent hover:text-white transition-colors">
                        Open full screen
                    </a>
                    <a href={file} download className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
                        Download
                    </a>
                </div>
            </div>
            <iframe src={viewerUrl} title={title} className="w-full h-[78vh] min-h-[640px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white" />
        </section>
    );
}
