import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Collapse, Button, Modal, Input, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './CustomText.scss';

const { Panel } = Collapse;

function CustomText() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [password, setPassword] = useState('');
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const storedGroups = JSON.parse(localStorage.getItem('groups'));
        if (storedGroups) {
            setGroups(storedGroups);
        }
    }, []);

    const handleAddGroup = () => {
        if (groupName && password) {
            const newGroup = { name: groupName, password };
            const updatedGroups = [...groups, newGroup];
            setGroups(updatedGroups);
            localStorage.setItem('groups', JSON.stringify(updatedGroups)); // 🔹 Saqlash
            setGroupName('');
            setPassword('');
            setIsModalOpen(false);
        }
    };

    return (
        <div className="text-container">
            <NavLink className="profile-btn" to="/">
                <img src="/icons/profile-person.svg" alt="Profile" /> Profil
            </NavLink>
            <br />
            <Collapse accordion className="custom-accordion">
                <Panel header="Groups" key="1">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                        className="add-group-btn"
                    >
                        Add Group
                    </Button>
                    <Link to="/group">
                        <List
                            size="small"
                            bordered
                            dataSource={groups}
                            renderItem={(item) => <List.Item>{item.name}</List.Item>}
                            className="group-list"
                        />
                    </Link>
                </Panel>
            </Collapse>

            <Modal
                title="Add New Group"
                open={isModalOpen}
                onOk={handleAddGroup}
                onCancel={() => setIsModalOpen(false)}
                okText="Create"
                cancelText="Cancel"
            >
                <Input
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <Input.Password
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginTop: 10 }}
                />
            </Modal>

            <div className='new-container'></div>
        </div>
    );
}

export default CustomText;
