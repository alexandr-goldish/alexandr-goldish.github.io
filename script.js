const body = document.getElementById('body');
const companySlides = document.getElementById('company-slides');
const navigationBtnCompanySlider = document.getElementById('company-slider-navigation');
const usersSlider = document.getElementById('users-slider');
const navigationBtnUsersSlider = document.getElementById('users-slider-navigation');
const mainBlock = document.getElementById('main');
const milisecondCompanySliderAnimation = 5000;
const milisecondUsersSliderAnimation = 9000;
const arrowLeft = 'prev-slide';
const arrowRight = 'next-slide';
const tagNameNavigationCircle = 'div';
const classNameActive = 'active';
const classNameNoScroll = 'noscroll';
const classNameForFix = 'fixed';
const classNameForPaddingMain = 'padding-for-menu';

function checkDataValidation(e) {
    const inputCollection = e.target.parentNode.getElementsByTagName('input');

    Array.from(inputCollection).forEach(input => {
        let clearInputValue = input.value.replace(/\s/g, '');

        if (clearInputValue) {
            input.classList.remove('empty-input');
        } else {
            input.classList.add('empty-input');
        }
    })
}

function clearNavigationFormSliders(element) {
    let allNavigationBtn = element.getElementsByTagName(tagNameNavigationCircle);

    Array.from(allNavigationBtn).forEach(btn => btn.classList.remove(classNameActive));
}

function addOrRemoveDisabledForArrow(indexActiveSlide, countSlide) {
    const arrowLeftElement = document.getElementById(arrowLeft);
    const arrowRightElement = document.getElementById(arrowRight);
    const disabledClass = 'disabled';

    indexActiveSlide === 0 ? arrowLeftElement.classList.add(disabledClass) : arrowLeftElement.classList.remove(disabledClass);
    indexActiveSlide === countSlide ? arrowRightElement.classList.add(disabledClass) : arrowRightElement.classList.remove(disabledClass);
}

function initSwitchesSearchAnimationInHeader() {
    const timeSwitch = 5000;
    const switches = document.getElementById('switches');
    const btnList = switches.getElementsByTagName('button');
    const containerAnimations = document.getElementById('search-animation');
    const listAnimationBlock = containerAnimations.children;
    const nameDataAttribute = 'data-animation-section';
    let activeSwitch = 0;

    Array.from(btnList).forEach((switchBtn, index) => {
        switchBtn.addEventListener('click', (e) => {
            let eventElement = e.target;

            Array.from(btnList).forEach(link => {
                link.classList.remove(classNameActive);
            });

            activeSwitch = index;
            eventElement.classList.add(classNameActive);
            let dataAttributeCurrentBtn = eventElement.getAttribute(nameDataAttribute);

            clearInterval(switchTimer);

            Array.from(listAnimationBlock).forEach(animationBlock => {
                if (animationBlock.id === dataAttributeCurrentBtn) {
                    animationBlock.classList.add(classNameActive);
                } else {
                    animationBlock.classList.remove(classNameActive);
                }
            });

            switchTimer = setInterval(() => {
                Array.from(btnList).forEach(link => {
                    link.classList.remove(classNameActive);
                });

                if (activeSwitch === btnList.length - 1) {
                    activeSwitch = 0;
                } else {
                    activeSwitch++;
                }

                let currentBtn = btnList[activeSwitch];
                let dataAttributeCurrentBtn = currentBtn.getAttribute(nameDataAttribute);
                console.log(activeSwitch)
                currentBtn.classList.add(classNameActive);
                Array.from(listAnimationBlock).forEach(animationBlock => {
                    if (animationBlock.id === dataAttributeCurrentBtn) {
                        animationBlock.classList.add(classNameActive);
                    } else {
                        animationBlock.classList.remove(classNameActive);
                    }
                });
            }, timeSwitch);
        });
    });

    let firstElement = listAnimationBlock[0].getElementsByClassName('content-search')[0];
    firstElement.style.display = 'none';

    setTimeout(() => {
        firstElement.style.display = 'block';
    }, 2000);

    let switchTimer = setInterval(() => {
        Array.from(btnList).forEach(link => {
            link.classList.remove(classNameActive);
        });

        if (activeSwitch === btnList.length - 1) {
            activeSwitch = 0;
        } else {
            activeSwitch++;
        }

        let currentBtn = btnList[activeSwitch];
        let dataAttributeCurrentBtn = currentBtn.getAttribute(nameDataAttribute);

        currentBtn.classList.add(classNameActive);
        Array.from(listAnimationBlock).forEach(animationBlock => {
            if (animationBlock.id === dataAttributeCurrentBtn) {
                animationBlock.classList.add(classNameActive);
            } else {
                animationBlock.classList.remove(classNameActive);
            }
        });
    }, timeSwitch);
}

function initScrollEvent() {
    window.addEventListener('scroll', function(e) {
        const topHeader = document.getElementById('top-header');
        const topPositionForEditView = 200;
        const finalPositionForViewMenu = 500;
        const heightRemaining = document.documentElement.scrollHeight - pageYOffset - window.innerHeight;

        if (heightRemaining > finalPositionForViewMenu) {
            if (pageYOffset > topPositionForEditView) {
                mainBlock.classList.add(classNameForPaddingMain);
                topHeader.classList.add(classNameForFix);
            } else if (pageYOffset < topPositionForEditView) {
                mainBlock.classList.remove(classNameForPaddingMain);
                topHeader.classList.remove(classNameForFix);
                topHeader.style.opacity = 1;
            }

            if (pageYOffset > topPositionForEditView && pageYOffset < finalPositionForViewMenu) {
                const coefficientForOpacity = 100;

                topHeader.style.opacity = (pageYOffset - topPositionForEditView) / coefficientForOpacity;
            }

            if (pageYOffset > finalPositionForViewMenu) {
                topHeader.style.opacity = 1;
            }
        }
    });
}

function initEventOpenAndCloseMenu() {
    const btnOpenMenu = document.getElementById('open-menu');
    const btnCloseMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-nav');

    btnOpenMenu.addEventListener('click', () => {
        body.classList.add(classNameNoScroll);
        mobileMenu.classList.add(classNameActive);
    });

    btnCloseMenu.addEventListener('click', () => {
        body.classList.remove(classNameNoScroll)
        mobileMenu.classList.remove(classNameActive)
    });
}

function initEventsOnGetStarted() {
    const getStartedPopup = document.getElementById('get-started-popup');
    const classForOpenPopup = document.getElementsByClassName('open-get-started-popup');
    const btnClosePopup = document.getElementById('close-popup');
    const btnSubmitGetStarted = document.getElementById('submit-get-started');

    Array.from(classForOpenPopup).forEach(button => {
        button.addEventListener('click', () => {
            getStartedPopup.classList.add(classNameActive);
            body.classList.add(classNameNoScroll);
        })
    });

    btnClosePopup.addEventListener('click', () => {
        getStartedPopup.classList.remove(classNameActive);
        body.classList.remove(classNameNoScroll);
    });

    btnSubmitGetStarted.addEventListener('click', (e) => {
        checkDataValidation(e);
    });
}

function initEventsOnStepper() {
    const btnSubmitIndexingLink = document.getElementById('submit-start-index');
    const btnFirstStepIndexing = document.getElementById('first-step');
    const btnSecondStepIndexing = document.getElementById('second-step');
    const indexingForm = document.getElementById('indexing-form');
    const resultIndexingBlock = document.getElementById('result-javascript-code');

    btnSubmitIndexingLink.addEventListener('click', (e) => {
        e.preventDefault();
        checkDataValidation(e);
        indexingForm.classList.add('hide');
        resultIndexingBlock.innerText = 'КАКОЙ_ТО JS КОД, КОТОРЫЙ ПОЛУЧАЕТ';
        resultIndexingBlock.classList.add('show');
        btnSecondStepIndexing.classList.add(classNameActive);
    });

    btnFirstStepIndexing.addEventListener('click', () => {
        indexingForm.classList.remove('hide');
        resultIndexingBlock.classList.remove('show');
        btnSecondStepIndexing.classList.remove(classNameActive);
    });
}

function initSwipeForSlider(sliderContainer, navigationContainer) {
    let startTouch = 0;
    let endTouch = 0;
    let currentActive = 0;
    let startTime = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        startTouch = e.changedTouches[0];
        startTime = new Date().getTime();
    })

    sliderContainer.addEventListener('touchend', (e) => {
        const fixTimeSwipe = 500;
        const distance = 100;
        let swipeTime = new Date().getTime() - startTime;
        let click = new Event('click');

        endTouch = e.changedTouches[0];

        let differencePosition = startTouch.clientX - endTouch.clientX;

        if ((differencePosition > distance || differencePosition < -distance) && swipeTime < fixTimeSwipe) {
            const navigationBtn = navigationContainer.getElementsByTagName(tagNameNavigationCircle);

            Array.from(navigationBtn).forEach((btn, index) => {
                if (btn.classList.contains(classNameActive)) {
                    currentActive = differencePosition > 0 ? index + 1 : index - 1;
                }
            });
            navigationBtn[currentActive].dispatchEvent(click);
        }
    })
}

function initSlider(parentElement, className, navigationContainer, time, hasArrow = false) {
    const sliderChild = parentElement.getElementsByClassName(className);
    const widthOneSlide = sliderChild[0].offsetWidth;
    const countSlide = sliderChild.length;
    const fullSliderWidth = countSlide * widthOneSlide;
    const widthViewSection = parentElement.offsetWidth;
    const countNavigationBtn = Math.round(fullSliderWidth / widthViewSection);
    let activeSlide = 0;

    for (let i = 0; i <= countNavigationBtn - 1; i++) {

        let navigationBtn = document.createElement(tagNameNavigationCircle);

        if (i === activeSlide) {
            navigationBtn.classList.add(classNameActive);
        }

        navigationBtn.addEventListener('click', () => {
            let margin = (i === countNavigationBtn - 1) ? fullSliderWidth - widthViewSection : i * widthViewSection;

            clearNavigationFormSliders(navigationContainer);
            clearInterval(sliderTimer);
            activeSlide = i;
            navigationContainer.getElementsByTagName(tagNameNavigationCircle)[activeSlide].classList.add(classNameActive);
            parentElement.style.marginLeft = `-${margin}px`;

            sliderTimer = setInterval(() => {
                clearNavigationFormSliders(navigationContainer);

                let margin = 0;

                if (activeSlide === countNavigationBtn - 1) {
                    activeSlide = 0;
                } else {
                    activeSlide++;
                    margin = (activeSlide === countNavigationBtn - 1) ? fullSliderWidth - widthViewSection : activeSlide * widthViewSection;
                }

                if (hasArrow) {
                    addOrRemoveDisabledForArrow(activeSlide, countNavigationBtn - 1);
                }

                navigationContainer.getElementsByTagName(tagNameNavigationCircle)[activeSlide].classList.add(classNameActive);
                parentElement.style.marginLeft = `-${margin}px`;

            }, time);
        });

        navigationContainer.append(navigationBtn);
    }

    if (hasArrow) {
        const arrows = document.getElementsByClassName('slider-arrow');

        addOrRemoveDisabledForArrow(activeSlide, countNavigationBtn - 1);

        Array.from(arrows).forEach(arrow => {
            arrow.addEventListener('click', () => {
                if (activeSlide === 0 && arrow.id === arrowLeft || activeSlide === countNavigationBtn - 1 && arrow.id === arrowRight) {
                    return null;
                }
                activeSlide = arrow.id === 'next-slide' ? ++activeSlide : --activeSlide;
                addOrRemoveDisabledForArrow(activeSlide, countNavigationBtn - 1);
                let margin = (activeSlide === countNavigationBtn - 1) ? fullSliderWidth - widthViewSection : activeSlide * widthViewSection;

                clearNavigationFormSliders(navigationContainer);
                clearInterval(sliderTimer);
                navigationContainer.getElementsByTagName(tagNameNavigationCircle)[activeSlide].classList.add(classNameActive);
                parentElement.style.marginLeft = `-${margin}px`;

                sliderTimer = setInterval(() => {
                    clearNavigationFormSliders(navigationContainer);

                    let margin = 0;

                    if (activeSlide === countNavigationBtn - 1) {
                        activeSlide = 0;
                    } else {
                        activeSlide++;
                        margin = (activeSlide === countNavigationBtn - 1) ? fullSliderWidth - widthViewSection : activeSlide * widthViewSection;
                    }

                    addOrRemoveDisabledForArrow(activeSlide, countNavigationBtn - 1);

                    navigationContainer.getElementsByTagName(tagNameNavigationCircle)[activeSlide].classList.add(classNameActive);
                    parentElement.style.marginLeft = `-${margin}px`;

                }, time);
            });
        })
    }

    let sliderTimer = setInterval(() => {
        clearNavigationFormSliders(navigationContainer);

        let margin = 0;

        if (activeSlide === countNavigationBtn - 1) {
            activeSlide = 0;
        } else {
            activeSlide++;
            margin = (activeSlide === countNavigationBtn - 1) ? fullSliderWidth - widthViewSection : activeSlide * widthViewSection;
        }

        if (hasArrow) {
            addOrRemoveDisabledForArrow(activeSlide, countNavigationBtn - 1);
        }

        navigationContainer.getElementsByTagName(tagNameNavigationCircle)[activeSlide].classList.add(classNameActive);
        parentElement.style.marginLeft = `-${margin}px`;

    }, time);
}

initScrollEvent();
// initSlider(companySlides, 'slide', navigationBtnCompanySlider, milisecondCompanySliderAnimation);
// initSlider(usersSlider, 'slide', navigationBtnUsersSlider, milisecondUsersSliderAnimation, true);
// initSwipeForSlider(usersSlider, navigationBtnUsersSlider);
// initSwipeForSlider(companySlides, navigationBtnCompanySlider);
initSwitchesSearchAnimationInHeader();
initEventOpenAndCloseMenu();
initEventsOnGetStarted();
// initEventsOnStepper();