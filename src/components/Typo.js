"use client"
import React, { useEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis';

function Typo() {
    useEffect(() => {
        // Initialize SplitType
        const text = new SplitType('.target');
        const chars = text.chars;

        // Initialize Lenis for smooth scrolling
        let lenis = new Lenis({
            lerp: 0.2,
            smooth: true,
        });

        lenis.on('scroll', () => ScrollTrigger.update());

        // Request animation frame loop for Lenis
        const scrollFn = (time) => {
            lenis.raf(time);
            requestAnimationFrame(scrollFn);
        };
        requestAnimationFrame(scrollFn);

        // GSAP animation setup
        gsap.registerPlugin(ScrollTrigger);

        chars.forEach(char => gsap.set(char.parentNode, { perspective: 1000 }));

        gsap.fromTo(chars, {
            opacity: 0.2,
            z: -800,
        }, {
            opacity: 1,
            z: 0,
            ease: 'back.out(1.2)',
            stagger: 0.04,
            scrollTrigger: {
                trigger: ".target",
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                onUpdate: self => self.update(),
            }
        });

        // Ensure ScrollTrigger updates on scroll
        ScrollTrigger.refresh();

    }, []);

    return (
        <div>
            <div className="absolute top-0 w-full h-screen flex justify-center items-center">Welcome Back!<span>
            <h1>Trying to learn GSAP animations with Next!</h1>
            </span>
           
            </div>
            
            <div className="flex flex-col w-screen relative px-8 py-6 mt-[750px]">
                <h2 className="content_title text-[8vw] leading-[0.8] text-center grid gap-8 ">
                    <span className="uppercase target text-[5rem]">DREAM BIG</span>
                    <span className="uppercase target">NEVER SETTLE</span>
                    <span className="uppercase target mb-[100px]">NEVER QUIT</span>
                </h2>
            </div>
            <div className="flex flex-col w-screen relative px-8 py-6 mb-[350px]">
                <p className="max-w-[660px] mx-auto my-6 text-[1.25rem] leading-normal">
                    Dreaming big inspires us to reach beyond our current circumstances, to imagine a future that exceeds our present reality. It's about setting audacious goals and believing in our ability to achieve them, regardless of the obstacles we may face along the way.
                </p>
            </div>
        </div>
    );
}

export default Typo;
