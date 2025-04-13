import './Navbar.scss';
import {  Divider } from '@components/index';
import logo from "@assets/att-logo-black-transparent.png"
export const Navbar = () => {
    return (
        <nav className='Navbar'>
            <section className='Navbar__content'>
                    <section className='Navbar__logo' data-testid="navbar-logo-section">
                            <img src={logo} alt="logo AT&T" />
                            <Divider layout="vertical" />
                            <p>Fecha: <span>{new Date().toLocaleDateString()}</span></p>
                            </section>
                    <section className='Navbar__actions'>
                        <section className='Navbar__account'>
                            <section className='flex gap-1 cursor-pointer align-items-center'>
                                <p className='m-0 p-0' style={{ textAlign: "center"}}><span>Miguel Angel </span>- Sucursal La Canasta</p>
                            </section>
                        </section>
                </section>
            </section>
            
        </nav>
    )
}