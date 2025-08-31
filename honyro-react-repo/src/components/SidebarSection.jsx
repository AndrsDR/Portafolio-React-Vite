
import { Translate } from './Translate.jsx';


export function SidebarSection({ icon, label, action, translate }) {
    return (
        <li className="sidebar-item" onClick={action}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="sidebar-label">
                <Translate translate={translate}>
                    {label}
                </Translate>
            </span>
        </li>
    )
}