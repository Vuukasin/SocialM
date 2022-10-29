import { useAuthUserQuery } from 'features/auth/authApiSlice'
import { FaAngleLeft } from 'react-icons/fa'
import { SidebarData } from './SidebarData'
import { NavLink } from 'react-router-dom'



const NavBar = (props) => {

    const { showHeader } = props
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useAuthUserQuery('authUser')


    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>
    } else if (isSuccess) {
        content =   <>
                        <div className="profile mb-5">
                            <div className="profile-photo-container mb-5">
                                <img className='profile-photo' src={user.avatar} alt='asd'/>
                            </div>
                            <h5 className='name'>{user.username} {user.username}</h5>
                            <p className='muted mb-3'>@{user.username}</p>
                            <div className='profile-stats'>
                                <div className="posts">
                                    <h4>{user.post_count}</h4>
                                    <p className="muted">Posts</p>
                                </div>
                                <div className="followers">
                                    <h4>{user.followers_count}</h4>
                                    <p className="muted">Followers</p>
                                </div>
                                <div className="following">
                                    <h4>{user.following_count}</h4>
                                    <p className="muted">Following</p>
                                </div>
                            </div>
                        </div>
                        <ul className='nav-menu-items ps-3'>
                        {SidebarData.map((item, index) => {
                            
                            return (
                                <li key={index} className={item.cName}>
                                    <NavLink activeclassname='active' to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>

                                    </NavLink>
                                    {item.count}
                                </li>
                            )
                        })}
                        <div className="hide-btn-container py-4">
                            <div className="line"></div>
                            <button onClick={showHeader} id="hide-header" className="indicator"><FaAngleLeft /></button>
                        </div>
                        </ul>
                    </>
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>
    }

    return (
      <>
      {content}
      </>
    )
}

export default NavBar