function Icon({ icon, fill }) {
    return (<i className={`icon bi bi-${icon}${fill ? "-fill" : ""}`}></i>)
}

export default Icon