import { Link } from "react-router-dom";

const Public = () => {

    const content = (
        <section>
        <header>
            <h1>Welcome to SocialM</h1>
        </header>
        <main>
            <Link to="/login">Login</Link>
        </main>
        </section>
    )
    return content

}

export default Public