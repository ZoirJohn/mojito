import { useRef, useState } from 'react'
import { sliderLists } from '../../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Menu() {
        const [currentIndex, setCurrentIndex] = useState(0)
        function getCocktailAt(indexOffset: number) {
                return sliderLists[(currentIndex + indexOffset + sliderLists.length) % sliderLists.length]
        }
        function goToSlide(id: number) {
                const newIndex = (id + sliderLists.length) % sliderLists.length
                setCurrentIndex(newIndex)
        }
        const current = getCocktailAt(0)
        const previous = getCocktailAt(-1)
        const next = getCocktailAt(1)
        const contentRef = useRef(null!)
        useGSAP(() => {
                gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 })

                gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, { xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' })

                gsap.fromTo('.details h2', { opacity: 0, yPercent: 100 }, { yPercent: 0, opacity: 1, ease: 'power1.inOut' })

                gsap.fromTo('.details p', { opacity: 0, yPercent: 100 }, { yPercent: 0, opacity: 1, ease: 'power1.inOut' })
        }, [currentIndex])
        return (
                <section
                        id='menu'
                        aria-labelledby='menu-heading'
                >
                        <img
                                src='/images/slider-left-leaf.png'
                                alt='left-leaf'
                                id='m-left-leaf'
                        />
                        <img
                                src='/images/slider-right-leaf.png'
                                alt='right-leaf'
                                id='m-right-leaf'
                        />
                        <h2
                                id='menu-heading'
                                className='sr-only'
                        >
                                Cocktail Menu
                        </h2>
                        <nav
                                className='cocktail-tabs'
                                aria-label='Cocktail Navigation'
                        >
                                {sliderLists.map((cocktail, id) => {
                                        const isActive = id == currentIndex
                                        return (
                                                <button
                                                        key={cocktail.id}
                                                        className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
                                                        onClick={() => goToSlide(id)}
                                                >
                                                        {cocktail.name}
                                                </button>
                                        )
                                })}
                        </nav>
                        <div className='content'>
                                <div className='arrows'>
                                        <button
                                                className='text-left'
                                                onClick={() => goToSlide(currentIndex - 1)}
                                        >
                                                <span>{previous.name}</span>
                                                <img
                                                        src='/images/right-arrow.png'
                                                        alt='right-arrow'
                                                        aria-hidden='true'
                                                />
                                        </button>
                                        <button
                                                className='text-right'
                                                onClick={() => goToSlide(currentIndex + 1)}
                                        >
                                                <span>{next.name}</span>
                                                <img
                                                        src='/images/left-arrow.png'
                                                        alt='right-arrow'
                                                        aria-hidden='true'
                                                />
                                        </button>
                                </div>
                                <div className='cocktail'>
                                        <img
                                                src={current.image}
                                                alt='object-contain'
                                        />
                                </div>
                                <div className='recipe'>
                                        <div
                                                ref={contentRef}
                                                className='info'
                                        >
                                                <p>Recipe for:</p>
                                                <p id='title'>{current.name}</p>
                                        </div>
                                        <div className='details'>
                                                <h2>{current.title}</h2>
                                                <p>{current.description}</p>
                                        </div>
                                </div>
                        </div>
                </section>
        )
}
