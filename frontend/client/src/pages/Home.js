// import Header from 'components/Header';
// import MainContent from 'components/MainContent';
import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import NavBar from 'components/NavBar';
import Feed from 'features/posts/Feed';
import ControlPanel from 'components/ControlPanel';

const Home = () => {


    const [header, setHeader] = useState(false)
    const showHeader = () => setHeader(!header)

    const content = (
        <div className="home">
            <header className={header ? 'header active' : 'header'} id='header'>
                <img className='logo my-4' src='http://127.0.0.1:8000/static/images/socialm-logo.svg' alt='asd'/>
                <nav className='navbar mx-4'>
                    <div className='subheader'>
                        <NavBar showHeader={showHeader} />
                    </div>
                </nav>
            </header>
            <main className={!header ? 'main rounded-0' : 'main'} id="main">
                <button onClick={showHeader}  id="show-header" className={!header ? 'show-header active mt-4 indicator' : 'show-header indicator mt-'}><FaAngleRight /></button>
                <div className='container my-4'>
                    <ControlPanel />
                    <Feed />
                </div>
            </main>
        </div>
    )
    return content
}

export default Home