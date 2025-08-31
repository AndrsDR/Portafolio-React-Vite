export function HeaderSection({ icon = "html", action = () => {} }) {
    

    return (
        <>
        <span onClick={action} className="material-symbols-outlined">{icon}</span>
        </>
    )
}