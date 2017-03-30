function getViewNumber(req, page) {
    return parseInt((page || req.turn("page")) / 2 + 1, 10);
}

let pushToStateFlag = true;

$(document).ready(() => {
    function click(el) {
        el.contents().unbind("tap doubletap mouseover vmouseover mouseout vmouseout pinch mouseup vmouseup mousemove vmousemove swipe mousedown vmousedown drag touchstart touchmove touchend dragstart dragend dragover");
        if (Turn.isTouchDevice) {
            el.contents().bind("vmousedown vmouseover vmouseout vmouseup vmousemove", item => {
                item.pageX += el.offset().left;
                item.pageY += el.offset().top;
                $superbook.trigger(item);
            });
        } else {
            el.contents().bind("mouseover vmouseover mouseout vmouseout mouseup vmouseup mousemove vmousemove", item => {
                item.pageX += el.offset().left;
                item.pageY += el.offset().top;
                $(document).trigger(item);
            });
            el.contents().bind("mousedown vmousedown", item => {
                item.pageX += el.offset().left;
                item.pageY += el.offset().top;
                $superbook.trigger(item);
            });
        }
        $(".turnoff", $("iframe").contents()).on("touchend doubletap mouseover vmouseover mouseout vmouseout pinch mouseup vmouseup mousemove vmousemove swipe mousedown vmousedown drag touchstart touchmove dragstart dragend dragover", event => {
            event.stopPropagation();
        });

        $(".selectable", $("iframe").contents()).on("touchend doubletap mouseover vmouseover mouseout vmouseout pinch mouseup vmouseup mousemove vmousemove swipe mousedown vmousedown drag touchstart touchmove dragstart dragend dragover", event => {
            event.stopPropagation();
        });

        $("a", $("iframe").contents()).on("touchend doubletap mouseover vmouseover mouseout vmouseout pinch mouseup vmouseup mousemove vmousemove swipe mousedown vmousedown drag touchstart touchmove dragstart dragend dragover", dataAndEvents => false);
        if (Turn.isTouchDevice) {
            $("a.page", $("iframe").contents()).off().on("tap", function(dataAndEvents) {
                const matches = $(this).attr("href");
                $superbook.turn("page", matches);
                return false;
            });
            $("a:not(.page)", $("iframe").contents()).off().on("tap", function(dataAndEvents) {
                const url = $(this).attr("href");
                window.open(url, "_blank");
                return false;
            });
        } else {
            $("a:not(.page)", $("iframe").contents()).off().on(" click", function(dataAndEvents) {
                const url = $(this).attr("href");
                window.open(url, "_blank");
                return false;
            });
            $("a.page", $("iframe").contents()).off().on("click", function(dataAndEvents) {
                const matches = $(this).attr("href");
                $superbook.turn("page", matches);
                return false;
            });
        }
    }
    var $superbook = $("#superbook");

    $superbook.turn({
        pageWidth: 1115,
        pageHeight: 1443,
        autoCenter: true,
        responsive: true,
        display: "single",
        animatedAutoCenter: true,
        smartFlip: true,
        swipe: true,
        iframeSupport: true
    });

    $("iframe").each(function(dataAndEvents) {
        this.onload = function() {
            click($(this));
        };
    });
    const target = document.querySelector("#superbook");
    const mutationObserver = new MutationObserver(failures => {
        failures.forEach(record => {
            if (record.type === "childList") {
                if (record.addedNodes && (record.addedNodes.length > 0 && record.addedNodes[0].className === "page-wrapper")) {
                    const images = $(record.addedNodes[0]).find("iframe");
                    if (images.length > 0) {
                        images[0].onload = function() {
                            click($(this));
                        };
                    }
                }
            }
        });
    });
    const mutationConfig = {
        attributes: true,
        childList: true,
        characterData: true
    };
    if ($("#superbook").length) {
        mutationObserver.observe(target, mutationConfig);
    }
    if ($superbook.length > 0) {
        document.body.addEventListener("touchmove", types => {
            types.preventDefault();
        });
    }

    const id = $("#bookname").val();
    
    const s = Cookies.get(`${id}`);
    
    const page = $superbook.turn("page");
    const views = $superbook.turn("view");
    
    $superbook.turn("page", s);
    
    $superbook.bind("turned", (dataAndEvents, m1, deepDataAndEvents) => {
        Cookies.remove(`${id}`);
        Cookies.set(`${id}`, parseInt(m1));
    });
    
    if (Turn.isTouchDevice) {
        $("body .ui-arrow-next-page").on("tap", dataAndEvents => {
            $superbook.turn("next");
        });
        $("body .ui-arrow-previous-page").on("tap", dataAndEvents => {
            $superbook.turn("previous");
        });
    } else {
        $(".ui-arrow-next-page").on("click", dataAndEvents => {
            $superbook.turn("next");
        });
        $(".ui-arrow-previous-page").on("click", dataAndEvents => {
            $superbook.turn("previous");
        });
    }
    key("left, pageup, up", e => {
        e.preventDefault(e);
        $superbook.turn("previous");
    });
    key("right, pagedown, down, space", e => {
        e.preventDefault(e);
        $superbook.turn("next");
    });
    key("\u2318 + left, \u2318 + pageup, \u2318 + up, ctrl + left, ctrl + pageup, ctrl + up", e => {
        e.preventDefault(e);
        $superbook.turn("page", 1);
    });
    key("\u2318 + right, \u2318 + pagedown, \u2318 + down, ctrl + right, ctrl + pagedown, ctrl + down", e => {
        e.preventDefault(e);
        $superbook.turn("page", $superbook.turn("pages"));
    });
    let path = window.location.hash;
    let href = window.location.href;
    href = href.split('#')[0];
    const historyApi = !!(window.history && history.replaceState);
    if (historyApi) {
        if (path === "") {
            if (typeof s !== "undefined") {
                path = `#${s}`;
            } else {
                path = `#${1}`;
            }
        }
        history.replaceState(null, null, href + path);
        $superbook.turn("page", path.substring(1));
    }
    $superbook.bind("turning", (dataAndEvents, stepid, deepDataAndEvents) => {
        if (pushToStateFlag) {
            const shouldBeHash = `#${stepid}`;
            window.history.pushState("", "", href + shouldBeHash);
        }
        pushToStateFlag = true;
    });
    $(window).on("popstate", dataAndEvents => {
        const raw = window.location.hash;
        const num = `#${parseInt($superbook.turn("page"))}`;
        if (raw !== num) {
            pushToStateFlag = false;
            $superbook.turn("page", raw.substring(1));
        }
    });
});