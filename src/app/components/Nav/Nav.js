"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import "./Nav.css";

const navItems = [
  { id: "homeOption", val: "Home", link: "/", icon: "/Home Page.png" },
  { id: "allplansOption", val: "All Plans", link: "/listofpolicies", icon: "/Select All.png" },
  { id: "comparisonOption", val: "Comparison", link: "/comparison", icon: "/comparisonscale.png" },
  { id: "aboutusOption", val: "About", link: "/aboutUs", icon: "/Info.png" },
  { id: "contactusOption", val: "Contact Us", link: "/locateUs", icon: "/Phone Bubble.png" },
];

export default function Nav() {
  useEffect(() => {
    const moreOptions = document.getElementById("moreOptions");
    const optionsCard = document.getElementById("optionsCard");

    let toggleNum = 1;
    moreOptions.addEventListener("click", () => {
      if (toggleNum === 1) {
        moreOptions.children[0].style.rotate = "45deg";
        moreOptions.children[0].style.transform = "translate(0, 1.6vh)";
        moreOptions.children[1].style.opacity = "0";
        moreOptions.children[2].style.rotate = "-45deg";
        moreOptions.children[2].style.transform = "translate(0, -1.6vh)";
        toggleNum = 0;
        optionsCard.classList.add("visible");
        optionsCard.classList.remove("hidden");
      } else {
        moreOptions.children[0].style.rotate = "0deg";
        moreOptions.children[0].style.transform = "translate(0, 0vh)";
        moreOptions.children[1].style.opacity = "1";
        moreOptions.children[2].style.rotate = "0deg";
        moreOptions.children[2].style.transform = "translate(0, 0vh)";
        toggleNum = 1;
        optionsCard.classList.remove("visible");
        optionsCard.classList.add("hidden");
      }
    });
  });

  return (
    <nav id="navBar-container">
      <div id="navBar">
        <div className="sideNav leftNav">
        <div className="logo">
        <a href="/">
    <img id="logo" src="/logo.png" alt="Logo" width={200} height={100} priority="true"/>
  </a>
</div>

        </div>
        <div className="sideNav rightNav">
          <div className="navItem">
            <div id="moreOptions">
              <div className="optionsBar"></div>
              <div className="optionsBar"></div>
              <div className="optionsBar"></div>
            </div>
          </div>
        </div>
      </div>

      <div id="optionsCard" className="hidden">
        {navItems.map((item) => (
          <Link key={item.id} href={item.link} className="optionsOption">
            <div className="optionImgContainer divElements">
              <img src={item.icon} alt={item.val} />
            </div>
            <span className="divElements spandiv">{item.val}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
