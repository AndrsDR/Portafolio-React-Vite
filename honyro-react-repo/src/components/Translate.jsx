// components/Translate.jsx
import { useTranslator } from '../hooks/translator';
import { useLanguage }  from '../context/LanguageContext.jsx';

export function Translate({ children}) {

    const { translate } = useLanguage();

    const { translatedText } = useTranslator({ text: children, translate });
    return <>{translatedText}</>;
    
}
