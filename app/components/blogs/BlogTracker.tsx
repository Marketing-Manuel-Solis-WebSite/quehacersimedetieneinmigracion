'use client';

import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics/react';
import { usePathname } from 'next/navigation';

interface BlogTrackerProps {
    title: string;
    author: string;
    category: string;
}

export default function BlogTracker({ title, author, category }: BlogTrackerProps) {
    const pathname = usePathname();
    // Flags para no registrar el mismo evento múltiples veces por visita
    const [scrolled25, setScrolled25] = useState(false);
    const [scrolled50, setScrolled50] = useState(false);
    const [scrolled75, setScrolled75] = useState(false);
    const [scrolled100, setScrolled100] = useState(false);

    // Intentamos obtener el nombre si se guardó en el formulario de contacto previamente
    const getUserName = () => {
        if (typeof window !== 'undefined') {
            const savedName = localStorage.getItem('user_first_name'); 
            return savedName || 'Anónimo';
        }
        return 'Anónimo';
    };

    useEffect(() => {
        const userName = getUserName();

        // 1. RASTREO DE VISITA AL CARGAR (PAGE VIEW)
        track('Blog Post View', {
            slug: pathname || 'unknown',
            title: title,
            category: category,
            author: author,
            visitorName: userName,
            timestamp: new Date().toISOString()
        });

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            // Protección contra división por cero
            if (docHeight <= 0) return;

            const scrollPercent = (scrollTop / docHeight) * 100;

            const commonData = {
                slug: pathname || 'unknown',
                title: title,
                visitorName: userName,
                timestamp: new Date().toISOString()
            };

            // 2. RASTREO DE PROFUNDIDAD (SCROLL DEPTH)
            if (scrollPercent > 25 && !scrolled25) {
                track('Blog Scroll 25%', commonData);
                setScrolled25(true);
            }
            if (scrollPercent > 50 && !scrolled50) {
                track('Blog Scroll 50%', commonData);
                setScrolled50(true);
            }
            if (scrollPercent > 75 && !scrolled75) {
                track('Blog Scroll 75%', commonData);
                setScrolled75(true);
            }
            if (scrollPercent > 95 && !scrolled100) {
                track('Blog Read Complete (100%)', commonData);
                setScrolled100(true);
            }
        };

        // Optimizamos el evento scroll (throttling)
        let timeoutId: NodeJS.Timeout;
        const throttledScroll = () => {
            if (timeoutId) return;
            timeoutId = setTimeout(() => {
                handleScroll();
                timeoutId = undefined as any;
            }, 200);
        };

        window.addEventListener('scroll', throttledScroll);

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if(timeoutId) clearTimeout(timeoutId);
        };
    }, [pathname, title, category, author, scrolled25, scrolled50, scrolled75, scrolled100]);

    return null; // Este componente es invisible, solo lógica
}