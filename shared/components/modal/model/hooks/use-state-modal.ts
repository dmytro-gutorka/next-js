import { useState } from 'react';

export function useModalState(initialValue = false) {
    const [open, setOpen] = useState(initialValue);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return {
        open,
        setOpen,
        openModal,
        closeModal,
    };
}
