;((n, w, d) => {
	/*************************************
	*
	* @exposed methods ala, Public API :-)
	*
	***********************************/
	class Book {
		constructor() {
			this.node = d.getElementById('book')
			this.delegator = d.getElementById('plotter')
			this.state = {
				direction: _forward,
				isInitialized: false,
				isTurning: false,
				// 'isPeelable': false,
				// 'isZoomed': false,
				// 'isPeeled': false,
				// 'toTurnOrNotToTurn': false,
				mode: _viewer.getMatch('(orientation: landscape)') ? 'landscape' : 'portrait',
				animations: {}
			}

			/******************************************************
			*  @plotter.origin is set at the center of the viewport,
			*  thus splitting the screen into four quadrants instead
			*  of the default IV-quadrant referencing used in basic
			*  scroll animation mechanics of the browser.
			*******************************************************/
			this.plotter = {
				origin: {
					x: `${parseInt(d.getElementsByTagName('body')[0].getBoundingClientRect().width) / 2}`,
					y: `${parseInt(d.getElementsByTagName('body')[0].getBoundingClientRect().height) / 2}`
				}
			}
			this.plotter.bounds = _setGeometricalPremise(this.node)
			this.elements = [ ...this.node.children ] // Source via http request. Or construct via React/JSX like template transformation.
			this.buttons = this.elements.splice(0, 2)
			/******************************************************
			* @frame is a page element with wrappers
			* and shadow elements and/or pseudos (before: :after)
			* that is printable into the DOM.
			*******************************************************/

			this.frames = this.elements.map((page, index) => _addPageWrappersAndBaseClasses(page, index))

			/******************************************************
			*  @range is set of printable frames for the viewport:
			*  this.range = []
			*  TODO: Use [ p, q, r, s, t, u, v ] standard snapshots								*
			*******************************************************/
			this.eventsCache = []
			this.tick = 0 /* Count the number of pages ticked before book goes to `isTurning: false` state again */
			this.Ω = (paintTime = 150) =>
				paintTime * Math.pow(0.9, this.tick) /* Apply paintTime cushion for multipage turns via wheel events */

			/* Turn events */
			this.turned = new Event('turned')
			this.turning = new Event('turning')
		}
		// PROPERTIES
		dimensions() {
			return { width: `${_book.plotter.bounds.width}`, height: `${_book.plotter.bounds.height}` }
		}

		view() {
			return _setViewIndices(_getCurrentPage(_book.currentPage), _book.state.mode).map((i) => i + 1) // Array of page numbers in the [View].
		}

		page() {
			return _book.currentPage
		}

		getLength() {
			return _book.frames.length
		}

		getMode() {
			return _book.state.mode
		}

		hasPage(args) {
			let index = parseInt(args[0]) - 1
			return !!index.between(0, _book.frames.length)
		}
	}

	/*******************************
	*  Geometric system listeners  *
	********************************/

	const _setGeometricalPremise = (node) => node.getBoundingClientRect()

	const _resetGeometricalPremise = () => {
		_book.plotter.bounds = _setGeometricalPremise(_book.node)
	}

	w.addEventListener('resize', _resetGeometricalPremise) // Recalibrate geometrical premise.

	const _setGeometricalOrigin = () => ({
		x: `${parseInt(d.getElementsByTagName('body')[0].getBoundingClientRect().width) / 2}`,
		y: `${parseInt(d.getElementsByTagName('body')[0].getBoundingClientRect().height) / 2}`
	})

	const _resetGeometricalOrigin = () => {
		_book.plotter.origin = _setGeometricalOrigin()
	}

	w.addEventListener('resize', _resetGeometricalOrigin) // Recalibrate geometrical origin.

	/**************************************************************************************
	* One time @superbook initialization.
	* The minimum length (options.length) of a book is 4 pages. 
	* Pages could be provided to Bookiza via DOM or be synthesized
	* using length value passed as options during initialization.
	* Force the book length to always be an even number: https://bubblin.io/docs/concept
	***************************************************************************************/

	const _initializeSuperBook = ({
		options = { duration: 300, peel: true, zoom: true, startPage: 1, length: 4, animation: 'hard' }
	}) => {
		_removeChildren(_book.node)

		delete _book.elements /* Clear object property from { _book } after a mandatory DOM lookup. */

		/* TODO: Check each value and provide default before assignment of options object. Bad values can be passed within Option properties. */
		_book.options = options

		// if (_book.options.startPage === 'undefined') _book.options.startPage = _getCurrentPage(options.startPage)

		let size =
			_book.frames.length === 0
				? Number.isInteger(options.length)
					? options.length >= 4 ? (_isOdd(options.length) ? options.length + 1 : options.length) : 4
					: 4
				: _isOdd(_book.frames.length) ? _book.frames.length + 1 : _book.frames.length

		if (_book.frames.length === 0) _book.frames = _reifyFrames(size)

		if (_isOdd(_book.frames.length)) {
			_book.frames.push(_createFrame(_book.frames.length))
		} /* If pages were printed via server-side HTML. See line #44 */

		/********************************************************
		 * Set up mutationObserver & performanceObservers to 	  *
		 * monitor changes to the DOM. Buttons will mutate DOM  *
		 * first and set off _openTheBook()	method leading to   *
		 * isInitialized: true state. Then _turnTheBook()!      *
		 ********************************************************/

		// TODO: Use comma operators instead?
		_setUpMutationObservers([ _setUpPerformanceObservers, _buttons, _oneTimePrint ]) // Pass array of callbacks
	}

	const handler = (event) => {
		if (!event.target) return

		event.stopPropagation()
		event.preventDefault()

		switch (event.type) {
			case 'mouseover':
				_handleMouseOver(event)
				break
			case 'mouseout':
				_handleMouseOut(event)
				break
			case 'mousemove':
				_handleMouseMove(event)
				break
			case 'mousedown':
				_handleMouseDown(event)
				break
			case 'mouseup':
				_handleMouseUp(event)
				break
			case 'click':
				_handleMouseClicks(event)
				break
			case 'dblclick':
				_handleMouseDoubleClick(event)
				break
			case 'wheel':
				_handleWheelEvent(event)
				break
			case 'keydown':
				_handleKeyDownEvent(event)
				break
			case 'keypress':
				_handleKeyPressEvent(event)
				break
			case 'keyup':
				_handleKeyUpEvent(event)
				break
			case 'touchstart':
				_handleTouchStart(event)
				break
			case 'touchmove':
				_handleTouchMove(event)
				break
			case 'touchend':
				_handleTouchEnd(event)
				break
			default:
				console.log(event) // Ignore all other events.
				break
		}
	}

	const mouseEvents = [ 'mousemove', 'mouseover', 'mousedown', 'mouseup', 'mouseout', 'click', 'dblclick', 'wheel' ]

	const touchEvents = [ 'touchstart', 'touchend', 'touchmove' ]

	const keyEvents = [ 'keypress', 'keyup', 'keydown' ]

	const _applyEventListenersOnBook = (callback) => {
		keyEvents.forEach((event) => {
			w.addEventListener(event, handler)
		})

		const _applyBookEvents = () => {
			mouseEvents.map((event) => {
				_book.delegator.addEventListener(event, handler)
			})
		}

		const _removeBookEvents = () => {
			mouseEvents.map((event) => {
				_book.delegator.removeEventListener(event, handler)
			})
		}

		w.addEventListener('mouseover', _applyBookEvents)
		w.addEventListener('mouseout', _removeBookEvents)

		/***********************************************************
		 * Listen to @touch events only when capable of Touch.		*
		 * Some Windows/Chrome will return true even when the		*
		 * screen isn't touch capable. Do not use this to !listen	*
		 * keyboard/mouse events. Plain and simple. 				*
		************************************************************/

		if (_isTouch()) {
			touchEvents.map((event) => {
				_book.delegator.addEventListener(event, handler)
			})
		}

		if (callback && typeof callback === 'function') callback()
	}

	/***************************************
	 * Event handlers
	****************************************/

	const _handleMouseOver = (event) => {
		switch (event.target.nodeName) {
			case 'A':
				_book.state.direction = _direction(event.target.id)

				break
			case 'DIV':
				// console.log(_book.state.direction)
				break
			default:
		}
	}

	const _handleMouseOut = (event) => {
		// TODO: This is where we calculate range pages according to QI-QIV.
		switch (event.target.nodeName) {
			case 'A':
				// console.log('Anchor out', event.target.id)
				break
			case 'DIV':
				break
			default:
		}
	}

	const _handleMouseMove = (event) => {
		_updateGeometricalPlotValues(event)
	}

	const _handleMouseDown = (event) => {
		_book.state.direction = _direction()

		switch (event.target.nodeName) {
			case 'A':
				// console.log('Execute half turn')

				// _book.state.direction === _forward
				// 	? _printElementsToDOM('rightPages', _getRangeIndices(_getCurrentPage(_book.targetPage), _book.state.mode).rightPageIndices.map((index) => _book.frames[`${index}`]), _book.tick)
				// 	: _printElementsToDOM('leftPages', _getRangeIndices(_getCurrentPage(_book.targetPage), _book.state.mode).leftPageIndices.map((index) => _book.frames[`${index}`]), _book.tick)

				break
			case 'DIV':
				// console.log('Page picked, execute curl')
				// console.log('down', event.pageX)
				// console.log(_book.state.direction)
				_book.plotter.start = {
					x: event.pageX,
					y: event.pageY
				}

				// _book.state.direction === _forward
				// 	? _printElementsToDOM('rightPages', _getRangeIndices(_getCurrentPage(_book.targetPage), _book.state.mode).rightPageIndices.map((index) => _book.frames[`${index}`]), _book.tick)
				// 	: _printElementsToDOM('leftPages', _getRangeIndices(_getCurrentPage(_book.targetPage), _book.state.mode).leftPageIndices.map((index) => _book.frames[`${index}`]), _book.tick)

				break
			default:
		}
	}

	const _handleMouseUp = (event) => {
		switch (event.target.nodeName) {
			case 'A':
				// console.log('Complete the flip')
				break
			case 'DIV':
				// console.log('up', event.pageX) // Calculate x-shift, y-shift.

				_book.plotter.end = {
					x: event.pageX,
					y: event.pageY
				}

				console.log(_sign(_book.plotter.start.x - _book.plotter.end.x))

				break
			default:
		}
	}

	const _handleMouseClicks = (event) => {
		switch (event.target.nodeName) {
			case 'A':
				_book.state.direction = _direction(event.target.id)
				_book.state.isTurning ? (_book.tick += 1) : (_book.tick = 1)
				_book.eventsCache.push({ tick: _book.tick, page: _book.targetPage }) // Pop via DOM mutations

				_book.state.direction === _forward
					? _printElementsToDOM(
							'rightPages',
							_getRangeIndices(_getCurrentPage(_book.targetPage), _book.state.mode).rightPageIndices.map(
								(index) => _book.frames[`${index}`]
							),
							_book.tick
						)
					: _printElementsToDOM(
							'leftPages',
							_getRangeIndices(_getCurrentPage(_book.targetPage), _book.state.mode).leftPageIndices.map(
								(index) => _book.frames[`${index}`]
							),
							_book.tick
						)

				_book.targetPage = _target(_book.state.direction)

				break
			case 'DIV':
				break
			default:
		}
	}

	const _handleMouseDoubleClick = (event) => {
		switch (event.target.nodeName) {
			case 'A':
				break
			case 'DIV':
				break
			default:
		}
	}

	const _handleWheelEvent = (event) => {
		switch (event.target.nodeName) {
			case 'A':
				_book.state.direction =
					event.target.id === 'next'
						? event.deltaY < 0 ? _backward : _forward
						: event.deltaY < 0 ? _forward : _backward

				_book.state.isTurning ? (_book.tick += 1) : (_book.tick = 1)

				_book.eventsCache.push({ tick: _book.tick, page: _book.targetPage }) // Pop via DOM mutations

				_book.state.isTurning = true

				_book.state.direction === _forward
					? _printElementsToDOM(
							'rightPages',
							_getRangeIndices(_getCurrentPage(_book.targetPage), _book.state.mode).rightPageIndices.map(
								(index) => _book.frames[`${index}`]
							),
							_book.tick
						)
					: _printElementsToDOM(
							'leftPages',
							_getRangeIndices(_getCurrentPage(_book.targetPage), _book.state.mode).leftPageIndices.map(
								(index) => _book.frames[`${index}`]
							),
							_book.tick
						)
				_book.targetPage = _target(_book.state.direction)

				break
			case 'DIV':
				console.log('curve the page over, may be.')
				break
			default:
		}
	}

	const _handleKeyPressEvent = (event) => {
		// console.log('pressed', event.keyCode)
	}

	const _handleKeyDownEvent = (event) => {
		// console.log('down', event.keyCode)
	}

	const _handleKeyUpEvent = (event) => {
		if (event.keyCode === 32) {
			/* We have _next() method right here */
			_book.state.direction = _forward
			_book.state.isTurning ? (_book.tick += 1) : (_book.tick = 1)
			_book.eventsCache.push({ tick: _book.tick, page: _book.targetPage }) // Pop via DOM mutations
			_printElementsToDOM(
				'rightPages',
				_getRangeIndices(_getCurrentPage(_book.targetPage), _book.state.mode).rightPageIndices.map(
					(index) => _book.frames[`${index}`]
				),
				_book.tick
			)
			_book.targetPage = _target(_book.state.direction)
		}
	}

	const _handleTouchStart = (event) => {
		switch (event.touches.length) {
			case '1':
				_book.plotter.startPoint = {
					x: event.pageX,
					y: event.pageY
				}
				break
			case '2':
				break
			default:
				break
		}
	}

	const _handleTouchMove = (event) => {
		_updateGeometricalPlotValues(event)
	}

	const _handleTouchEnd = (event) => {
		console.log('Touch stopped')

		switch (event.touches.length) {
			case '1':
				_book.plotter.startPoint = {
					x: event.pageX,
					y: event.pageY
				}
				break
			case '2':
				break
			default:
				break
		}
	}

	/**********************************************
	 * Conio-tubular math + web animation objects *
  **********************************************/

	/* 
    Use https://caniuse.com/#feat=css-clip-path with a polyfill 
    https://stackoverflow.com/questions/52483173/is-it-possible-to-clip-a-side-of-a-div-with-css-like-so
  */

	/**********************************************
	 * Experimental sample for state analysis………… *
	**********************************************/

	const _kf1 = () => [
		{ transform: 'rotateY(0deg)', transformOrigin: 'left center 0' },
		{ transform: 'rotateY(-180deg)', transformOrigin: 'left center 0' }
	]

	const _kf3 = () => [
		{ transform: 'rotateY(0deg)', transformOrigin: 'right center 0' },
		{ transform: 'rotateY(180deg)', transformOrigin: 'right center 0' }
	]

	const _kf2 = () => [
		{ transform: 'rotateY(180deg)', transformOrigin: 'right center 0' },
		{ transform: 'rotateY(0deg)', transformOrigin: 'right center 0' }
	]

	const _kf4 = () => [
		{ transform: `rotateY(${_book.state.direction() * 180}deg)`, transformOrigin: 'left center 0' },
		{ transform: 'rotateY(0deg)', transformOrigin: 'left center 0' }
	]

	const _slide = () => [
		{ transform: 'translate3d(0px, 0px, 0px) rotate(0)', transformOrigin: 'left center 0' },
		{
			transform: `translate3d(${_book.state.direction() * _book.plotter.bounds.width / 4}px, 0px, 0px) rotate(0)`,
			transformOrigin: 'left center 0'
		}
	]

	const _opacity = () => [ { opacity: 1 }, { opacity: 0 } ]

	const _flutter = () => [
		{ transform: 'translate3d(0px, 0px, 0px)' },
		{ transform: `translate3d(${_book.state.direction() * -1 * 0.3}vw, 0px, 0px)` },
		{ transform: 'translate3d(0px, 0px, 0px)' }
	]

	const _options = ({
		duration = _book.options.duration,
		bezierCurvature = 'ease-in-out',
		direction = 'normal',
		iterations = 1,
    iterationStart = 0
	}) => ({
		currentTime: 0,
		duration: duration,
		easing: bezierCurvature,
		fill: 'both',
		iterations: iterations,
		direction: direction,
    iterationStart: iterationStart
	})

	const _openTheBook = () => {
		switch (_getCurrentPage(_book.targetPage)) {
			case 1:
				_book.state.animations.book = _book.node.animate(_slide(), _options({}))

				_book.state.animations.buttonOpacity = _book.buttons[1].animate(
					_opacity(),
					_options({ duration: _book.options.duration / 2 })
				)

				let animation1 = _book.frames[
					_setViewIndices(_getCurrentPage(_book.currentPage), _book.state.mode)[0]
				].childNodes[0].animate(_kf3(), _options({}))

				_book.frames[
					_getRangeIndices(_getCurrentPage(_book.currentPage), _book.state.mode).leftPageIndices[1]
				].childNodes[0].animate(_kf4(), _options({}))

				_book.frames[
					_getRangeIndices(_getCurrentPage(_book.currentPage), _book.state.mode).leftPageIndices[0]
				].childNodes[0]
					.animate(_kf2(), _options({}))
					.reverse()

				animation1.onfinish = (event) => {
					_book.state.animations.buttonFlutter = _book.buttons[0].animate(
						_flutter(),
						_options({
							iterations: Infinity,
							duration: 600,
							bezierCurvature: 'cubic-bezier(0.42, 0, 0.58, 1)'
						})
					)
					_setCurrentPage(_book.targetPage)
					_applyEventListenersOnBook(_isInitialized)
				}
				break
			case _book.frames.length:
				_book.state.animations.book = _book.node.animate(_slide(), _options({}))

				_book.state.animations.buttonOpacity = _book.buttons[0].animate(
					_opacity(),
					_options({ duration: _book.options.duration / 2 })
				)

				let animation2 = _book.frames[
					_setViewIndices(_getCurrentPage(_book.currentPage), _book.state.mode)[1]
				].childNodes[0].animate(_kf1(), _options({}))

				_book.frames[
					_getRangeIndices(_getCurrentPage(_book.currentPage), _book.state.mode).rightPageIndices[0]
				].childNodes[0].animate(_kf2(), _options({}))

				_book.frames[
					_getRangeIndices(_getCurrentPage(_book.currentPage), _book.state.mode).rightPageIndices[1]
				].childNodes[0]
					.animate(_kf4(), _options({}))
					.reverse()

				animation2.onfinish = (event) => {
					_book.state.animations.buttonFlutter = _book.buttons[1].animate(
						_flutter(),
						_options({
							iterations: Infinity,
							duration: 1000,
							bezierCurvature: 'cubic-bezier(0.42, 0, 0.58, 1)'
						})
					)
					_setCurrentPage(_book.targetPage)
					_applyEventListenersOnBook(_isInitialized)
				}
				break
			default:
        _turnTheBook(), _applyEventListenersOnBook(_isInitialized)

				break
		}
	}

	const _turnTheBook = () => {
		/********************************************
		 * Check if eventsCache has an event 		*
		 * queued up for this (addNode) mutation	*
		 *******************************************/

		let turnable = _book.eventsCache.shift()
		if (turnable !== undefined) {
			// console.log(_book.state.animations)

			if (_book.state.direction === _forward && _book.targetPage === 2) {
				_book.state.animations.book.reverse()
				_book.state.animations.buttonOpacity.reverse()
				_book.state.animations.buttonFlutter.cancel()
			}

			if (_book.state.direction === _backward && _book.targetPage === 1) {
				_book.state.animations.book.reverse()
				_book.state.animations.buttonOpacity.reverse()
				_book.state.animations.buttonFlutter.play()
			}

			if (_book.state.direction === _backward && _book.targetPage === _book.frames.length - 1) {
				_book.state.animations.book.reverse()
				_book.state.animations.buttonOpacity.reverse()
				_book.state.animations.buttonFlutter.play()
			}

			if (_book.state.direction === _forward && _book.targetPage === _book.frames.length) {
				_book.state.animations.book = _book.node.animate(_slide(), _options({}))

				_book.buttons[0].animate(_opacity(), _options({ duration: _book.options.duration / 2 }))

				_book.buttons[1].animate(
					_flutter(),
					_options({
						iterations: Infinity,
						duration: 600,
						bezierCurvature: 'cubic-bezier(0.42, 0, 0.58, 1)'
					})
				)

				_book.frames[_setViewIndices(_getCurrentPage(1), _book.state.mode)[1]].childNodes[0].animate(
					_kf1(),
					_options({})
				)
			}

			// console.log('Ω', _book.Ω())

			_raiseAnimatablePages(turnable.page, turnable.tick)
			_animateLeaf(turnable.page)
		}
	}

	const _raiseAnimatablePages = (pageNo, tick) => {
		switch (_book.state.direction) {
			case _forward:
				switch (_book.state.mode) {
					case 'portrait':
						break
					case 'landscape':
						if (!_book.state.isTurning) {
							_book.frames[_setViewIndices(_getCurrentPage(pageNo), _book.state.mode)[0]].style.zIndex =
								tick - _book.frames.length
						}
						_book.frames[_setViewIndices(_getCurrentPage(pageNo), _book.state.mode)[1]].style.zIndex = -tick
						break
					default:
						break
				}
				break
			case _backward:
				switch (_book.state.mode) {
					case 'portrait':
						break
					case 'landscape':
						if (!_book.state.isTurning) {
							_book.frames[_setViewIndices(_getCurrentPage(pageNo), _book.state.mode)[1]].style.zIndex =
								tick - _book.frames.length
						}
						_book.frames[_setViewIndices(_getCurrentPage(pageNo), _book.state.mode)[0]].style.zIndex = -tick
						break
					default:
						break
				}
				break
		}
	}

	const _animateLeaf = (pageNo) => {
		_book.turning.page = _getCurrentPage(pageNo)
		_book.turning.view = _setViewIndices(_getCurrentPage(pageNo), _book.state.mode).map((i) => i + 1) // Array of page numbers in the [View].

		_book.node.dispatchEvent(_book.turning)

		switch (_book.state.mode) {
			case 'portrait':
				break
			case 'landscape':
				switch (_book.state.direction) {
					case _forward:
						let animation1 = _book.frames[
							_setViewIndices(_getCurrentPage(pageNo), _book.state.mode)[1]
						].childNodes[0].animate(_kf1(), _options({}))

						let animation2 = _book.frames[
							_getRangeIndices(_getCurrentPage(pageNo), _book.state.mode).rightPageIndices[0]
						].childNodes[0].animate(_kf2(), _options({}))

						animation1.onfinish = (event) => {
							animation1.cancel()
							_setViewIndices(_getCurrentPage(pageNo), _book.state.mode).map((index) => {
								_removeElementFromDOMById(index + 1)
							})
						}

						animation2.onfinish = (event) => {
							_book.state.isTurning = false
							_setCurrentPage(_book.targetPage)


							_book.turned.page = _getCurrentPage(pageNo)
							_book.turned.view = _setViewIndices(_getCurrentPage(pageNo), _book.state.mode).map(
								(i) => i + 1
							) // Array of page numbers in the [View].
							_book.node.dispatchEvent(_book.turned)

							// console.log(_book.currentPage)
						}
						break
					case _backward:
						let animation3 = _book.frames[
							_setViewIndices(_getCurrentPage(pageNo), _book.state.mode)[0]
						].childNodes[0].animate(_kf3(), _options({}))

						let animation4 = _book.frames[
							_getRangeIndices(_getCurrentPage(pageNo), _book.state.mode).leftPageIndices[1]
						].childNodes[0].animate(_kf4(), _options({}))

						animation3.onfinish = (event) => {
							animation3.cancel()
							_setViewIndices(_getCurrentPage(pageNo), _book.state.mode).map((index) => {
								_removeElementFromDOMById(index + 1)
							})
						}

						animation4.onfinish = (event) => {
							_book.state.isTurning = false
							_setCurrentPage(_book.targetPage)

							_book.turned.page = _getCurrentPage(pageNo)
							_book.turned.view = _setViewIndices(_getCurrentPage(pageNo), _book.state.mode).map(
								(i) => i + 1
							) // Array of page numbers in the [View].
							_book.node.dispatchEvent(_book.turned)
						}
						break
				}

				break
		}
	}

	/*********************************
	 * @Helper methods  *
	***********************************/

	const _isTouch = () => 'ontouchstart' in w || n.MaxTouchPoints > 0 || n.msMaxTouchPoints > 0

	const _isEven = (number) => (number === parseFloat(number) ? !(number % 2) : void 0)

	const _isOdd = (number) => Math.abs(number % 2) === 1

	const _sign = (x) => (typeof x === 'number' ? (x ? (x < 0 ? -1 : 1) : x === x ? 1 : NaN) : NaN)

	const _leftCircularIndex = (currentIndex, index) =>
		parseInt(currentIndex) - parseInt(index) < 0
			? parseInt(_book.frames.length) + (parseInt(currentIndex) - parseInt(index))
			: parseInt(currentIndex) - parseInt(index)

	const _rightCircularIndex = (currentIndex, index) =>
		parseInt(currentIndex) + parseInt(index) >= parseInt(_book.frames.length)
			? parseInt(currentIndex) + parseInt(index) - parseInt(_book.frames.length)
			: parseInt(currentIndex) + parseInt(index)

	const π = Math.PI

	const _radians = (degrees) => degrees / 180 * π

	const _degrees = (radians) => radians / π * 180

	const Δ = (displacement) => {} // Displacement on mousedown + mousemove/touchstart + touchmove

	const λ = (angle) => {} // Cone angle

	// Definitions:
	// μ = Mu = `x-distance` in pixels from origin of the book. (for mousePosition/touchPoint)
	// ε = Epsilon = `y-distance` in pixels from origin of the book.
	// let Δ, θ, ω, Ω, α, β, δ = 0

	// Cone Angle λ (= )
	// const λ = (angle) => {

	const _direction = (id) =>
		id === undefined
			? _book.plotter.side === 'right' ? _forward : _backward
			: id === 'next' ? _forward : _backward

	const _forward = () => 1

	const _backward = () => -1

	const _isInitialized = () => {
		_book.state.isInitialized = true
	}

	// w.requestAnimationFrame = (() => w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || w.msRequestAnimationFrame || function (callback) { w.setTimeout(callback, 1E3 / 60) })()

	const _setUpMutationObservers = (callbacks) => {
		const mutationConfig = { attributes: false, childList: true, subtree: false }
		const mutator = (mutations) => {
			let isNodeAdded = false

			mutations.map((mutation) => {
				if (mutation.type === 'childList' && mutation.addedNodes.length) isNodeAdded = true
			})
			if (isNodeAdded) _book.state.isInitialized === true ? _turnTheBook() : _openTheBook()
		}
		const MO = new MutationObserver(mutator)

		MO.observe(_book.node, mutationConfig)

		// MO.disconnect() // TODO: If we decide implementing closeBook functionality.

		callbacks.map((callback) => {
			if (callback && typeof callback === 'function') callback()
		})
	}

	const _setUpPerformanceObservers = () => {
		/**************************************************************
		 * Figure out average full-contentful-paint (fcp) time			  *
		 * Returns an Ω value of the browser's rendering engine			  *
     * This data can be submitted for different browsers for a    *
     * better average.                                            *
		***************************************************************/
		if (!w.performance) return

		const PO = new PerformanceObserver((list) => {
			const Ω = list.getEntries().find(({ name }) => name === 'first-contentful-paint')

			// console.log(list.getEntries())
			// console.log('Ω', Ω)

			for (const entry of list.getEntries()) {
				// console.log(entry.name, entry.startTime, entry.duration)
			}
		})

		// Start observing the entry types you care about.
		PO.observe({ entryTypes: [ 'resource', 'paint' ] })
	}

	const _oneTimePrint = () => {
		switch (_getCurrentPage(_book.options.startPage)) {
			case 1:
				_book.currentPage = _getCurrentPage(parseInt(_book.options.startPage) + 1) // 2
				_book.targetPage = _getCurrentPage(_book.options.startPage) // 1

				_book.state.direction = _backward

				_printElementsToDOM(
					'view',
					_setViewIndices(_getCurrentPage(_book.currentPage), _book.state.mode).map(
						(index) => _book.frames[`${index}`]
					),
					_book.tick
				)

				_book.state.isTurning ? (_book.tick += 1) : (_book.tick = 1)

				_printElementsToDOM(
					'leftPages',
					_getRangeIndices(_getCurrentPage(_book.currentPage), _book.state.mode).leftPageIndices.map(
						(index) => _book.frames[`${index}`]
					),
					_book.tick
				)

				break
			case _book.frames.length:
				_book.currentPage = _getCurrentPage(parseInt(_book.options.startPage) - 1) // last but one
				_book.targetPage = _getCurrentPage(_book.options.startPage) // last
				_book.state.direction = _forward

				_printElementsToDOM(
					'view',
					_setViewIndices(_getCurrentPage(_book.currentPage), _book.state.mode).map(
						(index) => _book.frames[`${index}`]
					),
					_book.tick
				)

				_book.state.isTurning ? (_book.tick += 1) : (_book.tick = 1)

				_printElementsToDOM(
					'rightPages',
					_getRangeIndices(_getCurrentPage(_book.currentPage), _book.state.mode).rightPageIndices.map(
						(index) => _book.frames[`${index}`]
					),
					_book.tick
				)

				break
			default:
				_book.state.direction = _isEven(_getCurrentPage(_book.options.startPage)) ? _forward : _backward
				_book.state.isTurning ? (_book.tick += 1) : (_book.tick = 1)

				_book.currentPage = _isEven(_getCurrentPage(_book.options.startPage))
					? _getCurrentPage(parseInt(_book.options.startPage) - 1)
					: _getCurrentPage(parseInt(_book.options.startPage) + 1)

				_setCurrentPage(
					_isEven(_getCurrentPage(_book.options.startPage))
						? _getCurrentPage(parseInt(_book.options.startPage) - 1)
						: _getCurrentPage(parseInt(_book.options.startPage) + 1)
				)
        
				_book.targetPage = _target(_book.state.direction)

				_printElementsToDOM(
					'view',
					_setViewIndices(_getCurrentPage(_book.currentPage), _book.state.mode).map(
						(index) => _book.frames[`${index}`]
					),
					_book.tick
        )
        
				_book.state.direction === _forward
					? _printElementsToDOM(
							'rightPages',
							_getRangeIndices(_getCurrentPage(_book.currentPage), _book.state.mode).rightPageIndices.map(
								(index) => _book.frames[`${index}`]
							),
							_book.tick
						)
					: _printElementsToDOM(
							'leftPages',
							_getRangeIndices(_getCurrentPage(_book.currentPage), _book.state.mode).leftPageIndices.map(
								(index) => _book.frames[`${index}`]
							),
							_book.tick
						)

				_book.eventsCache.push({ tick: _book.tick, page: _book.currentPage }) // Pop via DOM mutations

				break
		}
	}

	const _stepper = (mode) => (mode === 'portrait' ? 1 : 2)

	const _step = () =>
		_book.state.direction === _forward
			? _isEven(_book.targetPage) ? _stepper(_book.state.mode) : 1
			: _isOdd(_book.targetPage) ? _stepper(_book.state.mode) : 1

	const _target = (direction) =>
		direction === _forward
			? _getCurrentPage(_book.targetPage + _step())
			: _getCurrentPage(_book.targetPage - _step())

	const _setCurrentPage = (pageNo) => {
		_book.targetPage = _book.currentPage = _getCurrentPage(pageNo)
		_saveLastPageAndHistory(_book.targetPage)
	}

	const _saveLastPageAndHistory = (lastPage) => {
		if (typeof Storage === 'undefined') return

		w.localStorage.setItem('lastPage', lastPage)
		w.history.replaceState(null, null, `${w.location.pathname}#${lastPage}`)

		// console.log(lastPage, _book.currentPage, _getCurrentPage(_book.targetPage))
		// w.localStorage.clear()
	}

	const _getCurrentPage = (pageNo) =>
		pageNo === undefined
			? 1
			: parseInt(pageNo) > 0 && parseInt(pageNo) < parseInt(_book.frames.length)
				? parseInt(pageNo) % parseInt(_book.frames.length)
				: parseInt(pageNo) % parseInt(_book.frames.length) === 0
					? parseInt(_book.frames.length)
					: parseInt(pageNo) < 0
						? parseInt(_book.frames.length) + 1 + parseInt(pageNo) % parseInt(_book.frames.length)
						: parseInt(pageNo) % parseInt(_book.frames.length) // Process current page cyclically.

	const _setViewIndices = (currentPage = 1, mode) => {
		let currentIndex = parseInt(currentPage) - 1

		switch (mode) {
			case 'portrait':
				return [ currentIndex ]
				break
			case 'landscape':
				if (_isEven(parseInt(currentPage))) {
					/***************************************
					* @range = _book.pages.slice(P , Q) where:
					* P & Q are integers
					* P & Q may or may not lie in the range 0 < VALUES < 2N (_book.length)
					****************************************/
					let q =
						parseInt(currentPage) + 1 > parseInt(_book.frames.length)
							? 1
							: (parseInt(currentPage) + 1) % parseInt(_book.frames.length)
					return [ currentIndex, q - 1 ]
				} else {
					let p =
						parseInt(currentPage) - 1 < 1
							? _book.frames.length
							: (parseInt(currentPage) - 1) % parseInt(_book.frames.length)
					return [ p - 1, currentIndex ]
				}
				break
		}
	}

	const _getRangeIndices = (currentPage = 1, mode) => {
		let currentIndex = parseInt(currentPage) - 1

		/*****************************************
		* @range = _book.pages.slice(P , Q) where:
		* P, Q, R, S are integers
		* P, Q, R, S may or may not lie in the range 0 < VALUE < 2N (_book.length)
		******************************************/

		let [ p, q, r, s ] = [ 0 ]

		switch (mode) {
			case 'portrait':
				// let p = (currentIndex - 2 < 0) ? parseInt(_book.frames.length) + (currentIndex - 2) : (currentIndex - 2)
				// let q = (currentIndex - 1 < 0) ? parseInt(_book.frames.length) + (currentIndex - 1) : (currentIndex - 1)
				// let r = (currentIndex + 1 >= parseInt(_book.frames.length)) ? (currentIndex + 1) - parseInt(_book.frames.length) : (currentIndex + 1)
				// let s = (currentIndex + 2 >= parseInt(_book.frames.length)) ? (currentIndex + 2) - parseInt(_book.frames.length) : (currentIndex + 2)
				p = _leftCircularIndex(currentIndex, 2)
				q = _leftCircularIndex(currentIndex, 1)
				r = _rightCircularIndex(currentIndex, 1)
				s = _rightCircularIndex(currentIndex, 2)
				break
			case 'landscape':
				if (_isEven(parseInt(currentPage))) {
					// let p = (currentIndex - 2 < 0) ? parseInt(_book.frames.length) + (currentIndex - 2) : (currentIndex - 2)
					// let q = (currentIndex - 1 < 0) ? parseInt(_book.frames.length) + (currentIndex - 1) : (currentIndex - 1)
					// let r = (currentIndex + 2 >= parseInt(_book.frames.length)) ? (currentIndex + 2) - parseInt(_book.frames.length) : (currentIndex + 2)
					// let s = (currentIndex + 3 >= parseInt(_book.frames.length)) ? (currentIndex + 3) - parseInt(_book.frames.length) : (currentIndex + 3)
					p = _leftCircularIndex(currentIndex, 2)
					q = _leftCircularIndex(currentIndex, 1)
					r = _rightCircularIndex(currentIndex, 2)
					s = _rightCircularIndex(currentIndex, 3)
				} else {
					// let p = (currentIndex - 3 < 0) ? parseInt(_book.frames.length) + (currentIndex - 3) : (currentIndex - 3)
					// let q = (currentIndex - 2 < 0) ? parseInt(_book.frames.length) + (currentIndex - 2) : (currentIndex - 2)
					// let r = (currentIndex + 1 >= parseInt(_book.frames.length)) ? currentIndex + 1 - parseInt(_book.frames.length) + 1 : (currentIndex + 1)
					// let s = (currentIndex + 2 >= parseInt(_book.frames.length)) ? currentIndex + 1 - parseInt(_book.frames.length) + 1 : (currentIndex + 2)
					p = _leftCircularIndex(currentIndex, 3)
					q = _leftCircularIndex(currentIndex, 2)
					r = _rightCircularIndex(currentIndex, 1)
					s = _rightCircularIndex(currentIndex, 2)
				}
				break
		}
		return { leftPageIndices: [ p, q ], rightPageIndices: [ r, s ] }
	}

	const _removeChildren = (node) => {
		node.innerHTML = ''
	}

	// const _removeElementsFromDOMByClassName = (className) => { node.getElementsByClassName(className).remove() }

	const _removeElementFromDOMById = (id) => {
		if (d.getElementById(id) !== null) d.getElementById(id).remove()
	}

	const _reifyFrames = (size) =>
		[
			...d
				.createRange()
				.createContextualFragment(
					new String(
						new Array(size).fill().map(
							(v, i) =>
								`<div class="page">
                    <iframe src="./build/renders/page-${i + 1}.html"></iframe>
                  </div>`
						)
					)
				)
				.querySelectorAll('div')
		].map((page, index) => _addPageWrappersAndBaseClasses(page, index))

	const _createFrame = (index, html) =>
		html === undefined
			? _addPageWrappersAndBaseClasses(
					d.createRange().createContextualFragment(
						`<div class="page">
                  <iframe src="./build/renders/page-${index}.html"></iframe>
              </div>`
					).firstChild,
					index
				)
			: _addPageWrappersAndBaseClasses(html, index)

	const _buttons = () => {
		_printElementsToDOM('buttons', _book.buttons)
	}

	const _printElementsToDOM = (type, elements, tick = _book.frames.length) => {
		const docfrag = d.createDocumentFragment()
		switch (type) {
			case 'buttons':
				elements.forEach((elem) => {
					docfrag.appendChild(elem)
				})
				break
			case 'view':
				let pageList = elements.map((page, currentIndex) => {
					return _applyStyles(page, currentIndex, type, tick)
				})
				pageList.forEach((page) => {
					docfrag.appendChild(page)
				})
				break
			case 'rightPages':
				let rightPages = elements.map((page, currentIndex) => {
					return _applyStyles(page, currentIndex, type, tick)
				})
				rightPages.forEach((page) => {
					docfrag.appendChild(page)
				})
				break
			case 'leftPages':
				let leftPages = elements.map((page, currentIndex) => {
					return _applyStyles(page, currentIndex, type, tick)
				})
				leftPages.forEach((page) => {
					docfrag.appendChild(page)
				})
				break
		}
		_book.node.appendChild(docfrag)
	}

	const _applyStyles = (pageObj, currentIndex, type, tick) => {
		let cssString = ''
		switch (_book.state.mode) {
			case 'portrait':
				switch (type) {
					case 'view':
						// inner
						cssString =
							'transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: 0 center 0;'
						pageObj.childNodes[0].style = cssString
						// wrapper
						cssString = 'z-index: 2; float: left; left: 0;'
						pageObj.style.cssText = cssString
						break
					case 'rightPages':
						// inner
						cssString =
							'transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: 0 center 0; visibility: visible;'
						pageObj.childNodes[0].style = cssString
						// wrapper
						cssString = 'float: left; left: 0; pointer-events:none; visibility: hidden;'
						cssString += _isEven(currentIndex) ? 'z-index: 1; ' : 'z-index: 0;'
						pageObj.style.cssText = cssString
						break
					case 'leftPages':
						// inner
						cssString =
							'transform: translate3d(0, 0, 0) rotateY(-90deg) skewY(0deg); transform-origin: 0 center 0; visibility: visible;'
						pageObj.childNodes[0].style = cssString
						// wrapper
						cssString = 'float: left; left: 0; pointer-events:none; visibility: hidden;'
						cssString += _isEven(currentIndex) ? 'z-index: 0; ' : 'z-index: 1;'
						pageObj.style.cssText = cssString
						break
				}
				break
			case 'landscape':
				switch (type) {
					case 'view':
						cssString = _isEven(currentIndex)
							? 'pointer-events:none; transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transitions: none;'
							: 'pointer-events:none; transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transitions: none;'
						pageObj.childNodes[0].style = cssString
						// wrapper
						cssString = `z-index: ${tick}; pointer-events:none;`
						cssString += _isEven(currentIndex) ? 'float: left; left: 0;' : 'float: right; right: 0;'
						pageObj.style = cssString
						break
					case 'rightPages':
						// inner
						cssString = 'pointer-events:none; transitions: none;'
						cssString += _isEven(currentIndex)
							? 'transform: translate3d(0, 0, 0) rotateY(180deg) skewY(0deg); transform-origin: right center 0px;'
							: 'transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: left center 0px;'
						pageObj.childNodes[0].style = cssString
						// wrapper
						cssString = 'pointer-events:none;'
						cssString += _isEven(currentIndex)
							? `z-index: ${tick}; float: left; left: 0;`
							: `z-index: ${tick - _book.frames.length}; float: right; right: 0;`
						pageObj.style.cssText = cssString
						break
					case 'leftPages':
						// inner
						cssString = 'pointer-events:none; transitions: none;'
						cssString += _isEven(currentIndex)
							? 'transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: right center 0px;'
							: 'transform: translate3d(0, 0, 0) rotateY(-180deg) skewY(0deg); transform-origin: left center 0px;'
						pageObj.childNodes[0].style = cssString

						// wrapper
						cssString = 'pointer-events:none;'
						// pageObj.style.cssText = cssString
						cssString += _isEven(currentIndex)
							? `z-index: ${tick - _book.frames.length}; float: left; left: 0;`
							: `z-index: ${tick}; float: right; right: 0; `
						pageObj.style.cssText = cssString
						break
				}
		}

		return pageObj
	}

	/* Dependent on nature of transition */
	const _addPageWrappersAndBaseClasses = (pageObj, currentIndex) => {
		_removeClassesFromElem(pageObj, 'page')
		let classes = `promoted inner page-${parseInt(currentIndex) + 1}`
		classes += _isEven(currentIndex) ? ' odd' : ' even'
		_addClassesToElem(pageObj, classes)
		let wrappedHtml = _wrapHtml(pageObj, currentIndex)
		return wrappedHtml
	}

	const _wrapHtml = (pageObj, currentIndex) => {
		const newWrapper = d.createElement('div')
		let classes = 'wrapper'
		classes += _isEven(currentIndex) ? ' odd' : ' even'
		_addClassesToElem(newWrapper, classes)
		newWrapper.setAttribute('id', parseInt(currentIndex) + 1)
		// newWrapper.setAttribute('data-page', parseInt(currentIndex) + 1)
		// Try :before :after pseudo elements instead.
		// newWrapper.innerHTML = `<div class="outer gradient"><h1> View[${parseInt(currentIndex) + 1}]  </h1></div>`
		newWrapper.appendChild(pageObj)
		return newWrapper
	}

	const _updateGeometricalPlotValues = (event) => {
		_book.plotter.side = event.pageX - _book.plotter.origin.x > 0 ? 'right' : 'left'
		_book.plotter.region = event.pageY - _book.plotter.origin.y > 0 ? 'lower' : 'upper'
		_book.plotter.quadrant =
			_book.plotter.side === 'right'
				? _book.plotter.region === 'upper' ? 'I' : 'IV'
				: _book.plotter.region === 'upper' ? 'II' : 'III'
		_book.plotter.currentPointerPosition = JSON.parse(
			`{ "x": "${event.pageX - _book.plotter.origin.x}", "y": "${_book.plotter.origin.y - event.pageY}" }`
		)
		_book.plotter.θ = Math.acos(
			parseInt(_book.plotter.currentPointerPosition.x) * 2 / parseInt(_book.plotter.bounds.width)
		) // θ in radians
		_book.plotter.μ = parseInt(_book.plotter.currentPointerPosition.x) // x-coord from origin.
		_book.plotter.ε = parseInt(_book.plotter.currentPointerPosition.y) // y-coord from origin.

		// console.log(_book.plotter.μ)
		// console.log(_sign(_book.plotter.μ))

		// _printCursorPosition(event) // delete this method call alongwith its function
		// _printGeometricalPremise() // delete this method call alongwith its function
	}

	/* this function can be erased upon release */
	const _printGeometricalPremise = () => {
		d.getElementById('pwidth').textContent = _book.plotter.bounds.width
		d.getElementById('pheight').textContent = _book.plotter.bounds.height
		d.getElementById('ptop').textContent = _book.plotter.bounds.top
		d.getElementById('pleft').textContent = _book.plotter.bounds.left
		d.getElementById('pright').textContent = _book.plotter.bounds.right
		d.getElementById('pbottom').textContent = _book.plotter.bounds.bottom
		d.getElementById('originX').textContent = _book.plotter.origin.x
		d.getElementById('originY').textContent = _book.plotter.origin.y
	}

	/* this function can be erased upon release */
	const _printCursorPosition = (event) => {
		d.getElementById('xaxis').textContent = _book.plotter.μ
		d.getElementById('yaxis').textContent = _book.plotter.ε
	}

	/*********************************
	 * Polyfills *
	**********************************/

	DOMTokenList.prototype.addmany = function(classes) {
		let classArr = classes.split(' ')
		for (let i = 0; i < classArr.length; i++) {
			this.add(classArr[i])
		}
	}

	DOMTokenList.prototype.removemany = function(classes) {
		let classArr = classes.split(' ')
		for (let i = 0; i < classArr.length; i++) {
			this.remove(classArr[i])
		}
	}

	const _addClassesToElem = (elem, classes) => {
		elem.classList.addmany(classes)
	}

	const _removeClassesFromElem = (elem, classes) => {
		elem.classList.removemany(classes)
	}

	Number.prototype.between = function(min, max) {
		return this > min && this < max
	}

	Element.prototype.remove = function() {
		this.parentElement.removeChild(this)
	}

	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
		for (let i = this.length - 1; i >= 0; i--) {
			if (this[i] && this[i].parentElement) {
				this[i].parentElement.removeChild(this[i])
			}
		}
	}

	const _viewer = {
		getMatch(query, usePolyfill) {
			return this.testMedia(query, usePolyfill).matches
		},

		onChange(query, cb, usePolyfill) {
			const res = this.testMedia(query, usePolyfill)

			res.addListener((changed) => {
				cb.apply({}, [ changed.matches, changed.media ])
			})
		},

		testMedia(query, usePolyfill) {
			const isMatchMediaSupported = !!(w && w.matchMedia) && !usePolyfill

			if (isMatchMediaSupported) {
				const res = w.matchMedia(query)
				return res
			} else {
				// ... add polyfill here or use polyfill.io for IE8 and below
			}
		}
	}

	_viewer.onChange('(orientation: landscape)', (match) => {
		_book.state.mode = match ? 'landscape' : 'portrait'
	})

	let _book = new Book()

	// console.log(_book)

	/********************************************
	 * Add `turned`, `turning` listeners to
	 * allow callback execution with context
	 * of the book, page & whatever is in view.
	 * We'll call these TurnListeners.
	********************************************/
	const _addTurnListeners = (eventName, callback) => {
		_book.node.addEventListener(eventName, callback, false)
	}

	class Superbook {
		execute(methodName, ...theArgs) {
			switch (methodName) {
				case 'length':
					return _book['getLength']()
				case 'mode':
					return _book['getMode']()
				case 'page':
					if (theArgs.length === 0) {
						return _book['page']()
					} else {
						_book['flipPage'](theArgs)
					}
					break
				default:
					return _book[methodName](theArgs)
			}
		}
		on(methodName, ...args) {
			switch (methodName) {
				case 'turning':
					return _addTurnListeners('turning', args[0])
				case 'turned':
					return _addTurnListeners('turned', args[0])
				default:
					return new Error('Event not found')
			}
		}
	}

	if (typeof w.Bookiza === 'undefined') {
		w.Bookiza = {
			init({ options }) {
				_initializeSuperBook({ options })
				return new Superbook() // Put Superbook object in global namespace.
			}
		}
	}
})(navigator, window, document)