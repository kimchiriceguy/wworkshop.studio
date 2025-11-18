import Navbar from './components/Navbar.jsx';
import './index.css';

function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-gray-600 text-white flex flex-col items-center justify-start p-52 gap-6">
        <h1 className="text-7xl  font-bold mb-4">
          wworkshop.studio
        </h1>
        <p className="text-base italic">asdjfasdkjf</p>
        <Navbar />
      </div>
    </>
  );
}

export default App;
