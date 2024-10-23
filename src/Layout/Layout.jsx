import { Outlet } from 'react-router-dom';
import NavbarTop from '../Shared/Navbar/NavbarTop';
import MenuBar from '../Shared/Navbar/MenuBar';
import { useContext } from 'react';
import { OrderContext } from '../ContextAPIs/OrderProvider';
import useSmallScreen from '../Hooks/useSmallScreen';
import Copyright from '../Shared/Footer/Copyright';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
	const { open, sidebarRef } = useContext(OrderContext);
	const [isSmallScreen] = useSmallScreen();

	return (
		<div className="bg-primary overflow-hidden">
			<div className="w-full h-screen justify-between mx-auto overflow-y-auto overflow-hidden flex ">
				<div className=" flex items-start w-full">
					<div
						ref={sidebarRef}
						className={`lg:relative fixed top-0 lg:top-0 ${
							open ? 'left-0' : '-left-[100%]'
						} duration-300 w-[308px] z-50 h-[calc(100vh)] overflow-y-auto`}
					>
						<MenuBar></MenuBar>
					</div>
					<div className="w-full">
						{isSmallScreen && open && (
							<div className="absolute top-0 left-0 w-full inset-0 bg-black opacity-50 z-20"></div>
						)}
						<NavbarTop />
						<div className="overflow-y-auto h-[calc(100vh-52px)]">
							<div className="min-h-[calc(100vh-130px)]">
								<Outlet />
							</div>
							<Copyright />
						</div>
					</div>
					<ToastContainer
						position="bottom-right"
						autoClose={1000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
						transition:Bounce
						bodyClassName="text-sm font-medium"
					/>
				</div>
			</div>
		</div>
	);
};

export default Layout;
