import { css, customElement, html, internalProperty, LitElement }
	from "lit-element";
import {defaultStyles} from './defaultStyles';
import { reaction } from "mobx";
import { mob } from "./mobxStore";

@customElement('whole-page')
/**
 * The Page which will contain and surround our components
 */
export class WholePage extends LitElement {

	static styles = [
		defaultStyles,
		css`
			.container {
				height: 100%;
				padding: 40px;
				background: black;
				color: white;
			}
		`
	];

	@internalProperty() count: number = 0;

	connectedCallback(): void {
		super.connectedCallback()
		window.addEventListener('keyup', 
			() => {
				mob.increaseCount(); 
		
				// to update mob.count on screen
				this.requestUpdate(); 
			}
		)

		reaction(
			() => mob.count,
			(count) => { this.count = count}
		)
	}

	render() {
		return html`
			<div class="container">
				<p>Press any key</p>
				<p>The count should increase and..</p>
				<p>These two numbers should equal:</p>
				<p>Count in mobx class: ${mob.count}</p>
				<p>Count from reaction: ${this.count}</p>
			</div>
		`;
	}
}
