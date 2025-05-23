"use client"
import React from 'react'
import { useEffect } from 'react'

const MenuAnimation = () => {

    useEffect(() => {
    const container = document.querySelector(".container");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuContent = document.querySelector(".menu-content");
    const menuPreviewImg = document.querySelector(".menu-preview-img");
    const menuLinks = document.querySelectorAll(".link a");

    let isOpen = false;
    let isAnimating = false;

    menuToggle.addEventListener("click", ()=>{
        if (!isOpen) openMenu();
        else closeMenu();
    })

    function cleanupPreviewImages() {
        const previewImages = menuPreviewImg.querySelector("img");

        if(previewImages.length > 3){
            for (let i = 0; i < previewImages.length; i++) {
                menuPreviewImg.removeChild(previewImages[i]);            
            }
        }
    }

    function resetPreview() {
        menuPreviewImg.innerHTML="";
        const defaultPreviewImg = document.createElement("img");
        defaultPreviewImg.src = "img/1.jpg"
        menuPreviewImg.appendChild(defaultPreviewImg);
    }

    function animateMenuToggle(isOpening) {
        const open = document.querySelector("p#menu-open");
        const close = document.querySelector("p#menu-close");

        gsap.to(isOpening ? open : close, {
            x: isOpening ? -5 : 5,
            y: isOpening ? -10 : 10,
            rotation: isOpening ? -5 : 5,
            opacity: 0,
            delay: 0.25,
            duration: 0.5,
            ease: "power2.out"
        })

        gsap.to(isOpening ? close : open, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            delay: 0.5,
            duration: 0.5,
            ease: "power2.out"
        })
    }

    function openMenu() {
        if(isAnimating || isOpen) return;

        isAnimating = true;

        gsap.to(container, {
            rotation: 10,
            x: 300,
            y:450,
            scale: 1.5,
            duration: 1.25,
            ease: "power4.inOut"
        });

        animateMenuToggle(true);

        gsap.to(menuContent, {
            rotation: 0,
            x: 0,
            y:0,
            scale: 1,
            opacity: 1,
            duration: 1.25,
            ease: "power4.inOut"
        });

        gsap.to([".link a", ".social a"], {
            y: "0%",
            opacity: 1,
            duration: 1,
            delay: 0.75,
            stagger: 0.1,
            ease: "power3.out"
        });

        gsap.to(menuOverlay, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
            duration: 1.25,
            ease: "power4.inOut",
            onComplete: () => {
                isOpen = true;
                isAnimating = false;
            }
        })
    }

    function closeMenu() {
        if(isAnimating || !isOpen) return;

        isAnimating = true;

        gsap.to(container, {
            rotation: 0,
            x: 0,
            y:0,
            scale: 1,
            duration: 1.25,
            ease: "power4.inOut"
        });

        animateMenuToggle(false);

        gsap.to(menuContent, {
            rotation: -15,
            x: -100,
            y: -100,
            scale: 1.5,
            opacity: 0.25,
            duration: 1.25,
            ease: "power4.inOut"
        });

        gsap.to(menuOverlay, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.25,
            ease: "power4.inOut",
            onComplete: () => {
                isOpen = false;
                isAnimating = false;
                gsap.set([".link a", ".social a"], {
                    y: "125%"
                });
                resetPreview();
            }
        });
    }

    menuLinks.forEach((link) => {
        link.addEventListener("mouseover", (e) => {
            if(!isOpen || isAnimating) return;

            const imgSrc = e.target.getAttribute("data-img");
            if(!imgSrc) return;

            const previewImages = document.querySelectorAll("img");
            if(
                previewImages.length > 0 &&
                previewImages[previewImages.length - 1].src.endsWith(imgSrc)
            ) 
                return;

            const newPreviewImg = document.createElement("img");
            newPreviewImg.src = imgSrc;
            newPreviewImg.style.opacity = 1;
            newPreviewImg.style.transform = "scale(1) translateY(-50px)";

            menuPreviewImg.appendChild(newPreviewImg);
            cleanupPreviewImages();

            gsap.to(newPreviewImg, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        })
    })
    }, []);

  return (
    <>
    <nav>
        <div className="logo">
            <a href="#">DNYSUS</a>
        </div>
        <div className="menu-toggle">
            <p id="menu-open">Menu</p>
            <p id="menu-close">Close</p>
        </div>
    </nav>

    <div className="menu-overlay">
        <div className="menu-content">
            <div className="menu-items">
                <div className="col-lg">
                    <div className="menu-preview-img">
                        <img src="img/1.jpg" alt=""/>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="menu-links">                        
                        <div className="link">
                            <a href="#" data-img="img/5.jpg">Red</a>
                        </div>
                        <div className="link">
                            <a href="#" data-img="img/3.jpg">Pink</a>
                        </div>
                        <div className="link">
                            <a href="#" data-img="img/4.jpg">White</a>
                        </div>
                        <div className="link">
                            <a href="#" data-img="img/2.jpg">Purple</a>
                        </div>
                    </div>
                    <div className="menu-socials">
                        <div className="social">
                            <a href="mailto:anees.dev2002@gmail.com">Mail</a>
                        </div>
                        <div className="social">
                            <a href="https://github.com/anees-r">GitHub</a>
                        </div>
                        <div className="social">
                            <a href="https://www.linkedin.com/in/anees-r/">LinkedIn</a>
                        </div>  
                        <div className="social">
                            <a href="https://www.behance.net/anees101">Behance</a>
                        </div>                      
                    </div>
                </div>
            </div>
            <div className="menu-footer">
                <div className="col-lg">
                    <a href="#">Menu Animation</a>
                </div>
                <div className="col-sm">
                    <a href="#">Test</a>
                    <a href="#">Made by anees-r</a>
                </div>
            </div>
        </div>
    </div>

    <div className="container">
        <section className="hero">
            <div className="hero-img">
                <img src="img/6.jpg" alt=""/>
            </div>
            <h1>Photographs that feel like home.</h1>
        </section>
    </div>
    </>
  )
}

export default MenuAnimation
