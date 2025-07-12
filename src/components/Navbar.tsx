import { useGSAP } from '@gsap/react'
import { navLinks } from '../../constants'
import gsap from 'gsap'

export default function Navbar() {
        useGSAP(() => {
                const navTween = gsap.timeline({
                        scrollTrigger: {
                                trigger: 'nav',
                                start: 'bottom top',
                        },
                })
                navTween.fromTo('nav', { backgroundColor: 'transparent' }, { backgroundColor: '#00000050', backgroundFilter: 'blur(10px)', duration: 1, ease: 'power1.inOut' })
        }, [])
        return (
                <nav>
                        <div>
                                <a
                                        href='#home'
                                        className='flex items-center gap-2'
                                >
                                        <img
                                                src='/images/logo.png'
                                                alt='Logo'
                                        />
                                        <p>Velvet Pour</p>
                                </a>
                                <ul>
                                        {navLinks.map((link, id) => (
                                                <li key={id}>
                                                        <a href={`#${link.id}`}>{link.title}</a>
                                                </li>
                                        ))}
                                </ul>
                        </div>
                </nav>
        )
}
