(function() {
    var MegabladeNavigation = function($) {
        function addActiveClassForMainMenu(menu) {
            var selfActive = menu.parent().hasClass("active");
            if (window.technet.header.closeAll(),
            closeAll(),
            !selfActive) {
                menu.parent().removeClass("inactive").addClass("active");
                var $navContainer = $("#megabladeContainer #megabladeContainerCenter")
                  , $navMainMenu = $("#megabladeContainer #megabladeContainerCenter ul#megabladeItems")
                  , $navPage = $("#megabladeContainer #megabladeContainerCenter ul#megabladeItems li.bladeItemWithMenu div.navpage")
                  , isRtl = $("#megabladeContainer.rtl:visible").length > 0;
                if ($navPage.css("width", ""),
                !window.technet.header.currentDeviceType || window.technet.header.currentDeviceType() != window.technet.header.deviceTypes().desktop && window.technet.header.currentDeviceType() != window.technet.header.deviceTypes().tablet)
                    $navPage.attr("col", "1");
                else {
                    var containerLeft = $navContainer.offset().left, containerWidth = $navContainer.outerWidth(), mainMenuWidth = parseInt($navMainMenu.css("width"), 10), width;
                    width = isRtl ? containerLeft + containerWidth - mainMenuWidth : $(window).width() - containerLeft - mainMenuWidth;
                    width = Math.min(800, width);
                    $navPage.attr("col", "4");
                    width < 800 && (width = Math.min(619, width),
                    $navPage.attr("col", "3"));
                    width < 619 && (width = Math.min(419, width),
                    $navPage.attr("col", "2"));
                    width < 419 && (width = 219,
                    $navPage.attr("col", "1"));
                    $navPage.css("width", width + "px")
                }
                $(window).bind("resize", closeAllAndUnbind);
                $("html, body").bind("click", closeAllAndUnbind)
            }
        }
        function addActiveClassForSubNav($this, isToggle) {
            var selfActive = $this.parent().hasClass("active"), col, maxHeight, regEx, elements;
            if (selfActive) {
                isToggle && closeAllSubNavs();
                return
            }
            if (closeAllSubNavs(),
            $("li.bladeItemWithMenu .navpage .menuContainerLayout").css("height", ""),
            $("li.bladeItemWithMenu .navpage .menuContainerLayout h5").css("display", ""),
            $("li.bladeItemWithMenu .navpage").css("max-height", ""),
            !selfActive && ($this.parent().removeClass("inactive").addClass("active"),
            col = $("li.bladeItemWithMenu.active .navpage").attr("col"),
            col == 3 && (maxHeight = Math.max.apply(null , $("li.bladeItemWithMenu.active .navpage .menuContainerLayout:lt(3)").map(function() {
                return $(this).height()
            }).get()),
            $("li.bladeItemWithMenu.active .navpage .menuContainerLayout:lt(3)").css("height", maxHeight + "px")),
            col == 2 && (maxHeight = Math.max.apply(null , $("li.bladeItemWithMenu.active .navpage .menuContainerLayout:lt(2)").map(function() {
                return $(this).height()
            }).get()),
            $("li.bladeItemWithMenu.active .navpage .menuContainerLayout:lt(2)").css("height", maxHeight + "px")),
            col == 1 && (regEx = /&nbsp;/,
            elements = $("li.bladeItemWithMenu.active .navpage .menuContainerLayout h5").filter(function(index, ele) {
                if (regEx.test($(ele).html()))
                    return !0
            }),
            elements.length > 0 && elements.css("display", "none")),
            !!window.technet.header.currentDeviceType && window.technet.header.currentDeviceType() == window.technet.header.deviceTypes().mobile)) {
                var $liToggles = $("#megabladeContainer #megabladeContainerCenter #megabladeItems > li")
                  , liCount = $liToggles.length
                  , $button = $("#megabladeItems > li > a")
                  , occupiedHeight = liCount * $button.outerHeight() + $("#ux-header div.megabladeMenu").outerHeight()
                  , totalHeight = $(window).height();
                totalHeight > occupiedHeight && $("li.bladeItemWithMenu .navpage").css("max-height", totalHeight - occupiedHeight + "px")
            }
        }
        function closeMainMenu() {
            $toggleMainMenu.parent().addClass("inactive").removeClass("active")
        }
        function closeAllSubNavs() {
            $toggles.parent().addClass("inactive").removeClass("active")
        }
        function closeAll() {
            closeMainMenu();
            closeAllSubNavs()
        }
        function closeAllAndUnbind() {
            closeAll();
            $(window).unbind("resize", closeAllAndUnbind);
            $("html, body").unbind("click", closeAllAndUnbind)
        }
        window.technet = window.technet || {};
        window.technet.header = window.technet.header || {};
        window.technet.header.magabladeMenu = window.technet.header.magabladeMenu || {};
        window.technet.header.magabladeMenu.closeAll = function() {
            closeAll()
        }
        ;
        var $toggleMainMenu = $("#megabladeContainer #megabladeContainerCenter #megabladeMainMenu")
          , $toggles = $("#megabladeContainer #megabladeContainerCenter #megabladeItems li.bladeItemWithMenu > a")
          , $pannel = $("li.bladeItemWithMenu .navpage");
        $toggleMainMenu.length > 0 && $toggleMainMenu.click(function(e) {
            addActiveClassForMainMenu($toggleMainMenu);
            e.stopPropagation()
        });
        $toggles.length > 0 && $toggles.each(function() {
            $(this).bind("focus mouseover", function(e) {
                (!window.technet.header.currentDeviceType || window.technet.header.currentDeviceType() != window.technet.header.deviceTypes().desktop) && window.technet.header.currentDeviceType() != window.technet.header.deviceTypes().tablet || (addActiveClassForSubNav($(this), !1),
                e.stopPropagation())
            });
            $(this).bind("click", function(e) {
                !window.technet.header.currentDeviceType || window.technet.header.currentDeviceType() != window.technet.header.deviceTypes().mobile || addActiveClassForSubNav($(this), !0);
                e.stopPropagation()
            })
        });
        $pannel.length > 0 && $pannel.click(function(e) {
            e.stopPropagation()
        })
    }
    ;
    typeof define == "function" && window.mtpsAmd ? define("MegabladeNavigation", ["jquery"], function($) {
        return MegabladeNavigation($)
    }) : MegabladeNavigation($)
})();
;(function() {
    var searchBoxModule = function($) {
        window.Epx = window.Epx || {};
        window.Epx.Controls = window.Epx.Controls || {};
        Epx.Controls.SearchBox = function() {
            function contractSearch() {
                if (searchInMotion != !0 && $searchBox.width() != 0) {
                    searchInMotion = !0;
                    $searchBox.css("padding", "0");
                    var s = setInterval(function() {
                        curWidth -= shrinkWidthByMod;
                        shrinkWidthByMod *= widthAcceleration;
                        curWidth <= 0 && (curWidth = 0,
                        window.clearInterval(s),
                        searchInMotion = !1,
                        shrinkWidthByMod = widthMod);
                        $searchBox.css("width", curWidth + "px")
                    }, 10);
                    window.removeEventListener("click", contractSearch, !1);
                    window.removeEventListener("blur", contractSearch, !1);
                    window.removeEventListener("touchend", contractSearch, !1)
                }
            }
            function expandSearch() {
                if (searchInMotion != !0) {
                    searchInMotion = !0;
                    $searchBox.css("padding", "0 0 3px 6px");
                    var s = setInterval(function() {
                        curWidth += growWidthByMod;
                        growWidthByMod *= widthAcceleration;
                        curWidth >= maxWidthForSearchBox && (curWidth = maxWidthForSearchBox,
                        window.clearInterval(s),
                        searchInMotion = !1,
                        growWidthByMod = widthMod);
                        $searchBox.css("width", curWidth + "px")
                    }, 10);
                    window.addEventListener("click", contractSearch, !1);
                    window.addEventListener("blur", contractSearch, !1);
                    window.addEventListener("touchend", contractSearch, !1)
                }
            }
            function watermarkFocus(e, watermark) {
                $searchBox.val() == watermark && $searchBox.val("");
                isSearchCollapsedByDefault && expandSearch();
                $searchBoxDiv.addClass("SearchBoxOnFocus")
            }
            function watermarkBlur(e, watermark) {
                $searchBox.val().trim() == "" && ($searchBox.val(watermark),
                isSearchCollapsedByDefault && contractSearch(e));
                $searchBoxDiv.removeClass("SearchBoxOnFocus")
            }
            function searchBoxOnSubmit(control) {
                return $searchBox.val() != watermark && $searchBox.val() != "" ? (control.submit(),
                !0) : !1
            }
            var $searchBox, $searchBoxButton, $searchBoxDiv, isSearchCollapsedByDefault, $showHideButton, searchInMotion = !1, curWidth = 0, widthMod, widthAcceleration, growWidthByMod, shrinkWidthByMod, maxWidthForSearchBox;
            return $(document).ready(function() {
                var parametersForSearchAnimation, params;
                ($searchBox = $("#HeaderSearchTextBox"),
                $searchBoxDiv = $searchBox.parent().parent(),
                $showHideButton = $("#ShowSearchBoxButton"),
                $searchBoxButton = $("#HeaderSearchButton"),
                isSearchCollapsedByDefault = $showHideButton.length > 0,
                isSearchCollapsedByDefault) && (maxWidthForSearchBox = 220,
                widthMod = 45,
                widthAcceleration = .8,
                parametersForSearchAnimation = $("input#parametersForSearchAnimation").val(),
                parametersForSearchAnimation && (params = parametersForSearchAnimation.split(","),
                params.length == 3 && (maxWidthForSearchBox = parseInt(params[0], 10),
                widthMod = parseInt(params[1], 10),
                widthAcceleration = parseFloat(params[2], 10))),
                growWidthByMod = widthMod,
                shrinkWidthByMod = widthMod,
                $searchBoxButton.hide(),
                $showHideButton.show(),
                $showHideButton.click(function(event) {
                    $searchBox.width() == 0 ? $searchBox[0].focus() : $searchBox.val().trim() != "" ? $searchBoxButton.click() : contractSearch(event);
                    event.stopPropagation()
                }),
                $searchBox.click(function(event) {
                    event.stopPropagation()
                }))
            }),
            {
                watermarkFocus: watermarkFocus,
                watermarkBlur: watermarkBlur,
                searchBoxOnSubmit: searchBoxOnSubmit,
                contractSearch: contractSearch
            }
        }()
    }
    ;
    typeof define == "function" && window.mtpsAmd ? define("searchBox", ["jquery"], function($) {
        return searchBoxModule($)
    }) : searchBoxModule($)
})();
; (function () {
    function getParameterByName(name, url) {
        url || (url = window.location.href);
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
          , results = regex.exec(url);
        return results ? results[2] ? decodeURIComponent(results[2].replace(/\+/g, " ")) : "" : null
    }
    function showMessage(seconds) {
        document.getElementById("redirectInfo").innerHTML = document.getElementById("redirectInfo").innerHTML.replace(/\d+/, seconds)
    }
    function showError(error) {
        document.getElementById("redirectInfo").innerHTML = error
    }
    function parseUrl(url) {
        var r = {}
          , a = document.createElement("a");
        return a.href = url,
        ["protocol", "hostname", "port", "pathname", "search", "hash"].map(function (n) {
            r[n] = a[n]
        }),
        r
    }
    function strEndsWith(str, suffix) {
        return str.match(suffix + "$") == suffix
    }
    function isValidUrl(url, hostWhiteList) {
        for (var urlParts = parseUrl(url), i = 0; i < hostWhiteList.length; i++)
            if (strEndsWith(urlParts.hostname.toLowerCase(), hostWhiteList[i]))
                return !0;
        return !1
    }
    window.onload = function () {
        var hostWhiteList, redirectUrl, remainingSeconds;
        document.getElementById("redirectInfo") != null && (hostWhiteList = ["microsoft.com", "visualstudio.com", "github.com"],
        redirectUrl = getParameterByName("redirectUrl", window.location.href),
        redirectUrl && redirectUrl.length > 0 && (isValidUrl(redirectUrl, hostWhiteList) ? (document.getElementById("redirectInfo").innerHTML = document.getElementById("jumpInfo").innerHTML,
        remainingSeconds = 1,
        showMessage(remainingSeconds),
        setInterval(function () {
            remainingSeconds > 0 ? (remainingSeconds--,
            showMessage(remainingSeconds)) : remainingSeconds == 0 && (remainingSeconds--,
            window.location.href = redirectUrl)
        }, 1e3)) : showError('XSS and Open Redirect Vulnerability Error: "' + redirectUrl + '" is not in white list.')))
    }
})();
; (function () {
    var TechnetHeaderModule = function ($) {
        window.technet = window.technet || {};
        window.technet.header = window.technet.header || {};
        window.technet.header.closeAll = function () {
            closeAll()
        }
        ;
        window.technet.header.deviceTypes = function () {
            return deviceTypes
        }
        ;
        window.technet.header.currentDeviceType = function () {
            return currentDeviceType
        }
        ;
        var deviceTypes = {
            desktop: "desktop",
            tablet: "tablet",
            mobile: "mobile"
        }
          , windowWidth = 0
          , isTocElementsMoved = !1
          , isSearchElementsMoved = !1
          , currentDeviceType = deviceTypes.desktop
          , $toggles = $("#ux-header div#gripAndBrandLogo div#grip-menu")
          , $drawer = $("#ux-header .upperBand .row2 #drawer")
          , $searchToggle = $("#ux-header .upperBand .row2 #search-menu")
          , $searchPanel = $("#ux-header .upperBand .row3")
          , $settingToggle = $("#ux-header div.row1 .controls #setting-menu")
          , $settringPanel = $("#ux-header div.row1 .controls .controlsInternal")
          , tocElementsShouldMove = function () {
              return $("#ux-header div#gripAndBrandLogo div#grip-menu:visible").length > 0
          }
          , searchElementsShouldMove = function () {
              return $("#ux-header div#search-menu:visible").length > 0
          }
          , moveTocElements = function (restoreOriginalPosition) {
              restoreOriginalPosition ? $("#ux-header .upperBand .row2 #drawer > a").appendTo($("#ux-header .lowerBand .toclevel1")) : $("#ux-header .lowerBand .toclevel1 > a").appendTo($("#ux-header .upperBand .row2 #drawer"));
              isTocElementsMoved = !restoreOriginalPosition
          }
          , moveSearchElements = function (restoreOriginalPosition) {
              restoreOriginalPosition ? $("#ux-header .upperBand .row3 .SearchBox").insertAfter($("#ux-header .upperBand .row2 #search-menu")) : $("#ux-header .upperBand .row2 .SearchBox").appendTo($("#ux-header .upperBand .row3"));
              isSearchElementsMoved = !restoreOriginalPosition
          }
          , toggleMenu = function () {
              var selfActive = $drawer.css("display") == "block";
              window.technet.header.magabladeMenu.closeAll();
              closeAll();
              selfActive || ($drawer.css("display", "block"),
              $toggles.removeClass("inactive").addClass("active"),
              $(window).bind("resize", closeMenuAndUnBind),
              $("html, body").bind("click", closeMenuAndUnBind))
          }
          , toggleSearchMenu = function () {
              var selfActive = $searchPanel.css("display") == "block";
              window.technet.header.magabladeMenu.closeAll();
              closeAll();
              selfActive ? closeSearchBar() : ($searchPanel.css("display", "block"),
              $searchToggle.removeClass("inactive").addClass("active"))
          }
          , toggleSettingMenu = function () {
              var selfActive = $settringPanel.css("display") == "block";
              window.technet.header.magabladeMenu.closeAll();
              closeAll();
              selfActive || ($settringPanel.css("display", "block"),
              $settingToggle.removeClass("inactive").addClass("active"),
              $(window).bind("resize", closeMenuAndUnBind),
              $("html, body").bind("click", closeMenuAndUnBind))
          }
          , closeSearchBar = function () {
              $searchPanel.css("display", "none");
              $searchToggle.removeClass("active").addClass("inactive")
          }
          , closeAll = function () {
              $drawer.css("display", "none");
              $toggles.removeClass("active").addClass("inactive");
              currentDeviceType == deviceTypes.mobile && ($settringPanel.css("display", ""),
              $settingToggle.removeClass("active").addClass("inactive"))
          }
          , closeMenuAndUnBind = function () {
              closeAll();
              $(window).unbind("resize", closeMenuAndUnBind);
              $("html, body").unbind("click", closeMenuAndUnBind)
          }
          , resize = function () {
              isTocElementsMoved != tocElementsShouldMove() && moveTocElements(isTocElementsMoved);
              isSearchElementsMoved != searchElementsShouldMove() && (closeSearchBar(),
              moveSearchElements(isSearchElementsMoved));
              currentDeviceType = isTocElementsMoved ? isSearchElementsMoved ? deviceTypes.mobile : deviceTypes.tablet : deviceTypes.desktop;
              $("#ux-header").attr("data-device-type", currentDeviceType)
          }
          , init = function () {
              $toggles.length > 0 && $toggles.click(function (e) {
                  toggleMenu();
                  e.stopPropagation()
              });
              $searchToggle.length > 0 && $searchToggle.click(function (e) {
                  toggleSearchMenu();
                  e.stopPropagation()
              });
              $settingToggle.length > 0 && $settingToggle.click(function (e) {
                  toggleSettingMenu();
                  e.stopPropagation()
              });
              $(window).resize(function () {
                  windowWidth != $(window).width() && (resize(),
                  windowWidth = $(window).width())
              });
              resize();
              windowWidth = $(window).width()
          }
        ;
        $(document).ready(function () {
            init()
        })
    }
    ;
    typeof define == "function" && window.mtpsAmd ? define("TechnetHeader", ["jquery"], function ($) {
        return TechnetHeaderModule($)
    }) : TechnetHeaderModule($)
})();
;