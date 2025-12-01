import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getBlog, saveBlog } from '../firebase/services/blogService';
import { getAllAppointments, updateAppointment, deleteAppointment } from '../firebase/services/appointmentService';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../firebase/services/productService';
import { getAllOrders, updateOrder, deleteOrder } from '../firebase/services/orderService';
import { getAllUsers, updateUser, deleteUser } from '../firebase/services/userService';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import Modal from '../components/Modal/Modal';
import Dropdown from '../components/Dropdown/Dropdown';
import Marquee from '../components/Marquee/Marquee';
import '../components/Button/Button.css';
import '../components/FormInput/FormInput.css';
import '../components/Modal/Modal.css';
import '../components/Dropdown/Dropdown.css';
import '../components/Marquee/Marquee.css';
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

        const fetchAllData = async () => {
            // Fetch blog
            const { data: blogData } = await getBlog('main');
            if (blogData) {
                setBlogContent(blogData.content || '');
            }

            // Fetch appointments
            const { data: appointmentsData } = await getAllAppointments();
            if (appointmentsData) {
                setAppointments(appointmentsData);
            }

            // Fetch products
            const { data: productsData } = await getAllProducts();
            if (productsData) {
                setProducts(productsData);
            }

            // Fetch orders
            const { data: ordersData } = await getAllOrders();
            if (ordersData) {
                setOrders(ordersData);
            }

            // Fetch users
            const { data: usersData } = await getAllUsers();
            if (usersData) {
                setUsers(usersData);
            }
        };

        fetchAllData();
    }, [isAdmin, navigate]);

    // Blog functions
    const handleEditBlog = () => {
        setModalType('blog');
        setEditingItem({ content: blogContent });
        setShowModal(true);
    };

    const handleSaveBlog = async () => {
        const { error } = await saveBlog('main', editingItem.content, 'About WWORKSHOP STUDIO');
        if (error) {
            alert('Error saving blog: ' + error);
            return;
        }
        setBlogContent(editingItem.content);
        setShowModal(false);
    };

    // Appointment functions
    const handleEditAppointment = (appointment) => {
        setModalType('appointment');
        setEditingItem(appointment);
        setShowModal(true);
    };

    const handleDeleteAppointment = async (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            const { error } = await deleteAppointment(id);
            if (error) {
                alert('Error deleting appointment: ' + error);
                return;
            }
            setAppointments(appointments.filter(apt => apt.id !== id));
        }
    };

    const handleSaveAppointment = async () => {
        const { error } = await updateAppointment(editingItem.id, editingItem);
        if (error) {
            alert('Error updating appointment: ' + error);
            return;
        }
        setAppointments(appointments.map(apt =>
            apt.id === editingItem.id ? editingItem : apt
        ));
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

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const { error } = await deleteProduct(id);
            if (error) {
                alert('Error deleting product: ' + error);
                return;
            }
            setProducts(products.filter(prod => prod.id !== id));
        }
    };

    const handleSaveProduct = async () => {
        const productData = {
            name: productForm.name,
            price: parseFloat(productForm.price),
            description: productForm.description,
            image: productForm.image,
            isAvailable: true
        };

        if (editingItem) {
            // Update existing
            const { error } = await updateProduct(editingItem.id, productData);
            if (error) {
                alert('Error updating product: ' + error);
                return;
            }
            setProducts(products.map(prod =>
                prod.id === editingItem.id ? { ...prod, ...productData } : prod
            ));
        } else {
            // Add new
            const { id, error } = await createProduct(productData);
            if (error) {
                alert('Error creating product: ' + error);
                return;
            }
            setProducts([...products, { id, ...productData }]);
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
            username: user.displayName || user.username || '',
            email: user.email || '',
            phone: user.phone || '',
            password: '' // Don't show password
        });
        setShowModal(true);
    };

    const handleDeleteUser = async (user) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const userId = user.id || user.uid;
            const { error } = await deleteUser(userId);
            if (error) {
                alert('Error deleting user: ' + error);
                return;
            }
            setUsers(users.filter(u => (u.id !== userId && u.uid !== userId)));
        }
    };

    const handleSaveUser = async () => {
        const userData = {
            displayName: userForm.username,
            email: userForm.email,
            phone: userForm.phone
        };

        if (editingItem) {
            // Update existing - use uid if id doesn't exist
            const userId = editingItem.id || editingItem.uid;
            const { error } = await updateUser(userId, userData);
            if (error) {
                alert('Error updating user: ' + error);
                return;
            }
            setUsers(users.map(u =>
                (u.id === userId || u.uid === userId) ? { ...u, ...userData } : u
            ));
        } else {
            // Note: Creating users should be done through Firebase Auth, not directly
            alert('User creation should be done through the sign-up process. This feature is for updating existing users.');
            return;
        }
        setShowModal(false);
    };

    // Order functions
    const handleDeleteOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            const { error } = await deleteOrder(orderId);
            if (error) {
                alert('Error deleting order: ' + error);
                return;
            }
            setOrders(orders.filter(order => order.id !== orderId));
        }
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="admin-page">
            <Marquee />

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
                                                <td>{apt.customerName || '-'}</td>
                                                <td>{apt.barberName || apt.barber || '-'}</td>
                                                <td>{apt.serviceName || apt.service || '-'}</td>
                                                <td>{apt.date?.toDate ? new Date(apt.date.toDate()).toLocaleDateString() : apt.date || '-'}</td>
                                                <td>{apt.time || '-'}</td>
                                                <td>{apt.status || 'confirmed'}</td>
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
                            <div className="table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>User</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.userId}</td>
                                                <td>{order.items?.length || 0} items</td>
                                                <td>${order.total?.toFixed(2) || '0.00'}</td>
                                                <td>{order.status || 'pending'}</td>
                                                <td>{order.createdAt?.toDate ? new Date(order.createdAt.toDate()).toLocaleDateString() : '-'}</td>
                                                <td>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleDeleteOrder(order.id)}
                                                        className="action-button delete"
                                                    >
                                                        DELETE
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {orders.length === 0 && (
                                    <p className="empty-state">No orders found.</p>
                                )}
                            </div>
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
                                                <td>{user.id || user.uid}</td>
                                                <td>{user.displayName || user.username || '-'}</td>
                                                <td>{user.email || '-'}</td>
                                                <td>{user.phone || '-'}</td>
                                                <td>{user.createdAt?.toDate ? new Date(user.createdAt.toDate()).toLocaleDateString() : user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
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
                                                        onClick={() => handleDeleteUser(user)}
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

