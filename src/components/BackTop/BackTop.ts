import { LitElement, html, unsafeCSS } from 'lit'
import { state, property, customElement } from 'lit/decorators.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg'
import icon from '../../assets/arrow-down.svg?raw'
import styles from './BackTop.scss'

/**
 * A floating Button that scrolls you back top.
 *
 * @slot default - This element has a slot
 * @csspart base - The Base
 * @csspart icon - The icon
 * @cssprop --background - Background Color. 
 * @cssprop --color - Icon color.
 */
@customElement('back-top')
export class BackTop extends LitElement {
  static styles = unsafeCSS(styles)

  /** Animation in. */
  @property() animationIn: string = ''

  /** Animation out. */
  @property() animationOut: string = ''

  /**
   * When to show element in px from top.
   */
  @property() threshold: number = 200

  /** Where to scroll to in px from top. */
  @property() top: number = 0

  /** Use smooth scroll or instant scroll. */
  @property() smoothScroll: boolean = true

  /** Use smooth scroll or instant scroll. */
  @property({ reflect: true, type: Boolean }) hidden: boolean = true

  /** Build scroll settings object. */
  @state() private scrollOptions: Object = {
    top: this.top,
    ...(this.smoothScroll ? { behavior: 'smooth' } : {}),
  }

  /** Check if component should be visible and add animate after it was visible once */
  private setVisibility() {
    const hidden = !(document.documentElement.scrollTop >= this.threshold)
    if (!hidden) this.classList.add('animate')
    this.hidden = !!hidden
  }

  /** Scroll top */
  private scrollUp() {
    window.scrollTo(this.scrollOptions)
    this.setVisibility()
  }

  /** Click handler */
  private _onClick() {
    this.scrollUp()
  }

  /** KeyPress handler */
  private _onKeyDown(e: KeyboardEvent) {
    if (e.key !== ' ' && e.key !== 'Enter') return
    e.preventDefault()
    this.scrollUp()
  }

  /** Use Arrow function, thus this is this component and not window */
  private _onScroll = () => {
    this.setVisibility()
  }

  /** @internal */
  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('scroll', this._onScroll)
  }

  /** @internal */
  firstUpdated() {
    this.setVisibility()
  }

  /** @internal */
  disconnectedCallback() {
    window.removeEventListener('scroll', this._onScroll)
    super.disconnectedCallback()
  }

  /** @internal */
  render() {
    let dynamicStyle = this.animationIn
      ? `
    :host(.animate) {
      --animation-in: ${this.animationIn}
    }`
      : ''
    dynamicStyle += this.animationOut
      ? `
    :host(.animate) {
      --animation-out: ${this.animationOut}
    }`
      : ''

    return html`
      <style>
        ${dynamicStyle}
      </style>
      <div
        @click=${this._onClick}
        @keydown=${this._onKeyDown}
        tabindex="0"
        part="base"
      >
        <slot part="icon"> ${unsafeSVG(icon)} </slot>
      </div>
    `
  }
}
