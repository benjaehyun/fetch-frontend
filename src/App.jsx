import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites'; 
import Layout from './components/ui/Layout';

function App() {
  return (
    // Context provider for auth data 
    <AuthProvider>
		<Router>
			<Routes>
				{/* Route definitions */}
				<Route path="/login" element={<Login />} />
				{/* Parent component for pages handling ui layout */}
				<Route element={<Layout />}>
					<Route
					path="/"
					element={
						// Protected route wrapper ensuring auth status 
						<ProtectedRoute>
                            <Search />
						</ProtectedRoute>
					}
					/>
					<Route
					path="/favorites"
					element={
						<ProtectedRoute>
                            <Favorites />
						</ProtectedRoute>
					}
					/>
				</Route>
			</Routes>
		</Router>
    </AuthProvider>
  );
}

export default App;