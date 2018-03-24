/*
 * Ken Burns Sliders Full Collection  v1.0
 *
 * Copyright 2012, LambertGroup
 * 
 */

(function (d) {
	function S(a, b, g) {
		g.responsive && (newCss = "", -1 != a.css("font-size").lastIndexOf("px") ? (fontSize = a.css("font-size").substr(0, a.css("font-size").lastIndexOf("px")), newCss += "font-size:" + fontSize / (g.origWidth / g.width) + "px;") : -1 != a.css("font-size").lastIndexOf("em") && (fontSize = a.css("font-size").substr(0, a.css("font-size").lastIndexOf("em")), newCss += "font-size:" + fontSize / (g.origWidth / g.width) + "em;"), -1 != a.css("line-height").lastIndexOf("px") ? (lineHeight = a.css("line-height").substr(0, a.css("line-height").lastIndexOf("px")), newCss += "line-height:" + lineHeight / (g.origWidth / g.width) + "px;") : -1 != a.css("line-height").lastIndexOf("em") && (lineHeight = a.css("line-height").substr(0, a.css("line-height").lastIndexOf("em")), newCss += "line-height:" + lineHeight / (g.origWidth / g.width) + "em;"), a.wrapInner('<div class="newFS" style="' + newCss + '" />'));
		var f = a.attr("data-final-left"),
		e = a.attr("data-final-top");
		g.responsive && (f = parseInt(f / (g.origWidth / g.width), 10), e = parseInt(e / (g.origWidth / g.width), 10));
		g = 1; ! 0 == b.isVideoPlaying && (g = 0);
		a.animate({
			opacity: g,
			left: f + "px",
			top: e + "px"
		},
		1E3 * a.attr("data-duration"), function () {
			b.isVideoPlaying == true && d(b.currentImg.attr("data-text-id")).children().css("opacity", 0)
		})
	}
	function J(a, b) {
		d(a.currentImg.attr("data-text-id")).css("display", "block");
		var g = d(a.currentImg.attr("data-text-id")).children(),
		f = 0;
		currentText_arr = [];
		g.each(function () {
			currentText_arr[f] = d(this);
			var e = currentText_arr[f].attr("data-initial-left"),
			g = currentText_arr[f].attr("data-initial-top");
			b.responsive && (e = parseInt(e / (b.origWidth / b.width), 10), g = parseInt(g / (b.origWidth / b.width), 10));
			currentText_arr[f].css({
				left: e + "px",
				top: g + "px",
				opacity: parseInt(currentText_arr[f].attr("data-fade-start"), 10) / 100
			});
			var m = currentText_arr[f];
			setTimeout(function () {
				S(m, a, b)
			},
			1E3 * currentText_arr[f].attr("data-delay"));
			f++
		})
	}
	function K(a, b, g, f, e) { - 1 == a && (a = 0);
		var j = d(e[a]),
		e = b.horizontalPosition;
		void 0 != j.attr("data-horizontalPosition") && "" != j.attr("data-horizontalPosition") && (e = j.attr("data-horizontalPosition"));
		var m = b.verticalPosition;
		void 0 != j.attr("data-verticalPosition") && "" != j.attr("data-verticalPosition") && (m = j.attr("data-verticalPosition"));
		var h = b.initialZoom;
		void 0 != j.attr("data-initialZoom") && "" != j.attr("data-initialZoom") && (h = Number(j.attr("data-initialZoom")));
		var l = b.finalZoom;
		void 0 != j.attr("data-finalZoom") && "" != j.attr("data-finalZoom") && (l = Number(j.attr("data-finalZoom")));
		f = f[a].split(";");
		b.responsive && (f[0] /= b.origWidth / b.width, f[1] /= b.origWidth / b.width);
		b.width100Proc && b.height100Proc && f[1] * Math.min(l, h) < b.height && (newH = b.height / Math.min(l, h), newW = newH * (f[0] / f[1]), f[0] = newW, f[1] = newH);
		a = d("#contentHolderUnit_" + a, g).find("img:first");
		parseInt(l * f[0], 10);
		parseInt(l * f[1], 10);
		a.css({
			width: parseInt(h * f[0], 10) + "px",
			height: parseInt(h * f[1], 10) + "px"
		});
		g = 0;
		switch (e) {
		case "left":
			g = 0;
			break;
		case "center":
			g = (b.width - parseInt(h * f[0], 10)) / 2;
			break;
		case "right":
			g = b.width - parseInt(h * f[0], 10);
			break;
		default:
			g = 0
		}
		l = 0;
		switch (m) {
		case "top":
			l = -2;
			break;
		case "center":
			l = (b.height - parseInt(h * f[1], 10)) / 2;
			break;
		case "bottom":
			l = b.height - parseInt(h * f[1], 10) + 2;
			break;
		default:
			l = 0
		}
		a.css({
			left: parseInt(g, 10) + "px",
			top: parseInt(l, 10) + "px",
			opacity: b.initialOpacity
		});
		d.browser.msie || a.css({
			"-webkit-transform-origin": e + " " + m,
			"-moz-transform-origin": e + " " + m,
			"-o-transform-origin": e + " " + m,
			"transform-origin": e + " " + m
		})
	}
	function I(a) {
		d.browser.msie ? (clearInterval(a.msiInterval), a.current_imgInside.css("filter", 'progid:DXImageTransform.Microsoft.Matrix(FilterType="bilinear",M11=1, M12=0, M21=0, M22=1, Dx=0, Dy=0)')) : a.current_imgInside.css({
			"-webkit-transition-duration": "0s",
			"-moz-transition-duration": "0s",
			"-o-transition-duration": "0s",
			"transition-duration": "0s",
			"-webkit-transform": "scale(1)",
			"-moz-transform": "scale(1)",
			"-o-transform": "scale(1)",
			transform: "scale(1)"
		})
	}
	function L(a, b, g, f, e) {
		var e = d(e[a.current_img_no]),
		j = b.horizontalPosition;
		void 0 != e.attr("data-horizontalPosition") && "" != e.attr("data-horizontalPosition") && (j = e.attr("data-horizontalPosition"));
		var m = b.verticalPosition;
		void 0 != e.attr("data-verticalPosition") && "" != e.attr("data-verticalPosition") && (m = e.attr("data-verticalPosition"));
		var h = b.duration;
		void 0 != e.attr("data-duration") && "" != e.attr("data-duration") && (h = Number(e.attr("data-duration")));
		var l = b.initialZoom;
		void 0 != e.attr("data-initialZoom") && "" != e.attr("data-initialZoom") && (l = Number(e.attr("data-initialZoom")));
		var n = b.finalZoom;
		void 0 != e.attr("data-finalZoom") && "" != e.attr("data-finalZoom") && (n = Number(e.attr("data-finalZoom")));
		a.current_imgInside = d("#contentHolderUnit_" + a.current_img_no, g).find("img:first");
		var k = f[a.current_img_no].split(";");
		b.responsive && (k[0] /= b.origWidth / b.width, k[1] /= b.origWidth / b.width);
		d.browser.msie ? (b.width100Proc && (h += b.durationIEfix), curZoom = 1, cur_marginTop = cur_marginLeft = zoomStep = 0, a.msiInitialTime = (new Date).getTime(), a.msiInterval = setInterval(function () {
			nowx = (new Date).getTime();
			if (nowx - a.msiInitialTime > h * 1E3) clearInterval(a.msiInterval);
			else {
				zoomStep = (nowx - a.msiInitialTime) * Math.abs(l - n) / (h * 1E3);
				curZoom = l <= n ? 1 + zoomStep: 1 - zoomStep;
				j == "center" ? cur_marginLeft = (1 - curZoom) * l * k[0] / 2 : j == "right" && (cur_marginLeft = (1 - curZoom) * l * k[0]);
				m == "center" ? cur_marginTop = (1 - curZoom) * l * k[1] / 2 : m == "bottom" && (cur_marginTop = (1 - curZoom) * l * k[1]);
				a.current_imgInside.css({
					filter: 'progid:DXImageTransform.Microsoft.Matrix(FilterType="bilinear",M11=' + curZoom + ", M12=0, M21=0, M22=" + curZoom + ", Dx=" + cur_marginLeft + ",Dy=" + cur_marginTop + ")"
				})
			}
		},
		25)) : (zoomVal = n / l, a.current_imgInside.css({
			"-webkit-transition-duration": h + "s",
			"-moz-transition-duration": h + "s",
			"-o-transition-duration": h + "s",
			"transition-duration": h + "s",
			"-webkit-transition-timing-function": "ease",
			"-moz-transition-timing-function": "ease",
			"-o-transition-timing-function": "ease",
			"transition-timing-function": "ease",
			"-webkit-transform": "scale(" + zoomVal + ") rotate(0.1deg)",
			"-moz-transform": "scale(" + zoomVal + ") rotate(0.1deg)",
			"-o-transform": "scale(" + zoomVal + ")",
			transform: "scale(" + zoomVal + ")",
			perspective: "0",
			"-webkit-perspective": "0"
		}))
	}
	function Q(a, b) {
		nowx = (new Date).getTime(); ! a.mouseOverBanner && b.showCircleTimer && (a.ctx.clearRect(0, 0, a.canvas.width, a.canvas.height), a.ctx.beginPath(), a.ctx.globalAlpha = b.behindCircleAlpha / 100, a.ctx.arc(b.circleRadius + 2 * b.circleLineWidth, b.circleRadius + 2 * b.circleLineWidth, b.circleRadius, 0, 2 * Math.PI, !1), a.ctx.lineWidth = b.circleLineWidth + 2, a.ctx.strokeStyle = b.behindCircleColor, a.ctx.stroke(), a.ctx.beginPath(), a.ctx.globalAlpha = b.circleAlpha / 100, a.ctx.arc(b.circleRadius + 2 * b.circleLineWidth, b.circleRadius + 2 * b.circleLineWidth, b.circleRadius, 0, 2 * ((a.timeElapsed + nowx - a.arcInitialTime) / 1E3) / b.autoPlay * Math.PI, !1), a.ctx.lineWidth = b.circleLineWidth, a.ctx.strokeStyle = b.circleColor, a.ctx.stroke())
	}
	function D(a, b, g, f, e, j, m, h, l, n, k, x, t, B, r, o, q) {
		var u = !0;
		if (!g.loop && b.current_img_no + a >= f || !g.loop && 0 > b.current_img_no + a) u = !1;
		u && !b.slideIsRunning && (b.slideIsRunning = !0, d(".newFS", n).contents().unwrap(), b.arcInitialTime = (new Date).getTime(), b.timeElapsed = 0, g.showCircleTimer && (clearInterval(b.intervalID), b.ctx.clearRect(0, 0, b.canvas.width, b.canvas.height), b.ctx.beginPath(), b.ctx.globalAlpha = g.behindCircleAlpha / 100, b.ctx.arc(g.circleRadius + 2 * g.circleLineWidth, g.circleRadius + 2 * g.circleLineWidth, g.circleRadius, 0, 2 * Math.PI, !1), b.ctx.lineWidth = g.circleLineWidth + 2, b.ctx.strokeStyle = g.behindCircleColor, b.ctx.stroke(), b.ctx.beginPath(), b.ctx.globalAlpha = g.circleAlpha / 100, b.ctx.arc(g.circleRadius + 2 * g.circleLineWidth, g.circleRadius + 2 * g.circleLineWidth, g.circleRadius, 0, 0, !1), b.ctx.lineWidth = g.circleLineWidth, b.ctx.strokeStyle = g.circleColor, b.ctx.stroke(), b.intervalID = setInterval(function () {
			Q(b, g)
		},
		125)), b.bottomNavClicked || (b.previous_current_img_no = b.current_img_no), b.bottomNavClicked = !1, d(b.currentImg.attr("data-text-id")).css("display", "none"), "opportune" == g.skin && d(e[b.current_img_no]).removeClass("bottomNavButtonON"), "opportune" != g.skin && d(t[b.current_img_no]).removeClass("thumbsHolder_ThumbON"), k.css("display", "none"), b.current_img_no = b.current_img_no + a >= f ? 0 : 0 > b.current_img_no + a ? f - 1 : b.current_img_no + a, "opportune" == g.skin && d(e[b.current_img_no]).addClass("bottomNavButtonON"), "opportune" != g.skin && (d(t[b.current_img_no]).addClass("thumbsHolder_ThumbON"), currentCarouselLeft = B.css("left").substr(0, B.css("left").lastIndexOf("px")), 0 === b.current_img_no || b.current_img_no === f - 1 ? F(0, B, r, o, g, f, q, b) : F(1001, B, r, o, g, f, q, b)), l.animate({
			left: -1 * b.current_img_no * g.width + "px"
		},
		800, "easeOutQuad", function () {
			b.slideIsRunning = false;
			I(b);
			b.currentImg = d(j[b.current_img_no]);
			L(b, g, n, x, j);
			b.currentImg.attr("data-video") == "true" && k.css("display", "block");
			d(j[b.previous_current_img_no]).attr("data-video") == "true" && d("#contentHolderUnit_" + b.previous_current_img_no, n).html(d(j[b.previous_current_img_no]).html());
			K(b.previous_current_img_no, g, n, x, j);
			J(b, g, m, h);
			if (g.autoPlay > 0 && f > 1 && !b.mouseOverBanner) {
				clearTimeout(b.timeoutID);
				b.timeoutID = setTimeout(function () {
					D(1, b, g, f, e, j, m, h, l, n, k, x, t, B, r, o, q)
				},
				g.autoPlay * 1E3)
			}
		}))
	}
	function F(a, b, d, f, e, j, m, h) {
		currentCarouselLeft = b.css("left").substr(0, b.css("left").lastIndexOf("px"));
		1 === a || -1 === a ? (h.isCarouselScrolling = !0, b.css("opacity", "0.5"), b.animate({
			opacity: 1,
			left: "+=" + a * h.carouselStep
		},
		500, "easeOutCubic", function () {
			E(h, b, d, f, e, j, m);
			h.isCarouselScrolling = !1
		})) : currentCarouselLeft != -1 * Math.floor(h.current_img_no / e.numberOfThumbsPerScreen) * h.carouselStep && (h.isCarouselScrolling = !0, b.css("opacity", "0.5"), b.animate({
			opacity: 1,
			left: -1 * Math.floor(h.current_img_no / e.numberOfThumbsPerScreen) * h.carouselStep
		},
		500, "easeOutCubic", function () {
			E(h, b, d, f, e, j, m);
			h.isCarouselScrolling = !1
		}))
	}
	function E(a, b, d, f, e, j, m) {
		currentCarouselLeft = b.css("left").substr(0, b.css("left").lastIndexOf("px"));
		0 > currentCarouselLeft ? d.hasClass("carouselLeftNavDisabled") && d.removeClass("carouselLeftNavDisabled") : d.addClass("carouselLeftNavDisabled");
		Math.abs(currentCarouselLeft - a.carouselStep) < (m.width() + a.thumbMarginLeft) * j ? f.hasClass("carouselRightNavDisabled") && f.removeClass("carouselRightNavDisabled") : f.addClass("carouselRightNavDisabled")
	}
	function R(a, b, g, f, e, j, m, h, l, n, k) {
		"opportune" != b.skin && (k.css({
			top: b.height + "px",
			"margin-top": parseInt(b.thumbsWrapperMarginTop / (b.origWidth / b.width), 10) + "px",
			height: parseInt(b.origthumbsHolderWrapperH / (b.origWidth / b.width), 10) + "px"
		}), bgTopCorrection = 0, m.css("background-position", "0px " + ((k.height() - b.origthumbsHolderWrapperH) / 2 + bgTopCorrection) + "px"), h.css("background-position", "0px " + ((k.height() - b.origthumbsHolderWrapperH) / 2 + bgTopCorrection) + "px"), n.css("width", b.width - m.width() - h.width()), b.origWidthThumbsHolderVisibleWrapper = b.origWidth - m.width() - h.width(), e.css({
			width: parseInt(b.origThumbW / (b.origWidthThumbsHolderVisibleWrapper / n.width()), 10) + "px",
			height: parseInt(b.origThumbH / (b.origWidthThumbsHolderVisibleWrapper / n.width()), 10) + "px"
		}), b.numberOfThumbsPerScreen >= g && n.css("left", parseInt((k.width() - (l.width() + a.thumbMarginLeft) * g) / 2, 10) + "px"), d(".thumbsHolder_ThumbOFF", f).find("img:first").css({
			width: e.width() + "px",
			height: e.height() + "px",
			"margin-top": parseInt((k.height() - e.height()) / 2, 10) + "px"
		}), a.thumbMarginLeft = Math.floor((k.width() - m.width() - h.width() - l.width() * b.numberOfThumbsPerScreen) / (b.numberOfThumbsPerScreen - 1)), thumb_i = -1, j.children().each(function () {
			thumb_i++;
			theThumb = d(this);
			theThumb.css("background-position", "center " + b.thumbsOnMarginTop / (b.origWidth / b.width) + "px");
			0 >= thumb_i ? theThumb.css("margin-left", Math.floor((k.width() - m.width() - h.width() - (a.thumbMarginLeft + theThumb.width()) * (b.numberOfThumbsPerScreen - 1) - theThumb.width()) / 2) + "px") : theThumb.css("margin-left", a.thumbMarginLeft + "px")
		}), a.carouselStep = (l.width() + a.thumbMarginLeft) * b.numberOfThumbsPerScreen)
	}
	d.fn.bannerscollection_kenburns = function (a) {
		a = d.extend({},
		d.fn.bannerscollection_kenburns.defaults, a);
		return this.each(function () {
			var b = d(this);
			responsiveWidth = b.parent().width();
			responsiveHeight = b.parent().height();
			a.responsiveRelativeToBrowser && (responsiveWidth = d(window).width(), responsiveHeight = d(window).height());
			a.origWidth = a.width;
			a.width100Proc && (a.width = responsiveWidth);
			a.origHeight = a.height;
			a.height100Proc && (a.height = responsiveHeight);
			if (a.responsive && (a.origWidth != responsiveWidth || a.width100Proc)) a.width = a.origWidth > responsiveWidth || a.width100Proc ? responsiveWidth: a.origWidth,
			a.height100Proc || (a.height = a.width / (a.origWidth / a.origHeight));
			var g = d("<div></div>").addClass("bannerscollection_kenburns").addClass(a.skin),
			f = d('<div class="bannerControls"> <div class="leftNav"></div> <div class="rightNav"></div> </div> <div class="contentHolderVisibleWrapper"><div class="contentHolder"></div></div> <div class="playOver"></div> <div class="thumbsHolderWrapper"><div class="thumbsHolderVisibleWrapper"><div class="thumbsHolder"></div></div></div> <canvas class="mycanvas"></canvas>');
			b.wrap(g);
			b.after(f);
			var e = b.parent(".bannerscollection_kenburns"),
			j = d(".bannerControls", e),
			m = d(".contentHolderVisibleWrapper", e),
			h = d(".contentHolder", e),
			g = d('<div class="bottomNav"></div>');
			b.after(g);
			a.showAllControllers || j.css("display", "none");
			var l = d(".leftNav", e),
			n = d(".rightNav", e);
			l.css("display", "none");
			n.css("display", "none");
			a.showNavArrows && a.showOnInitNavArrows && (l.css("display", "block"), n.css("display", "block"));
			var k = d(".bottomNav", e),
			x;
			"opportune" == a.skin && (k.css({
				display: "block",
				top: a.height + "px"
			}), a.width100Proc && a.height100Proc ? k.css("margin-top", a.thumbsWrapperMarginTop + "px") : k.css("margin-top", a.thumbsWrapperMarginTop / (a.origWidth / a.width) + "px"));
			a.showBottomNav || k.css("display", "none");
			a.showOnInitBottomNav || k.css("left", "-5000px");
			var t = d(".thumbsHolderWrapper", e),
			B = d(".thumbsHolderVisibleWrapper", e),
			r = d(".thumbsHolder", e),
			o,
			q;
			o = d('<div class="carouselLeftNav"></div>');
			q = d('<div class="carouselRightNav"></div>');
			t.append(o);
			t.append(q);
			q.css("right", "0");
			r.css("width", o.width() + "px");
			(!a.showBottomNav || !a.showOnInitBottomNav) && t.css({
				opacity: 0,
				display: "none"
			});
			"opportune" != a.skin && t.css("margin-top", parseInt(a.thumbsWrapperMarginTop / (a.origWidth / a.width), 10) + "px");
			a.enableTouchScreen && (h.css("cursor", "url(" + a.absUrl + "images/hand.cur),url(" + a.absUrl + "images/hand.cur),move"), e.css("cursor", "url(images/hand.cur),url(images/hand.cur),move"), h.css("left", "0"), h.draggable({
				axis: "x",
				distance: 10,
				start: function () {
					origLeft = parseInt(d(this).css("left"), 10);
					u.css("display", "none")
				},
				stop: function () {
					if (!c.slideIsRunning) {
						finalLeft = parseInt(d(this).css("left"), 10);
						direction = 1;
						origLeft < finalLeft && (direction = -1);
						D(direction, c, a, p, y, v, b, j, h, e, u, A, w, r, o, q, s)
					}
				}
			}));
			var u = d(".playOver", e);
			u.css({
				left: parseInt((a.width - u.width()) / 2, 10) + "px",
				top: parseInt((a.height - u.height()) / 2, 10) + "px"
			});
			var c = {
				current_img_no: 0,
				currentImg: 0,
				previous_current_img_no: 0,
				slideIsRunning: !1,
				mouseOverBanner: !1,
				isVideoPlaying: !1,
				bottomNavClicked: !1,
				current_imgInside: "",
				windowWidth: 0,
				carouselStep: 0,
				thumbMarginLeft: 0,
				timeoutID: "",
				intervalID: "",
				arcInitialTime: (new Date).getTime(),
				timeElapsed: 0,
				canvas: "",
				ctx: "",
				bannerRatio: a.origWidth / a.origHeight,
				msiInterval: "",
				msiInitialTime: (new Date).getTime()
			};
			a.showCircleTimer && (c.canvas = d(".mycanvas", e)[0], c.canvas.width = 2 * a.circleRadius + 4 * a.circleLineWidth, c.canvas.height = 2 * a.circleRadius + 4 * a.circleLineWidth, d.browser.msie && 9 > parseInt(d.browser.version, 10) && (c.canvas = G_vmlCanvasManager.initElement(c.canvas), !a.showCircleTimerIE8IE7 && a.showCircleTimer && (a.showCircleTimer = !1)), c.ctx = c.canvas.getContext("2d"));
			var A = [],
			M = 0;
			e.width(a.width);
			e.height(a.height);
			m.width(a.width);
			m.height(a.height);
			h.width(a.width);
			h.height(a.height);
			j.css("margin-top", parseInt((a.height - l.height()) / 2, 10) + "px");
			var p = 0,
			v = b.find("ul:first").children(),
			H,
			N = 0,
			z,
			G = 0,
			E = 0,
			C,
			s,
			O = 0;
			v.each(function () {
				c.currentImg = d(this);
				if (!c.currentImg.is("li")) c.currentImg = c.currentImg.find("li:first");
				if (c.currentImg.is("li")) {
					p++;
					H = d('<div class="contentHolderUnit" rel="' + (p - 1) + '" id="contentHolderUnit_' + (p - 1) + '">' + c.currentImg.html() + "</div>");
					H.width(a.width);
					H.height(a.height);
					h.append(H);
					N = N + a.width;
					c.current_img_no = p - 1;
					C = d("#contentHolderUnit_" + c.current_img_no, e).find("img:first");
					A[p - 1] = C.width() + ";" + C.height();
					K(p - 1, a, e, A, v);
					if (a.skin == "opportune") {
						z = d('<div class="bottomNavButtonOFF" rel="' + (p - 1) + '"></div>');
						k.append(z);
						G = G + (parseInt(z.css("padding-left").substring(0, z.css("padding-left").length - 2), 10) + z.width());
						E = parseInt((k.height() - parseInt(z.css("height").substring(0, z.css("height").length - 2))) / 2, 10);
						z.css("margin-top", E + "px")
					}
					if (a.skin != "opportune") {
						image_name = d(v[p - 1]).attr("data-bottom-thumb");
						s = d('<div class="thumbsHolder_ThumbOFF" rel="' + (p - 1) + '"><img src="' + image_name + '"></div>');
						r.append(s);
						if (a.origThumbW == 0) {
							if (a.numberOfThumbsPerScreen == 0) a.numberOfThumbsPerScreen = Math.floor((a.origWidth - o.width() - q.width()) / s.width());
							a.origThumbW = s.width();
							a.origThumbH = s.height();
							a.origthumbsHolderWrapperH = t.height();
							c.thumbMarginLeft = Math.floor((a.origWidth - o.width() - q.width() - s.width() * a.numberOfThumbsPerScreen) / (a.numberOfThumbsPerScreen - 1))
						}
						r.css("width", r.width() + c.thumbMarginLeft + s.width() + "px");

						O = parseInt((t.height() - parseInt(s.css("height").substring(0, s.css("height").length - 2))) / 2, 10)
					}
					h.append(d(c.currentImg.attr("data-text-id")));
					d(c.currentImg.attr("data-text-id")).css({
						width: b.width() + "px",
						left: parseInt((p - 1) * a.width, 10),
						top: j.css("top")
					})
				}
			});
			h.width(N);
			k.width(G);
			a.showOnInitBottomNav && k.css("left", parseInt((e.width() - G) / 2, 10) + "px");
			"opportune" != a.skin && (B.css({
				width: a.origWidth - o.width() - q.width(),
				left: o.width() + "px"
			}), c.carouselStep = (s.width() + c.thumbMarginLeft) * a.numberOfThumbsPerScreen, o.addClass("carouselLeftNavDisabled"), a.numberOfThumbsPerScreen >= p && (q.addClass("carouselRightNavDisabled"), o.css("display", "none"), q.css("display", "none"), B.css("left", parseInt((t.width() - (s.width() + c.thumbMarginLeft) * p) / 2, 10) + "px")), t.css("top", a.height + "px"), d(".thumbsHolder_ThumbOFF", e).find("img:first").css("margin-top", O + "px"), a.origthumbsHolder_MarginTop = O);
			var w = d(".thumbsHolder_ThumbOFF", e);
			R(c, a, p, e, w, r, o, q, s, B, t);
			d("iframe", e).each(function () {
				var a = d(this).attr("src");
				d(this).attr("src", a + "?wmode=transparent")
			});
			c.current_img_no = 0;
			c.currentImg = d(v[0]);
			g = e.find("img:first");
			g[0].complete ? (d(".myloader", e).css("display", "none"), L(c, a, e, A, v), J(c, a, b, j)) : g.load(function () {
				d(".myloader", e).css("display", "none");
				L(c, a, e, A, v);
				J(c, a, b, j)
			});
			e.mouseenter(function () {
				if (a.pauseOnMouseOver) {
					c.mouseOverBanner = true;
					clearTimeout(c.timeoutID);
					nowx = (new Date).getTime();
					c.timeElapsed = c.timeElapsed + (nowx - c.arcInitialTime)
				}
				if (a.autoHideNavArrows && a.showNavArrows) {
					l.css("display", "block");
					n.css("display", "block")
				}
				a.autoHideBottomNav && a.showBottomNav && (a.skin == "opportune" ? k.css({
					display: "block",
					left: parseInt((e.width() - G) / 2, 10) + "px"
				}) : a.thumbsWrapperMarginTop < 0 && c.isVideoPlaying || a.showBottomNav && t.stop().animate({
					opacity: 1
				},
				500, "swing", function () {}))
			});
			e.mouseleave(function () {
				if (a.pauseOnMouseOver) {
					c.mouseOverBanner = false;
					nowx = (new Date).getTime()
				}
				if (a.autoHideNavArrows && a.showNavArrows && !c.isVideoPlaying) {
					l.css("display", "none");
					n.css("display", "none")
				}
				a.autoHideBottomNav && a.showBottomNav && (a.skin == "opportune" ? k.css("display", "none") : t.stop().animate({
					opacity: 0
				},
				300, "swing", function () {}));
				if (a.autoPlay > 0 && p > 1 && !c.isVideoPlaying && a.pauseOnMouseOver) {
					clearTimeout(c.timeoutID);
					c.arcInitialTime = (new Date).getTime();
					var d = parseInt(a.autoPlay * 1E3 - (c.timeElapsed + nowx - c.arcInitialTime), 10);
					c.timeoutID = setTimeout(function () {
						D(1, c, a, p, y, v, b, j, h, e, u, A, w, r, o, q, s)
					},
					d)
				}
			});
			g = d(".contentHolderUnit", h); - 1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && -1 == navigator.userAgent.indexOf("Android") ? g.css("z-index", "1") : -1 != navigator.userAgent.indexOf("Chrome") && -1 == navigator.userAgent.indexOf("Android") && g.css("z-index", "1");
			g.click(function () {
				var b = d(this).attr("rel");
				if (d(v[c.current_img_no]).attr("data-video") == "true") if (b != c.current_img_no) c.isVideoPlaying = false;
				else {
					clearTimeout(c.timeoutID);
					I(c);
					C = d(this).find("img:first");
					C.css("display", "none");
					u.css("display", "none");
					d(c.currentImg.attr("data-text-id")).children().css("opacity", 0);
					c.isVideoPlaying = true;
					if (a.thumbsWrapperMarginTop < 0) {
						t.css("display", "none");
						a.skin == "opportune" && k.css("display", "none")
					}
					if (a.showCircleTimer) {
						clearInterval(c.intervalID);
						c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);
						c.ctx.beginPath();
						c.ctx.globalAlpha = 0;
						c.ctx.arc(a.circleRadius + 2 * a.circleLineWidth, a.circleRadius + 2 * a.circleLineWidth, a.circleRadius, 0, 0, false);
						c.ctx.lineWidth = a.circleLineWidth + 2;
						c.ctx.strokeStyle = a.behindCircleColor;
						c.ctx.stroke();
						c.ctx.beginPath();
						c.ctx.globalAlpha = 0;
						c.ctx.arc(a.circleRadius + 2 * a.circleLineWidth, a.circleRadius + 2 * a.circleLineWidth, a.circleRadius, 0, 0, false);
						c.ctx.lineWidth = a.circleLineWidth;
						c.ctx.strokeStyle = a.circleColor;
						c.ctx.stroke()
					}
				}
				var e = d(v[c.current_img_no]);
				if (e.attr("data-link") != void 0 && b == c.current_img_no && e.attr("data-link") != "") {
					b = a.target;
					e.attr("data-target") != void 0 && e.attr("data-target") != "" && (b = e.attr("data-target"));
					b == "_blank" ? window.open(e.attr("data-link")) : window.location = e.attr("data-link")
				}
			});
			u.click(function () {
				u.css("display", "none");
				clearTimeout(c.timeoutID);
				I(c);
				C = d("#contentHolderUnit_" + c.current_img_no, e).find("img:first");
				C.css("display", "none");
				d(c.currentImg.attr("data-text-id")).children().css("opacity", 0);
				c.isVideoPlaying = true;
				if (a.thumbsWrapperMarginTop < 0) {
					t.css("display", "none");
					a.skin == "opportune" && k.css("display", "none")
				}
				if (a.showCircleTimer) {
					clearInterval(c.intervalID);
					c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);
					c.ctx.beginPath();
					c.ctx.globalAlpha = 0;
					c.ctx.arc(a.circleRadius + 2 * a.circleLineWidth, a.circleRadius + 2 * a.circleLineWidth, a.circleRadius, 0, 0, false);
					c.ctx.lineWidth = a.circleLineWidth + 2;
					c.ctx.strokeStyle = a.behindCircleColor;
					c.ctx.stroke();
					c.ctx.beginPath();
					c.ctx.globalAlpha = 0;
					c.ctx.arc(a.circleRadius + 2 * a.circleLineWidth, a.circleRadius + 2 * a.circleLineWidth, a.circleRadius, 0, 0, false);
					c.ctx.lineWidth = a.circleLineWidth;
					c.ctx.strokeStyle = a.circleColor;
					c.ctx.stroke()
				}
			});
			l.click(function () {
				if (!c.slideIsRunning) {
					c.isVideoPlaying = false;
					if (a.showBottomNav) {
						t.css({
							opacity: 1,
							display: "block"
						});
						a.skin == "opportune" && k.css("display", "block")
					}
					clearTimeout(c.timeoutID);
					D( - 1, c, a, p, y, v, b, j, h, e, u, A, w, r, o, q, s)
				}
			});
			n.click(function () {
				if (!c.slideIsRunning) {
					c.isVideoPlaying = false;
					if (a.showBottomNav) {
						t.css({
							opacity: 1,
							display: "block"
						});
						a.skin == "opportune" && k.css("display", "block")
					}
					clearTimeout(c.timeoutID);
					D(1, c, a, p, y, v, b, j, h, e, u, A, w, r, o, q, s)
				}
			});
			var P = !1;
			d(window).resize(function () {
				doResizeNow = true;
				if (navigator.userAgent.indexOf("Android") != -1) {
					if (a.windowOrientationScreenSize0 == 0 && window.orientation == 0) a.windowOrientationScreenSize0 = d(window).width();
					if (a.windowOrientationScreenSize90 == 0 && window.orientation == 90) a.windowOrientationScreenSize90 = d(window).height();
					if (a.windowOrientationScreenSize_90 == 0 && window.orientation == -90) a.windowOrientationScreenSize_90 = d(window).height();
					a.windowOrientationScreenSize0 && (window.orientation == 0 && d(window).width() > a.windowOrientationScreenSize0) && (doResizeNow = false);
					a.windowOrientationScreenSize90 && (window.orientation == 90 && d(window).height() > a.windowOrientationScreenSize90) && (doResizeNow = false);
					a.windowOrientationScreenSize_90 && (window.orientation == -90 && d(window).height() > a.windowOrientationScreenSize_90) && (doResizeNow = false);
					if (c.windowWidth == 0) {
						doResizeNow = false;
						c.windowWidth = d(window).width()
					}
				}
				d.browser.msie && (parseInt(d.browser.version, 10) == 9 && c.windowWidth == 0) && (doResizeNow = false);
				if (c.windowWidth == d(window).width()) {
					doResizeNow = false;
					if (a.windowCurOrientation != window.orientation && navigator.userAgent.indexOf("Android") != -1) {
						a.windowCurOrientation = window.orientation;
						doResizeNow = true
					}
				} else c.windowWidth = d(window).width();
				if (a.responsive && doResizeNow) {
					P !== false && clearTimeout(P);
					P = setTimeout(function () {
						var g = c,
						f = a,
						n = p,
						x = v,
						z = u,
						C = A,
						E = w,
						G = y,
						F = s,
						H = d("body").css("overflow");
						d("body").css("overflow", "hidden");
						responsiveWidth = b.parent().parent().width();
						responsiveHeight = b.parent().parent().height();
						if (f.responsiveRelativeToBrowser) {
							responsiveWidth = d(window).width();
							responsiveHeight = d(window).height()
						}
						if (f.width100Proc) f.width = responsiveWidth;
						if (f.height100Proc) f.height = responsiveHeight;
						if (f.origWidth != responsiveWidth || f.width100Proc) {
							if (f.origWidth > responsiveWidth || f.width100Proc) f.width = responsiveWidth;
							else if (!f.width100Proc) f.width = f.origWidth;
							if (!f.height100Proc) f.height = f.width / g.bannerRatio;
							e.width(f.width);
							e.height(f.height);
							m.width(f.width);
							m.height(f.height);
							h.width(f.width);
							h.height(f.height);
							j.css("margin-top", parseInt((f.height - l.height()) / 2, 10) + "px");
							I(g);
							contentHolderUnit = d(".contentHolderUnit", e);
							contentHolderUnit.width(f.width);
							contentHolderUnit.height(f.height);
							holderWidth = f.width * n;
							for (i = 0; i < n; i++) {
								K(i, f, e, C, x);
								d(d(x[i]).attr("data-text-id")).css({
									width: b.width() + "px",
									left: parseInt(i * f.width, 10),
									top: j.css("top")
								})
							}
							h.width(holderWidth);
							if (f.skin == "opportune") {
								k.css({
									left: parseInt((e.width() - k.width()) / 2, 10) + "px",
									top: f.height + "px"
								});
								(!f.width100Proc || !f.height100Proc) && k.css("margin-top", parseInt(f.thumbsWrapperMarginTop / (f.origWidth / f.width), 10) + "px")
							} else R(g, f, n, e, E, r, o, q, F, B, t);
							z.css({
								left: parseInt((f.width - z.width()) / 2, 10) + "px",
								top: parseInt((f.height - z.height()) / 2, 10) + "px"
							});
							clearTimeout(g.timeoutID);
							D(1, g, f, n, G, x, b, j, h, e, z, C, E, r, o, q, F)
						}
						d("body").css("overflow", H)
					},
					300)
				}
			});
			var y = d(".bottomNavButtonOFF", e);
			"opportune" == a.skin && (y.click(function () {
				if (!c.slideIsRunning) {
					c.isVideoPlaying = false;
					var f = d(this).attr("rel");
					d(y[c.current_img_no]).removeClass("bottomNavButtonON");
					c.previous_current_img_no = c.current_img_no;
					c.bottomNavClicked = true;
					c.current_img_no = f - 1;
					clearTimeout(c.timeoutID);
					D(1, c, a, p, y, v, b, j, h, e, u, A, w, r, o, q, s)
				}
			}), y.mouseenter(function () {
				var b = d(this),
				c = b.attr("rel");
				if (a.showPreviewThumbs) {
					x = d('<div class="bottomOverThumb"></div>');
					b.append(x);
					var e = d(v[c]).attr("data-bottom-thumb"),
					f = d(v[M]).attr("data-bottom-thumb"),
					g = 80,
					h = -80;
					if (M > c) {
						g = -80;
						h = 80
					}
					x.html("");
					x.html('<div class="innerBottomOverThumb"><img src="' + f + '"style="margin:0px;" id="oldThumb"><img src="' + e + '" style="margin-top:-80px; margin-left:' + g + 'px;" id="newThumb"></div>');
					d("#newThumb").stop().animate({
						marginLeft: "0px"
					},
					150, function () {
						x.html('<div class="innerBottomOverThumb"><img src="' + e + '"></div>')
					});
					d("#oldThumb").stop().animate({
						marginLeft: h + "px"
					},
					150, function () {});
					M = c
				}
				b.addClass("bottomNavButtonON")
			}), y.mouseleave(function () {
				var b = d(this),
				e = b.attr("rel");
				a.showPreviewThumbs && x.remove();
				c.current_img_no != e && b.removeClass("bottomNavButtonON")
			}));
			w.mousedown(function () {
				arrowClicked = true;
				if (!c.effectIsRunning) {
					c.isVideoPlaying = false;
					var f = d(this).attr("rel");
					d(w[c.current_img_no]).removeClass("thumbsHolder_ThumbON");
					c.previous_current_img_no = c.current_img_no;
					c.bottomNavClicked = true;
					c.current_img_no = f - 1;
					D(1, c, a, p, y, v, b, j, h, e, u, A, w, r, o, q, s)
				}
			});
			w.mouseup(function () {
				arrowClicked = false
			});
			w.mouseenter(function () {
				var a = d(this);
				a.attr("rel");
				a.addClass("thumbsHolder_ThumbON")
			});
			w.mouseleave(function () {
				var a = d(this),
				b = a.attr("rel");
				c.current_img_no != b && a.removeClass("thumbsHolder_ThumbON")
			});
			o.click(function () {
				if (!c.isCarouselScrolling) {
					currentCarouselLeft = r.css("left").substr(0, r.css("left").lastIndexOf("px"));
					currentCarouselLeft < 0 && F(1, r, o, q, a, p, s, c)
				}
			});
			q.click(function () {
				if (!c.isCarouselScrolling) {
					currentCarouselLeft = r.css("left").substr(0, r.css("left").lastIndexOf("px"));
					Math.abs(currentCarouselLeft - c.carouselStep) < (s.width() + c.thumbMarginLeft) * p && F( - 1, r, o, q, a, p, s, c)
				}
			});
			"opportune" == a.skin && d(y[c.current_img_no]).addClass("bottomNavButtonON");
			d(w[c.current_img_no]).addClass("thumbsHolder_ThumbON");
			0 < a.autoPlay && 1 < p && (a.showCircleTimer && (c.intervalID = setInterval(function () {
				Q(c, a)
			},
			125)), c.timeoutID = setTimeout(function () {
				D(1, c, a, p, y, v, b, j, h, e, u, A, w, r, o, q, s)
			},
			1E3 * a.autoPlay));
			"true" == d(v[c.current_img_no]).attr("data-video") && u.css("display", "block")
		})
	};
	d.fn.bannerscollection_kenburns.defaults = {
		skin: "opportune",
		width: 918,
		height: 382,
		width100Proc: !1,
		height100Proc: !1,
		autoPlay: 16,
		loop: !0,
		horizontalPosition: "center",
		verticalPosition: "center",
		initialZoom: 1,
		finalZoom: 0.8,
		duration: 20,
		durationIEfix: 30,
		initialOpacity: 1,
		target: "_blank",
		pauseOnMouseOver: !0,
		showCircleTimer: !0,
		showCircleTimerIE8IE7: !1,
		circleRadius: 10,
		circleLineWidth: 4,
		circleColor: "#FF0000",
		circleAlpha: 100,
		behindCircleColor: "#000000",
		behindCircleAlpha: 50,
		responsive: !0,
		responsiveRelativeToBrowser: !0,
		numberOfThumbsPerScreen: 0,
		thumbsOnMarginTop: 0,
		thumbsWrapperMarginTop: 0,
		showAllControllers: !0,
		showNavArrows: !0,
		showOnInitNavArrows: !0,
		autoHideNavArrows: !0,
		showBottomNav: !0,
		showOnInitBottomNav: !0,
		autoHideBottomNav: !1,
		showPreviewThumbs: !0,
		enableTouchScreen: !0,
		absUrl: "",
		origWidth: 0,
		origHeight: 0,
		origThumbW: 0,
		origThumbH: 0,
		origthumbsHolderWrapperH: 0,
		origthumbsHolder_MarginTop: 0,
		windowOrientationScreenSize0: 0,
		windowOrientationScreenSize90: 0,
		windowOrientationScreenSize_90: 0,
		windowCurOrientation: 0
	}
})(jQuery);