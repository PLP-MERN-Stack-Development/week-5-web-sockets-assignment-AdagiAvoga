import ChatRoom from './pages/ChatRoom';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <ChatRoom />
      </UserProvider>
  );
}

export default App
