import { Link } from "react-router-dom"

const Sike = () => {
    return (
        <div className="bg-primary flex flex-col items-center h-screen text-white pt-64">
            <h1>SIKE!</h1>
            <p>Gotchu 🤣</p>
            <p>alright fine home page is <Link to="/" className="underline">here</Link></p>
        </div>
    )
}

export default Sike