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
    this.currentItem = 0
        this.root = this.createDivWithClass('carousel') 
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
    this.element.appendChild(this.root)
    this.moveCallBacks = []
    this.items = children.map((child) => {
      let item = this.createDivWithClass('carousel__item') 
          item.appendChild(child)
          this.container.appendChild(item)
          return item
    });
    this.setStyle()
    this.createNavigation()
    this.moveCallBacks.forEach(cb => cb(0))
  }
    
    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle() {
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = (( 100 / this.options.slidesVisible) / ratio) + "%");
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
        if (this.items[this.currentItem + this.options.slidesVisible] === undefined) {
           nextBtn.classList.add('carousel__next--hidden')
        } else {
          nextBtn.classList.remove ('carousel__next--hidden')
        }
      })
    }

  next() {
    this.goToItem(this.currentItem + this.options.slidesToScroll)
  }

  prev() {
     this.goToItem(this.currentItem - this.options.slidesToScroll)
  }

  /**
   * déplace le carousel vers l'élement ciblé
   * @param {number} index 
   */
  goToItem(index) {
    if (index < 0) {
       index = this.items.length - this.options.slidesVisible
    } else if(index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined){
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
}

document.addEventListener('DOMContentLoaded', function () {

  new Carousel(document.querySelector('#carousel'), {
  slidesToScroll: 2,
  slidesVisible: 2,
  loop: false
  })
  
})
