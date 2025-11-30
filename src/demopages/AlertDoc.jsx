import { useState } from 'react'
import DocPage from './DocPage'
import { Alert, Toast, Button } from '../../components'
import '../../components/Alert/Alert.css'
import '../../components/Button/Button.css'

const AlertDoc = ({ onBack }) => {
  const [alerts, setAlerts] = useState([])

  const showAlert = (type, message, title) => {
    const id = Date.now()
    setAlerts([...alerts, { id, type, message, title }])
  }

  const removeAlert = (id) => {
    setTimeout(() => {
      setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id))
    }, 0)
  }

  return (
    <>
      <DocPage
        title="Alert / Toast Component"
        onBack={onBack}
        overview="The Alert component displays notification messages with different types (success, error, warning, info). The Toast component is a convenience wrapper with auto-close enabled. Perfect for user feedback and notifications."
        demo={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#8400ff', marginBottom: '1rem' }}>Alert Types</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>

                <Button variant="primary" onClick={() => showAlert('success', 'Operation completed successfully!', 'Success')}>
                  Success
                </Button>

                <Button variant="secondary" onClick={() => showAlert('error', 'Something went wrong!', 'Error')}>
                  Error
                </Button>

                <Button variant="outline" onClick={() => showAlert('warning', 'Please check your input', 'Warning')}>
                  Warning
                </Button>

                <Button variant="ghost" onClick={() => showAlert('info', 'Here is some information', 'Info')}>
                  Info
                </Button>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              Click the buttons above to see different alert types. Alerts will appear in the top-right corner.
            </p>
          </div>
        }
        instructions={[
          {
            title: 'Step 1: Import the Component',
            code: `import { Alert, Toast } from './components';
import './components/Alert/Alert.css';`
          },
          {
            title: 'Step 2: Use the Component',
            code: `<Alert
  type="success"
  message="Operation completed!"
  title="Success"
  onClose={() => setShowAlert(false)}
/>`
          }
        ]}
        props={[
          { name: 'type', type: 'string', default: "'info'", description: "Alert type: 'success', 'error', 'warning', or 'info'" },
          { name: 'message', type: 'string', default: '-', description: 'Alert message text' },
          { name: 'title', type: 'string', default: '-', description: 'Optional alert title' },
          { name: 'onClose', type: 'function', default: '-', description: 'Close handler: () => void' },
          { name: 'autoClose', type: 'boolean', default: 'false', description: 'Automatically close after delay' },
          { name: 'autoCloseDelay', type: 'number', default: '5000', description: 'Auto-close delay in milliseconds' },
          { name: 'position', type: 'string', default: "'top-right'", description: "Position: 'top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'" },
          { name: 'showIcon', type: 'boolean', default: 'true', description: 'Show icon in alert' },
          { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' }
        ]}
        examples={[
          {
            code: `import { useState } from 'react';
import { Alert, Toast } from './components';

function App() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      <button onClick={() => setShowAlert(true)}>Show Alert</button>
      
      {showAlert && (
        <Alert
          type="success"
          message="Data saved successfully!"
          title="Success"
          onClose={() => setShowAlert(false)}
          autoClose={true}
          autoCloseDelay={3000}
        />
      )}

      {/* Toast with auto-close enabled by default */}
      <Toast
        type="info"
        message="New message received"
        position="top-right"
      />
    </div>
  );
}`
          }
        ]}
        notes={[
          'Alert is fixed positioned and appears above all content',
          'Toast is a convenience wrapper with autoClose enabled by default',
          'Multiple alerts can be displayed simultaneously',
          'Alerts automatically animate in and out',
          'Click the X button or wait for auto-close to dismiss'
        ]}
      />
      {alerts.map((alert, index) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          title={alert.title}
          onClose={() => removeAlert(alert.id)}
          autoClose={true}
          autoCloseDelay={3000}
          index={index}
        />
      ))}
    </>
  )
}

export default AlertDoc

