import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider, AuthRoute, NotAuthRoute } from './components/auth';
import Logout from './components/Logout';

import Profile from './components/PageProfile/Profile';
import Chats from './components/PageChats/Chats';
import Landing from './components/Landing';
import Register from './components/Register';
import Messages from './components/PageChats/Mesagge';
import Home from './components/PageHome/Home';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar/NavBar';

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					path="/"
					element={
						<NotAuthRoute>
							<Landing />
						</NotAuthRoute>
					}
				/>
				<Route
					path="/home"
					element={
						<AuthRoute>
							{/* <SideBar /> */}
							<NavBar />
							<Home />
						</AuthRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<AuthRoute>
							{/* <SideBar /> */}
							<NavBar />
							<Profile />
						</AuthRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<NotAuthRoute>
							<Register />
						</NotAuthRoute>
					}
				/>

				<Route
					path="/message"
					element={
						<AuthRoute>
							{/* <SideBar /> */}
							<NavBar />
							<Chats />
						</AuthRoute>
					}
				>
					<Route path=":idUser" element={<Messages />} />
				</Route>

				<Route
					path="/logout"
					element={
						<AuthRoute>
							{/* <SideBar /> */}
							<NavBar />
							<Logout />
						</AuthRoute>
					}
				/>
				<Route path="*" element={<p>Not found</p>} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
