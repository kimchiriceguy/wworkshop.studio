import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getBlog, saveBlog } from '../firebase/services/blogService';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import Modal from '../components/Modal/Modal';
import Marquee from '../components/Marquee/Marquee';
import TopHeader from '../components/TopHeader/TopHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import '../components/Button/Button.css';
import '../components/FormInput/FormInput.css';
import '../components/Modal/Modal.css';
import '../components/Marquee/Marquee.css';
import '../components/TopHeader/TopHeader.css';
import '../components/Sidebar/Sidebar.css';
import './About.css';

function About() {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [blogContent, setBlogContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            const { data, error } = await getBlog('main');
            if (error) {
                // Only log non-blocked errors (ad blockers cause blocked errors)
                if (!error.includes('ERR_BLOCKED_BY_CLIENT') && !error.includes('offline')) {
                    console.error('Error fetching blog:', error);
                }
                // Default content on error
                setBlogContent(`
                    <h2>Welcome to WWORKSHOP STUDIO</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>Our Mission</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h3>Our Values</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                `);
            } else if (data) {
                setBlogContent(data.content || '');
            } else {
                // Default content if no blog exists
                setBlogContent(`
                    <h2>Welcome to WWORKSHOP STUDIO</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>Our Mission</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h3>Our Values</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                `);
            }
            setLoading(false);
        };

        fetchBlog();
    }, []);

    const handleEdit = () => {
        setEditTitle('About WWORKSHOP STUDIO');
        setEditContent(blogContent);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSave = async () => {
        const { error } = await saveBlog('main', editContent, editTitle);
        if (error) {
            alert('Error saving blog: ' + error);
            return;
        }
        setBlogContent(editContent);
        setIsEditing(false);
        setShowModal(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setShowModal(false);
    };

    return (
        <div className="about-page">
            <Marquee
                text="barbershop / school / consultancy /"
                speed={300}
            />
            <TopHeader
                logoSrc="./assets/logos/barberboy_alpha.png"
                logoAlt="wworkshop.studio Logo"
            />
            <Sidebar isOpen={true} onClose={() => { }} />

            <div className="container">
                <div className="about-header">
                    <img
                        src="/assets/logos/wworkshopstudio@2x.png"
                        alt="WWORKSHOP STUDIO Logo"
                        className="about-logo"
                    />
                    <h1 className="page-title">LOREM IPSUM</h1>
                    {isAdmin && (
                        <Button
                            variant="primary"
                            onClick={handleEdit}
                            className="edit-button"
                        >
                            EDIT BLOG
                        </Button>
                    )}
                </div>

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blogContent }}
                />

                <div className="about-info">
                    <div className="info-card">
                        <h3>LOREM</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="info-card">
                        <h3>IPSUM</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>Sed do eiusmod tempor incididunt ut labore.</p>
                    </div>
                    <div className="info-card">
                        <h3>DOLOR</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                </div>

                <div className="about-cta">
                    <Button variant="primary" onClick={() => navigate('/booking')}>
                        BOOK APPOINTMENT &gt;
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/services')} style={{ marginLeft: '1rem' }}>
                        VIEW SERVICES &gt;
                    </Button>
                </div>
            </div>

            {showModal && (
                <Modal
                    isOpen={showModal}
                    onClose={handleCancel}
                    title="Edit Blog Content"
                >
                    <div className="edit-form">
                        <FormInput
                            label="Title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            disabled
                        />
                        <FormInput
                            label="Content (HTML)"
                            type="textarea"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={10}
                        />
                        <div className="modal-buttons">
                            <Button variant="primary" onClick={handleSave}>
                                SAVE
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                CANCEL
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default About;
