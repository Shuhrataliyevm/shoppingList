import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useGroups  from '../../../hooks/useGroups';

import './header.scss';

function Header() {
    const { logout } = useAuth();
    const [group, setGroup] = useState("");
    const { groups, groupsLoading, groupsError } = useGroups(group);

    console.log(groups);
    
    return (
        <div className="container">
            <div className="main-header">
                <div className="top-bar">
                    <div className="header-icons">
                        <img src="/public/icons/blog-solid (1).svg" alt="#" />
                        <button className='create-button'>
                            <img src="/public/icons/+.svg" alt="Add Person" />
                            <p>Create</p>
                        </button>
                    </div>
                    <form>
                        <div>
                            <div className="profules">
                                <div className='search'>
                                    <input type="text" value={group} onChange={(e) => setGroup(e.target.value)} placeholder='Search group and join ...' />
                                    {
                                        group.length > 0 && (
                                            <div className="content">
                                                {
                                                    groups?.map(groups => (
                                                        <p key={groups.id}>{groups.name}</p>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        { groupsLoading && <p>Loading...</p>}
                        { groupsError && <p style={{ color: 'red' }}>{groupsError.message}</p>}
                    </form>
                    <div className="action-icons">
                        <img src="/icons/notifict.svg" alt="Notifications" />
                        <img src="/icons/shop.svg" alt="Shop" />
                        <img src="/icons/nastroyka.svg" alt="Settings" />
                        <button
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            className='logout-btn'
                            onClick={logout}
                        >
                            <img src="/icons/logout.svg" alt="Logout" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
