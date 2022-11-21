import { getPortPromise } from '@d-fischer/portfinder';
import { Enumerable } from '@d-fischer/shared-utils';
import { ConnectionAdapter } from '@twurple/eventsub-http';
import { connect } from 'ngrok';

/**
 * A connection adapter that uses ngrok to make local testing easy.
 */
export class NgrokAdapter extends ConnectionAdapter {
	@Enumerable(false) private _listenerPortPromise?: Promise<number>;
	@Enumerable(false) private _hostNamePromise?: Promise<string>;

	/** @protected */
	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	get connectUsingSsl(): boolean {
		return true;
	}

	/** @protected */
	async getListenerPort(): Promise<number> {
		if (!this._listenerPortPromise) {
			this._listenerPortPromise = getPortPromise();
		}

		return await this._listenerPortPromise;
	}

	/** @protected */
	async getHostName(): Promise<string> {
		const listenerPort = await this.getListenerPort();

		if (!this._hostNamePromise) {
			this._hostNamePromise = connect({ addr: listenerPort }).then(url => url.replace(/^https?:\/\/|\/$/, ''));
		}

		return await this._hostNamePromise;
	}
}
