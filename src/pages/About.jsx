import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import InfiniteMarquee from '../components/InfiniteMarquee/InfiniteMarquee';
import '../components/InfiniteMarquee/InfiniteMarquee.css';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import Modal from '../components/Modal/Modal';
import '../components/Button/Button.css';
import '../components/FormInput/FormInput.css';
import '../components/Modal/Modal.css';
import './About.css';

function About() {
    const { isAdmin } = useAuth();
    const [blogContent, setBlogContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    // TODO: Replace with Firebase fetch
    useEffect(() => {
        const stored = localStorage.getItem('aboutBlog');
        if (stored) {
            const data = JSON.parse(stored);
            setBlogContent(data.content || '');
        } else {
            // Default content
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
    }, []);

    const handleEdit = () => {
        setEditTitle('About WWORKSHOP STUDIO');
        setEditContent(blogContent);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSave = () => {
        // TODO: Replace with Firebase save
        const data = {
            content: editContent,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('aboutBlog', JSON.stringify(data));
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
            <div className="marquee-banner">
        <InfiniteMarquee
          speed={25000}
          direction="right"
          gap="15px"
        >
          <span className="marquee-text">BARBERSHOP / SCHOOL / CONSULTANCY / </span>
          <span className="marquee-text">BARBERSHOP / SCHOOL / CONSULTANCY / </span>
        </InfiniteMarquee>
      </div>

            <div className="container">
                <div className="about-header">
                    <img
                        src="/assets/logos/wworkshopstudio@2x.png"
                        alt="WWORKSHOP STUDIO Logo"
                        className="about-logo"
                    />
                    <h1 className="page-title">ABOUT US</h1>
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
                        <h3>LOCATION</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="info-card">
                        <h3>HOURS</h3>
                        <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                    <div className="info-card">
                        <h3>CONTACT</h3>
                        <p>Email: info@wworkshop.studio</p>
                        <p>Phone: (555) 123-4567</p>
                    </div>
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
