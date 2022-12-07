import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';


export function Bar() {
    const { collapseSidebar } = useProSidebar();
    return (
        <div>
            <main>
                <button onClick={() => collapseSidebar()}>☰</button>
            </main>
            <Sidebar>
                <Menu>
                    <MenuItem routerLink={<Link to="/admin/users" />}> Usuarios </MenuItem>
                    <MenuItem routerLink={<Link to="/admin/products" />}> Productos</MenuItem>
                    <MenuItem routerLink={<Link to="/admin/invoices" />}> Facturas </MenuItem>
                    <MenuItem routerLink={<Link to="/admin/reviews" />}> Reseñas </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}
export default Bar
