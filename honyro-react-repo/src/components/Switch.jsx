import './Switch.css'

export function Switch({
    checked,
    onChange,
    className = '',
}) {
    return (
        <label className={`switch ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                id={`${className}-input`}
            />
            <span className={`slider`}></span>
        </label>
    );
}
