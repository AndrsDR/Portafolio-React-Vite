import { useEffect, useState } from 'react';

export function useTranslator({ text, translate }) {
    // Conserva lo que te pasen mientras decides si traduces o no
    const [translatedText, setTranslatedText] = useState(text);

    // Normaliza: SOLO trabajamos con strings
    const isString = typeof text === 'string';
    const safeText = isString ? text : '';

    const fromLang = translate ? 'es' : 'en';
    const toLang = translate ? 'en' : 'es';

    useEffect(() => {
        // Si no es string, ni lo intentes: deja el contenido original
        if (!isString) {
            // Opcional: para depurar
            // console.warn('[translator] texto no-string, no se traduce:', text);
            setTranslatedText(text);
            return;
        }

        // Si es string vacío o solo espacios, no pegues al backend
        if (!safeText.trim()) {
            setTranslatedText(safeText);
            return;
        }

        let cancelled = false;

        fetch('/api/translate/index', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // ¡OJO! aquí solo mandamos el string plano
            body: JSON.stringify({ q: safeText, source: fromLang, target: toLang })
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (!cancelled) {
                    setTranslatedText(
                        typeof data?.translatedText === 'string'
                            ? data.translatedText
                            : safeText // fallback
                    );
                }
            })
            .catch(err => {
                if (!cancelled) {
                    console.error('[translator] backend error:', err);
                    setTranslatedText(safeText); // fallback si falla
                }
            });

        return () => { cancelled = true; };
    }, [isString, safeText, translate, fromLang, toLang]);

    return { translatedText };
}

