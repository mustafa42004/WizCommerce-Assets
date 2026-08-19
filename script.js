/* MOBILE SIDEBAR */
jQuery(function ($) {
    const $sidebar = $('#mobileSidebar');
    const $overlay = $('#mobileSidebarOverlay');
    const $toggle = $('#mobileMenuToggle');
    const $toggleBtns = $sidebar.find('.mobile-nav-toggle');

    function openSidebar() {
        $sidebar.addClass('active');
        $overlay.addClass('active');
        $('body').addClass('sidebar-open');
        $toggle.attr('aria-expanded', 'true');
    }

    function closeSidebar() {
        $sidebar.removeClass('active');
        $overlay.removeClass('active');
        $('body').removeClass('sidebar-open');
        $toggle.attr('aria-expanded', 'false');
    }

    function toggleSidebar() {
        if ($sidebar.hasClass('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    // Toggle on hamburger click
    $toggle.on('click', toggleSidebar);

    // Close on overlay click
    $overlay.on('click', closeSidebar);

    // Close on ESC key
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') closeSidebar();
    });

    // Accordion sub-menus
    $toggleBtns.on('click', function () {
        const $btn = $(this);
        const $subMenu = $btn.siblings('.mobile-sub-menu');
        const isOpen = $btn.attr('aria-expanded') === 'true';


        $toggleBtns.not($btn).attr('aria-expanded', 'false');
        $sidebar.find('.mobile-sub-menu.open').each(function () {
            $(this).css('max-height', '0').removeClass('open');
        });


        if (!isOpen) {
            const scrollHeight = $subMenu[0].scrollHeight;
            $subMenu.css('max-height', scrollHeight + 'px').addClass('open');
            $btn.attr('aria-expanded', 'true');
        } else {
            $btn.attr('aria-expanded', 'false');
        }
    });
});

/* Tab Switcher */
jQuery(function ($) {
    $('.tab-grid').each(function () {
        const $grid = $(this);
        const $buttons = $grid.find('.tab-button');
        const $contents = $grid.find('.tab-content-cont > .tab-content');

        let activeIndex = $buttons.index($buttons.filter('.active'));

        if (activeIndex === -1) {
            activeIndex = 0;
            $buttons.removeClass('active').eq(0).addClass('active');
        }

        $contents.removeClass('active').eq(activeIndex).addClass('active');

        $buttons.on('click', function () {
            const index = $buttons.index(this);

            $buttons.removeClass('active');
            $(this).addClass('active');

            $contents.removeClass('active').eq(index).addClass('active');
        });
    });
});

// Sticky Tab Grid + Sticky Button Visibility
jQuery(function ($) {

    const gridStickyTop = 201;
    const buttonStickyTop = 118;

    const $grids = $('.tab-grid');
    const $stickyButtons = $('.tab-vis-button-cont .tab-vis-button');

    function updateStickyElements() {

        let activeIndex = 0;

        $grids.each(function (index) {

            const rect = this.getBoundingClientRect();

            if (rect.top <= gridStickyTop) {
                activeIndex = index;
            }

        });

        // Active grid
        $grids.removeClass('active')
            .eq(activeIndex)
            .addClass('active');

        // Active sticky button
        $stickyButtons.removeClass('active')
            .eq(activeIndex)
            .addClass('active');

        // Sticky button container visibility
        $('.tab-vis-buttons').each(function () {

            const rect = this.getBoundingClientRect();

            $(this)
                .find('.tab-vis-button-cont')
                .toggleClass('active', rect.top <= buttonStickyTop);

        });

    }

    updateStickyElements();

    $(window).on('scroll resize', updateStickyElements);

});

/* Industry Accordion */
jQuery(function ($) {
    $('.industry-accordion').each(function () {
        const $accordion = $(this);
        const $items = $accordion.find('.industry-item');

        $items.each(function (index) {
            const $item = $(this);
            const $drawer = $item.find('.industry-drawer');
            if ($item.hasClass('active')) {
                $drawer.show();
                $('.industry-images-col img').removeClass('active').eq(index).addClass('active');
            } else {
                $drawer.hide();
            }
        });

        $items.find('.industry-header').on('click', function (e) {

            if ($(e.target).closest('.logo-box').length) {
                return;
            }

            const $item = $(this).closest('.industry-item');
            const $drawer = $item.find('.industry-drawer');

            if ($item.hasClass('active')) {
                $item.removeClass('active');
                $drawer.slideUp();
            } else {
                $items.filter('.active').each(function () {
                    $(this).removeClass('active').find('.industry-drawer').slideUp();
                });
                $item.addClass('active');
                $drawer.slideDown();

                // Change active image
                const index = $items.index($item);
                $('.industry-images-col img').removeClass('active').eq(index).addClass('active');
            }
        });
    });
});

/* FAQ Accordion */
jQuery(function ($) {
    $('.faq-accordion').each(function () {
        const $accordion = $(this);
        const $items = $accordion.find('.faq-item');

        $items.each(function () {
            const $item = $(this);
            const $answer = $item.find('.faq-answer');
            if ($item.hasClass('active')) {
                $answer.show();
            } else {
                $answer.hide();
            }
        });

        $items.find('.faq-header').on('click', function () {
            const $item = $(this).closest('.faq-item');
            const $answer = $item.find('.faq-answer');

            if ($item.hasClass('active')) {
                $item.removeClass('active');
                $answer.slideUp();
            } else {
                $items.filter('.active').each(function () {
                    $(this).removeClass('active').find('.faq-answer').slideUp();
                });
                $item.addClass('active');
                $answer.slideDown();
            }
        });
    });
});


/* AI Tab Switcher & Accordion */
jQuery(function ($) {
    $('.ai-co-workers-sec').each(function () {
        const $section = $(this);
        const $buttons = $('.ai-tab-btn');
        const $contents = $('.ai-tab-content');
        const $desktopBtnsCont = $('.ai-tab-btns-container');
        const $contentsCont = $('.ai-tab-content-cont');

        let layoutMode = null;

        function initLayout() {
            const isMobile = window.innerWidth <= 767;
            const targetMode = isMobile ? 'mobile' : 'desktop';

            if (layoutMode !== targetMode) {
                layoutMode = targetMode;

                if (isMobile) {

                    $buttons.each(function (index) {
                        const $btn = $(this);
                        const $content = $contents.eq(index);
                        $contentsCont.append($btn);
                        $contentsCont.append($content);
                    });
                    $desktopBtnsCont.closest('.border-y').hide();


                    $contents.each(function () {
                        if ($(this).hasClass('active')) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                } else {

                    $desktopBtnsCont.closest('.border-y').show();
                    $buttons.each(function () {
                        $desktopBtnsCont.append($(this));
                    });
                    $contents.each(function () {
                        $contentsCont.append($(this));
                        if ($(this).hasClass('active')) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                }
            }
        }

        let activeIndex = $buttons.filter('.active').first().index();
        if (activeIndex === -1) {
            activeIndex = 0;
            $buttons.removeClass('active').eq(0).addClass('active');
            $contents.removeClass('active').eq(0).addClass('active');
        }

        initLayout();
        $(window).on('resize', initLayout);

        $buttons.on('click', function (e) {
            e.preventDefault();
            const index = $buttons.index(this);
            const isMobile = window.innerWidth <= 767;

            if (isMobile) {
                if ($(this).hasClass('active')) {
                    // Toggle close
                    $(this).removeClass('active');
                    $contents.eq(index).removeClass('active').slideUp();
                } else {
                    // Close others
                    $buttons.removeClass('active');
                    $contents.removeClass('active').slideUp();

                    // Open selected
                    $(this).addClass('active');
                    $contents.eq(index).addClass('active').slideDown();
                }
            } else {
                // Desktop tabs click
                if (!$(this).hasClass('active')) {
                    $buttons.removeClass('active');
                    $(this).addClass('active');

                    $contents.removeClass('active').hide();
                    $contents.eq(index).addClass('active').show();
                }
            }
        });
    });
});

/* Testimonial Tabs */
jQuery(function ($) {
    const $tabs = $('.testimonial-tab');
    const $contentCont = $('.testimonial-content-cont');
    const $contents = $contentCont.find('> .testimonial-content');
    const DURATION = 5000;

    let activeIndex = $tabs.filter('.active').first().index();
    if (activeIndex === -1) {
        activeIndex = 0;
        $tabs.removeClass('active').eq(0).addClass('active');
    }

    $contents.css({ position: 'absolute', top: 0, left: 0, width: '100%' });

    function setContainerHeight($el) {
        $contentCont.css('height', $el.outerHeight() + 'px');
    }

    $contents.removeClass('active').eq(activeIndex)
        .addClass('active').css({ left: '0%', position: 'relative' });
    setContainerHeight($contents.eq(activeIndex));

    let autoplayTimer = null;
    let isAnimating = false;

    function nextTab() {
        let nextIndex = (activeIndex + 1) % $tabs.length;
        switchTab(nextIndex);
    }

    function playProgressBar($tab) {
        const $bar = $tab.find('.tab-progress-bar');
        $bar.removeClass('running').css('width', '0%');
        $bar[0].offsetWidth; // force reflow

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                $bar.addClass('running');
            });
        });
    }

    function resetAllProgressBars() {
        $tabs.find('.tab-progress-bar').removeClass('running').css('width', '0%');
    }

    function switchTab(index) {
        if (index === activeIndex || $contents.length <= 1 || isAnimating) return;
        isAnimating = true;

        const goingForward = (index > activeIndex) || (activeIndex === $tabs.length - 1 && index === 0);
        const direction = goingForward ? 1 : -1;

        $tabs.removeClass('active');
        resetAllProgressBars();

        const $currentContent = $contents.eq(activeIndex);
        const $nextContent = $contents.eq(index);

        $nextContent
            .addClass('active')
            .css({ left: (direction * 100) + '%', position: 'absolute' });
        $nextContent[0].offsetHeight; // force reflow

        $contentCont.animate(
            { height: $nextContent.outerHeight() + 'px' },
            { duration: 450, easing: 'swing' }
        );

        $currentContent.css('position', 'absolute').animate(
            { left: (-direction * 100) + '%' },
            {
                duration: 450,
                easing: 'swing',
                complete: function () {
                    $currentContent.removeClass('active');
                }
            }
        );

        $nextContent.animate(
            { left: '0%' },
            {
                duration: 450,
                easing: 'swing',
                complete: function () {
                    $nextContent.css('position', 'relative');
                    isAnimating = false;
                }
            }
        );

        activeIndex = index;
        const $activeTab = $tabs.eq(activeIndex).addClass('active');
        playProgressBar($activeTab);

        resetAutoplay();
    }

    function resetAutoplay() {
        if (autoplayTimer) {
            clearTimeout(autoplayTimer);
        }
        if ($tabs.length > 1) {
            autoplayTimer = setTimeout(nextTab, DURATION);
        }
    }

    $tabs.on('click', function () {
        const index = $tabs.index(this);
        switchTab(index);
    });

    $(window).on('resize', function () {
        setContainerHeight($contents.eq(activeIndex));
    });

    // Start immediately on page load
    playProgressBar($tabs.eq(activeIndex));
    resetAutoplay();
});

/* FOOTER MENU ACCORDION (Mobile 767px and below) */
jQuery(function ($) {
    $('.footer-acc-head').on('click', function () {
        if (window.innerWidth > 767) return;

        const $head = $(this);
        const $item = $head.closest('.footer-acc-item');
        const $body = $item.find('.footer-acc-body');
        const isOpen = $item.hasClass('active');

        $('.footer-acc-item').not($item).removeClass('active').find('.footer-acc-body').css('max-height', '0');

        if (!isOpen) {
            $item.addClass('active');
            const scrollHeight = $body[0].scrollHeight + 20;
            $body.css('max-height', scrollHeight + 'px');
        } else {
            $item.removeClass('active');
            $body.css('max-height', '0');
        }
    });

    $(window).on('resize', function () {
        if (window.innerWidth > 767) {
            $('.footer-acc-item').removeClass('active');
            $('.footer-acc-body').css('max-height', '');
        }
    });
});