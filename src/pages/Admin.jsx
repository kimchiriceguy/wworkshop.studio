import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InfiniteMarquee from '../components/InfiniteMarquee/InfiniteMarquee';
import '../components/InfiniteMarquee/InfiniteMarquee.css';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import Modal from '../components/Modal/Modal';
import Dropdown from '../components/Dropdown/Dropdown';
import '../components/Button/Button.css';
import '../components/FormInput/FormInput.css';
import '../components/Modal/Modal.css';
import '../components/Dropdown/Dropdown.css';
import './Admin.css';

function Admin() {
    const navigate = useNavigate();
    const { isAdmin, user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('blog');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [editingItem, setEditingItem] = useState(null);

    // Blog state
    const [blogContent, setBlogContent] = useState('');

    // Appointments state
    const [appointments, setAppointments] = useState([]);

    // Products state
    const [products, setProducts] = useState([]);
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    });

    // Orders state
    const [orders, setOrders] = useState([]);

    // Users state
    const [users, setUsers] = useState([]);
    const [userForm, setUserForm] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });

    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
            return;
        }

        // TODO: Replace with Firebase fetch
        const storedBlog = localStorage.getItem('aboutBlog');
        if (storedBlog) {
            const data = JSON.parse(storedBlog);
            setBlogContent(data.content || '');
        }

        const storedAppointments = localStorage.getItem('appointments');
        if (storedAppointments) {
            setAppointments(JSON.parse(storedAppointments));
        }

        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }

        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, [isAdmin, navigate]);

    // Blog functions
    const handleEditBlog = () => {
        setModalType('blog');
        setEditingItem({ content: blogContent });
        setShowModal(true);
    };

    const handleSaveBlog = () => {
        // TODO: Replace with Firebase save
        const data = {
            content: editingItem.content,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('aboutBlog', JSON.stringify(data));
        setBlogContent(editingItem.content);
        setShowModal(false);
    };

    // Appointment functions
    const handleEditAppointment = (appointment) => {
        setModalType('appointment');
        setEditingItem(appointment);
        setShowModal(true);
    };

    const handleDeleteAppointment = (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            const updated = appointments.filter(apt => apt.id !== id);
            setAppointments(updated);
            localStorage.setItem('appointments', JSON.stringify(updated));
        }
    };

    const handleSaveAppointment = () => {
        const updated = appointments.map(apt =>
            apt.id === editingItem.id ? editingItem : apt
        );
        setAppointments(updated);
        localStorage.setItem('appointments', JSON.stringify(updated));
        setShowModal(false);
    };

    // Product functions
    const handleAddProduct = () => {
        setModalType('product');
        setEditingItem(null);
        setProductForm({ name: '', price: '', description: '', image: '' });
        setShowModal(true);
    };

    const handleEditProduct = (product) => {
        setModalType('product');
        setEditingItem(product);
        setProductForm({
            name: product.name,
            price: product.price.toString(),
            description: product.description,
            image: product.image
        });
        setShowModal(true);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const updated = products.filter(prod => prod.id !== id);
            setProducts(updated);
            localStorage.setItem('products', JSON.stringify(updated));
        }
    };

    const handleSaveProduct = () => {
        if (editingItem) {
            // Update existing
            const updated = products.map(prod =>
                prod.id === editingItem.id
                    ? { ...editingItem, ...productForm, price: parseFloat(productForm.price) }
                    : prod
            );
            setProducts(updated);
            localStorage.setItem('products', JSON.stringify(updated));
        } else {
            // Add new
            const newProduct = {
                id: Date.now(),
                ...productForm,
                price: parseFloat(productForm.price)
            };
            const updated = [...products, newProduct];
            setProducts(updated);
            localStorage.setItem('products', JSON.stringify(updated));
        }
        setShowModal(false);
    };

    // User functions
    const handleAddUser = () => {
        setModalType('user');
        setEditingItem(null);
        setUserForm({ username: '', email: '', phone: '', password: '' });
        setShowModal(true);
    };

    const handleEditUser = (user) => {
        setModalType('user');
        setEditingItem(user);
        setUserForm({
            username: user.username || '',
            email: user.email || '',
            phone: user.phone || '',
            password: '' // Don't show password
        });
        setShowModal(true);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const updated = users.filter(u => u.id !== id);
            setUsers(updated);
            localStorage.setItem('users', JSON.stringify(updated));
        }
    };

    const handleSaveUser = () => {
        if (editingItem) {
            // Update existing
            const updated = users.map(u =>
                u.id === editingItem.id
                    ? { ...editingItem, ...userForm, ...(userForm.password && { password: userForm.password }) }
                    : u
            );
            setUsers(updated);
            localStorage.setItem('users', JSON.stringify(updated));
        } else {
            // Add new
            const newUser = {
                id: Date.now(),
                ...userForm,
                createdAt: new Date().toISOString()
            };
            const updated = [...users, newUser];
            setUsers(updated);
            localStorage.setItem('users', JSON.stringify(updated));
        }
        setShowModal(false);
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="admin-page">
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
                <div className="admin-header">
                    <h1 className="page-title">ADMIN PANEL</h1>
                    <div className="admin-actions">
                        <span className="admin-user">Welcome, {user?.displayName || user?.email}</span>
                        <Button variant="outline" onClick={logout}>
                            LOGOUT
                        </Button>
                    </div>
                </div>

                <div className="admin-tabs">
                    <button
                        className={`tab-button ${activeTab === 'blog' ? 'active' : ''}`}
                        onClick={() => setActiveTab('blog')}
                    >
                        BLOG
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appointments')}
                    >
                        APPOINTMENTS
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        PRODUCTS
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        ORDERS
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        USERS
                    </button>
                </div>

                <div className="admin-content">
                    {/* Blog Tab */}
                    {activeTab === 'blog' && (
                        <div className="tab-content">
                            <div className="content-header">
                                <h2>Blog Content</h2>
                                <Button variant="primary" onClick={handleEditBlog}>
                                    EDIT BLOG
                                </Button>
                            </div>
                            <div
                                className="blog-preview"
                                dangerouslySetInnerHTML={{ __html: blogContent }}
                            />
                        </div>
                    )}

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                        <div className="tab-content">
                            <h2>Appointments ({appointments.length})</h2>
                            <div className="table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Customer</th>
                                            <th>Barber</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((apt) => (
                                            <tr key={apt.id}>
                                                <td>{apt.id}</td>
                                                <td>{apt.customerName}</td>
                                                <td>{apt.barber}</td>
                                                <td>{apt.service}</td>
                                                <td>{apt.date}</td>
                                                <td>{apt.time}</td>
                                                <td>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleEditAppointment(apt)}
                                                        className="action-button"
                                                    >
                                                        EDIT
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleDeleteAppointment(apt.id)}
                                                        className="action-button delete"
                                                    >
                                                        DELETE
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {appointments.length === 0 && (
                                    <p className="empty-state">No appointments found.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="tab-content">
                            <div className="content-header">
                                <h2>Products ({products.length})</h2>
                                <Button variant="primary" onClick={handleAddProduct}>
                                    ADD PRODUCT
                                </Button>
                            </div>
                            <div className="products-list">
                                {products.map((product) => (
                                    <div key={product.id} className="product-item">
                                        <img src={product.image} alt={product.name} />
                                        <div className="product-info">
                                            <h3>{product.name}</h3>
                                            <p>${product.price}</p>
                                            <p>{product.description}</p>
                                        </div>
                                        <div className="product-actions">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleEditProduct(product)}
                                            >
                                                EDIT
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="delete"
                                            >
                                                DELETE
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {products.length === 0 && (
                                    <p className="empty-state">No products found.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="tab-content">
                            <h2>Orders ({orders.length})</h2>
                            <p className="empty-state">Orders feature coming soon. TODO: Implement with Firebase.</p>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="tab-content">
                            <div className="content-header">
                                <h2>Users ({users.length})</h2>
                                <Button variant="primary" onClick={handleAddUser}>
                                    ADD USER
                                </Button>
                            </div>
                            <div className="table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                                                <td>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleEditUser(user)}
                                                        className="action-button"
                                                    >
                                                        EDIT
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="action-button delete"
                                                    >
                                                        DELETE
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {users.length === 0 && (
                                    <p className="empty-state">No users found.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
          title={
            modalType === 'blog' ? 'Edit Blog' :
            modalType === 'appointment' ? 'Edit Appointment' :
            modalType === 'product' ? (editingItem ? 'Edit Product' : 'Add Product') :
            modalType === 'user' ? (editingItem ? 'Edit User' : 'Add User') :
            ''
          }
                >
                    {modalType === 'blog' && (
                        <div className="modal-form">
                            <FormInput
                                label="Content (HTML)"
                                type="textarea"
                                value={editingItem?.content || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                                rows={10}
                            />
                            <div className="modal-buttons">
                                <Button variant="primary" onClick={handleSaveBlog}>
                                    SAVE
                                </Button>
                                <Button variant="outline" onClick={() => setShowModal(false)}>
                                    CANCEL
                                </Button>
                            </div>
                        </div>
                    )}

                    {modalType === 'appointment' && editingItem && (
                        <div className="modal-form">
                            <FormInput
                                label="Customer Name"
                                value={editingItem.customerName || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, customerName: e.target.value })}
                            />
                            <FormInput
                                label="Email"
                                type="email"
                                value={editingItem.customerEmail || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, customerEmail: e.target.value })}
                            />
                            <FormInput
                                label="Phone"
                                type="tel"
                                value={editingItem.customerPhone || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, customerPhone: e.target.value })}
                            />
                            <Dropdown
                                label="Barber"
                                options={[
                                    { value: 'asterio', label: 'Asterio' },
                                    { value: 'dorothy', label: 'Dorothy' },
                                    { value: 'gylliane', label: 'Gylliane' },
                                    { value: 'martin', label: 'Martin' }
                                ]}
                                value={editingItem.barber}
                                onChange={(value) => setEditingItem({ ...editingItem, barber: value })}
                            />
                            <FormInput
                                label="Date"
                                type="date"
                                value={editingItem.date || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                            />
                            <FormInput
                                label="Time"
                                value={editingItem.time || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                            />
                            <div className="modal-buttons">
                                <Button variant="primary" onClick={handleSaveAppointment}>
                                    SAVE
                                </Button>
                                <Button variant="outline" onClick={() => setShowModal(false)}>
                                    CANCEL
                                </Button>
                            </div>
                        </div>
                    )}

                    {modalType === 'product' && (
                        <div className="modal-form">
                            <FormInput
                                label="Product Name"
                                value={productForm.name}
                                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            />
                            <FormInput
                                label="Price"
                                type="number"
                                value={productForm.price}
                                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            />
                            <FormInput
                                label="Description"
                                type="textarea"
                                value={productForm.description}
                                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                rows={4}
                            />
                            <FormInput
                                label="Image URL"
                                value={productForm.image}
                                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                            />
                            <div className="modal-buttons">
                                <Button variant="primary" onClick={handleSaveProduct}>
                                    SAVE
                                </Button>
                                <Button variant="outline" onClick={() => setShowModal(false)}>
                                    CANCEL
                                </Button>
                            </div>
                        </div>
                    )}

                    {modalType === 'user' && (
                        <div className="modal-form">
                            <FormInput
                                label="Username"
                                value={userForm.username}
                                onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                                required
                            />
                            <FormInput
                                label="Email"
                                type="email"
                                value={userForm.email}
                                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                required
                            />
                            <FormInput
                                label="Phone Number"
                                type="tel"
                                value={userForm.phone}
                                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                                required
                            />
                            <FormInput
                                label={editingItem ? "New Password (leave blank to keep current)" : "Password"}
                                type="password"
                                value={userForm.password}
                                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                                required={!editingItem}
                            />
                            <div className="modal-buttons">
                                <Button variant="primary" onClick={handleSaveUser}>
                                    SAVE
                                </Button>
                                <Button variant="outline" onClick={() => setShowModal(false)}>
                                    CANCEL
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
}

export default Admin;

