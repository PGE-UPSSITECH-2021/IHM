import '../styles/MiddleResultScreen_v2.css'
import React, { useState, useEffect, useRef } from 'react'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import '../styles/bootstrapStyle.scss'
import returnArrow from "../assets/returnArrow.png"


function MiddleResultScreen({ setPageRes, nameFileRes, setNameFileRes }) {