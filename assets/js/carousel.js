class Carousel{

  /**
 * This callback is displayed as part of the Requester class.
 *  
 * @callback moveCallBacks
 * @param {number} index
 */

  /**
     * @param (HTMLElement) element
     * @param (object) options
     * @param (Object) [options.slideToScroll = 1] nombre d'éléments a faire défilé
     * @param (Object) [options.slideToVisible = 1] nombre d'ékements visible dans une slide
     * @param (Object) [options.loop = false] Doit-on boucler en fin de carousel
     */

  constructor(element, options = {}) {
    this.element = element 
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1,
      loop: false
    }, options)
    let children = [].slice.call(element.children)
    this.isMobile = true
    this.currentItem = 0
    this.moveCallBacks = []
    
    // modification du dom
        this.root = this.createDivWithClass('carousel') 
    this.container = this.createDivWithClass('carousel__container')
    this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container)
    this.element.appendChild(this.root)
    this.items = children.map((child) => {
      let item = this.createDivWithClass('carousel__item') 
          item.appendChild(child)
          this.container.appendChild(item)
          return item
    });
    this.setStyle()
    this.createNavigation()

    // evenements
    this.moveCallBacks.forEach(cb => cb(0))
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.root.addEventListener('keyup', e => {
      if (e.key === 'ArrowRight' || e.key === "right") {
        this.next()
      } else if (e.key === 'ArrowLeft' || e.key === "left"){
        this.prev()
      }
    })
  }
    
    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle() {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = (( 100 / this.slidesVisible) / ratio) + "%");
    }
    
    createNavigation() {
      let nextBtn = this.createDivWithClass('carousel__next')
      let prevBtn = this.createDivWithClass('carousel__prev')
      this.root.appendChild(nextBtn)
      this.root.appendChild(prevBtn)
      
      nextBtn.addEventListener('click', this.next.bind(this))
      prevBtn.addEventListener('click', this.prev.bind(this))
      
      // if (this.options.loop === false){
      //   return
      // }

      this.onMove(index => {
        if (index === 0) {
          prevBtn.classList.add('carousel__prev--hidden')
        } else {
          prevBtn.classList.remove ('carousel__prev--hidden')
        }
        if (this.items[this.currentItem + this.slidesVisible] === undefined) {
           nextBtn.classList.add('carousel__next--hidden')
        } else {
          nextBtn.classList.remove ('carousel__next--hidden')
        }
      })
    }

  next() {
    this.goToItem(this.currentItem + this.slidesToScroll)
  }

  prev() {
     this.goToItem(this.currentItem - this.slidesToScroll)
  }

  /**
   * déplace le carousel vers l'élement ciblé
   * @param {number} index 
   */
  goToItem(index) {
    if (index < 0) {
       index = this.items.length - this.options.slidesVisible
    } else if(index >= this.items.length || (this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem)){
      index = 0
    }
    let translateX =  index * -100 / this.items.length
    this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
    this.currentItem = index
    this.moveCallBacks.forEach(cb => cb(index))
  }

  /**
   * 
   * @param {moveCallBacks} cb
   */

  onMove(cb) {
    this.moveCallBacks.push(cb)
  }

  onWindowResize() {
    let mobile = window.innerWidth < 800
    if (mobile !== this.isMobile) {
      this.isMobile = mobile
      this.setStyle()
      this.moveCallBacks.forEach(cb => cb(this.currentItem))
    }
  }
/**
 * 
 * @param {string} className 
 * @returns {HTMLElement}
 */
  
  createDivWithClass(className) {
    let div = document.createElement('div') 
    div.setAttribute('class', className)
    return div

  }

  /**
   * 
   * @returns {number}
   */
  
  get slidesToScroll() {
     return this.isMobile ? 1 : this.options.slidesToScroll
  }

  /**
   * 
   * @returns {number}
   */
  
  get slidesVisible() {
     return this.isMobile ? 1 : this.options.slidesVisible
  }
}

document.addEventListener('DOMContentLoaded', function () {

  new Carousel(document.querySelector('#carousel'), {
  slidesToScroll: 3,
  slidesVisible: 3,
  loop: false
  })
  
})
