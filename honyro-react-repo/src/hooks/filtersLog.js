import { useState } from 'react';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';


function _resolveLangs(translate) {
    if (translate === true)  return { from: 'es', to: 'en' };
    if (translate === false) return { from: 'en', to: 'es' };
    if (typeof translate === 'string') {
        const to = translate.toLowerCase();
        const from = to === 'es' ? 'en' : 'es';
        return { from, to };
    }
    if (translate && typeof translate === 'object' && translate.from && translate.to) {
        return { from: translate.from, to: translate.to };
    }
    return { from: 'en', to: 'es' };
}

async function translateTextPlain(text, translate) {
    const str = typeof text === 'string' ? text : '';
    if (!str.trim()) return str;
    const { from, to } = _resolveLangs(translate);
    const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: str, source: from, target: to })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return typeof data?.translatedText === 'string' ? data.translatedText : str;
}

export function filterByTitleLoose(query, products, opts = {}) {
    const minTokenLength = opts.minTokenLength ?? 3;
    const fields = opts.fields ?? ['TranslatedTitle', 'title', 'name'];
    const sortByScore = opts.sortByScore ?? true;

    const normalize = (s) => {
        if (!s) return '';
        let t = String(s).toLowerCase();
        try { t = t.normalize('NFD').replace(/\p{Diacritic}/gu, ''); } catch {}
        return t.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
    };

    const tokens = normalize(query).split(' ').filter(t => t.length >= minTokenLength);
    if (tokens.length === 0) return products;

    const results = [];
    const list = Array.isArray(products) ? products : [];
    for (let i = 0; i < list.length; i++) {
        const p = list[i];
        const haystackRaw = fields.map(f => p?.[f] || '').join(' ');
        const hay = normalize(haystackRaw);

        let score = 0;
        for (let k = 0; k < tokens.length; k++) {
            if (hay.includes(tokens[k])) score += 1;
        }

        if (score > 0) {
            results.push({ p, score, idx: i });
        }
    }

    if (sortByScore) {
        results.sort((a, b) => (b.score - a.score) || (a.idx - b.idx)); // empate: orden original
    }

    return results.map(r => r.p);
}



export function useFiltersLog(filters,  delayMs = 500, products) {
    const { query, category, priceMin, priceMax } = filters || {};
    const { translate } = useLanguage();

    const [translatedProducts, setTranslatedProducts] = useState(products);
    const [searchedProducts, setSearchedProducts] = useState(translatedProducts);

    useEffect(() => {
        let cancel = false;
    
        (async () => {
            const list = Array.isArray(products) ? products : [];
    
            // traduces todos los títulos en paralelo
            const translated = await Promise.all(
                list.map(p =>
                    translateTextPlain(p?.title ?? p?.name ?? '', translate)
                        .catch(() => p?.title ?? p?.name ?? '')
                )
            );

    
            if (cancel) return;
    
            // ahora sí, guardas los STRINGS traducidos
            const next = list.map((p, i) => ({
                ...p,
                TranslatedTitle: translated[i]
            }));
    
            setTranslatedProducts(next);
        })();
    
        return () => { cancel = true; };
    }, [products, translate]);
    

    useEffect(() => {
        const id = setTimeout(() => {
            const queryLower = (query ?? '').trim().toLowerCase();

            const filteredProducts = translatedProducts
                .filter(p => category === 'all' || p.category === category)
                .filter(p => p.price >= priceMin && p.price <= priceMax)

            setSearchedProducts(filterByTitleLoose(queryLower, filteredProducts, { minTokenLength: 2, fields: ['TranslatedTitle', 'title', 'name'] }))
            
        }, delayMs);

        return () => clearTimeout(id); // cancela si cambia algo antes de cumplir el tiempo
    }, [query, category, priceMin, priceMax, delayMs, translatedProducts]);

    return  searchedProducts
}


