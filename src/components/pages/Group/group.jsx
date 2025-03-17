import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import "./group.scss";
import Header from "../Header/header";
import CustomText from "../CustomText/CustomText";
import useUsers from "../../../hooks/useUsers"; 
function Group() {
    const [groupName, setGroupName] = useState("");
    const [groups, setGroups] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberName, setMemberName] = useState("");
    
    const { users, isLoading, error } = useUsers(memberName); 
    useEffect(() => {
        const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        setGroups(storedGroups);
    }, []);

    const addGroup = () => {
        if (groupName.trim() !== "") {
            const newGroup = { id: Date.now(), name: groupName, members: [] };
            const updatedGroups = [...groups, newGroup];
            setGroups(updatedGroups);
            localStorage.setItem("groups", JSON.stringify(updatedGroups));
            setGroupName("");
        }
    };

    const deleteGroup = (id) => {
        const updatedGroups = groups.filter((groups) => groups.id !== id);
        setGroups(updatedGroups);
        localStorage.setItem("groups", JSON.stringify(updatedGroups));
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (memberName.trim() !== "") {
            const updatedGroups = [...groups];
            updatedGroups[0].members.push(memberName);
            setGroups(updatedGroups);
            localStorage.setItem("groups", JSON.stringify(updatedGroups));
            setMemberName("");
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Header />
            <CustomText />

            <div className="group-container">
                <h1 className="group-title">
                    Items <span className="group-count">{groups?.length || 0}</span>
                </h1>

                <div className="group-input">
                    <input
                        type="text"
                        placeholder="Title"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <button onClick={addGroup} className="add-btn">
                        <img src="/icons/+.svg" alt="Add" />
                    </button>
                </div>

                <div className="group-list">
                    {groups.length > 0 ? (
                        groups.map((groups) => (
                            <div key={groups.id} className="group-item">
                                <div className="avatar">
                                    <span className="avatar-image">{groups.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                    <span>
                                        {groups.name}
                                        <br />
                                        Created By {groups.name} ({new Date().toLocaleTimeString()}, {new Date().toLocaleDateString()})
                                    </span>
                                    <div className="group-actions">
                                        <button className="buy-btn">
                                            <img src="/icons/shop-cart.svg" alt="Buy" />
                                        </button>
                                        <button className="delete-btn" onClick={() => deleteGroup(groups.id)}>
                                            <img src="/icons/delets.svg" alt="Delete" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No groups added.</p>
                    )}
                </div>
            </div>

            <div className="AddPeople-container">
                <h1 className="group-titles">
                    Members <span className="group-counts">{users?.[0]?.members?.length || 0}</span>
                </h1>
                <Button className="news-btn" type="primary" onClick={showModal}>
                    <img src="/icons/profile-person.svg" alt="" /> Add Member
                </Button>
                <Modal  title="Add New Member" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <input 
                        className="member-input"
                        type="text"
                        placeholder="Enter member name"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                    />

                    {isLoading && <p>Loading...</p>}
                    {error && <p style={{ color: 'red' }}>{error.message}</p>}

                    {users.length > 0 && (
                        <div className="user-list">
                            {users.map((users) => (
                                <p key={users.id} onClick={() => setMemberName(users.name)}>
                                    {users.name}
                                </p>
                            ))}
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
}

export default Group;

