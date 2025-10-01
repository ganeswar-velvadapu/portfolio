import React from 'react'

const HomeHero = ({text}) => {
    return (
        <div className="  md:flex-1 text-center lg:text-left max-w-full lg:max-w-2xl w-full ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-5 text-white px-2">
                Hello, I&apos;m Ganeswar Velvadapu
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light h-8 sm:h-10 md:h-12 px-2">
                {text}
                <span className="border-r-2 border-gray-400 animate-pulse ml-1"></span>
            </p>
        </div>
    )
}

export default HomeHero