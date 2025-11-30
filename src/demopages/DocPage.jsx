import './Docs.css'

const DocPage = ({ 
  title, 
  overview, 
  instructions = [], 
  props = [], 
  examples = [], 
  notes = [],
  onBack,
  demo
}) => {
  return (
    <div className="doc-page">
      <a 
        href="#" 
        className="back-link"
        onClick={(e) => {
          e.preventDefault()
          if (onBack) onBack()
        }}
      >
        ← Back to Components
      </a>
      <h1>{title}</h1>
      
      {overview && (
        <div className="demo-section">
          <h2>Overview</h2>
          <p>{overview}</p>
        </div>
      )}

      {demo && (
        <div className="demo-section">
          <h2>Live Demonstration</h2>
          <div className="live-demo">
            {demo}
          </div>
        </div>
      )}

      {instructions.length > 0 && (
        <div className="demo-section">
          <h2>Implementation Instructions</h2>
          {instructions.map((instruction, index) => (
            <div key={index} className="instruction">
              <h3>{instruction.title}</h3>
              {instruction.content && <p>{instruction.content}</p>}
              {instruction.code && (
                <div className="code-block">
                  <pre>{instruction.code}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {props.length > 0 && (
        <div className="demo-section">
          <h2>Props Documentation</h2>
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr key={index}>
                  <td>{prop.name}</td>
                  <td>{prop.type}</td>
                  <td>{prop.default || '-'}</td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {examples.length > 0 && (
        <div className="demo-section">
          <h2>Complete Example{examples.length > 1 ? 's' : ''}</h2>
          {examples.map((example, index) => (
            <div key={index}>
              {example.title && <h3 style={{ color: '#8400ff', marginTop: index > 0 ? '1rem' : '0' }}>{example.title}</h3>}
              <div className="code-block">
                <pre>{example.code}</pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {notes.length > 0 && (
        <div className="demo-section">
          <h2>Notes</h2>
          <ul>
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DocPage

