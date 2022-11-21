import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import type { ApiClient } from '../../../ApiClient';

export type HelixEventSubSubscriptionStatus =
	| 'enabled'
	| 'webhook_callback_verification_pending'
	| 'webhook_callback_verification_failed'
	| 'websocket_disconnected'
	| 'notification_failures_exceeded'
	| 'authorization_revoked'
	| 'user_removed';

/** @private */
export interface HelixEventSubWebHookTransportData {
	/**
	 * The type of transport.
	 */
	method: 'webhook';

	/**
	 * The callback URL to send event notifications to.
	 */
	callback: string;
}

/** @private */
export interface HelixEventSubWebSocketTransportData {
	/**
	 * The type of transport.
	 */
	method: 'websocket';

	/**
	 * The callback URL to send event notifications to.
	 */
	session_id: string;

	/**
	 * The time when the client initiated the socket connection.
	 */
	connected_at: string;
}

/** @private */
export type HelixEventSubTransportData = HelixEventSubWebHookTransportData | HelixEventSubWebSocketTransportData;

/** @private */
export interface HelixEventSubSubscriptionData {
	id: string;
	status: HelixEventSubSubscriptionStatus;
	type: string;
	cost: number;
	version: string;
	condition: Record<string, unknown>;
	created_at: string;
	transport: HelixEventSubTransportData;
}

/**
 * An EventSub subscription.
 */
@rtfm<HelixEventSubSubscription>('api', 'HelixEventSubSubscription', 'id')
export class HelixEventSubSubscription extends DataObject<HelixEventSubSubscriptionData> {
	@Enumerable(false) private readonly _client: ApiClient;

	/** @private */
	constructor(data: HelixEventSubSubscriptionData, client: ApiClient) {
		super(data);
		this._client = client;
	}

	/**
	 * The ID of the subscription.
	 */
	get id(): string {
		return this[rawDataSymbol].id;
	}

	/**
	 * The status of the subscription.
	 */
	get status(): HelixEventSubSubscriptionStatus {
		return this[rawDataSymbol].status;
	}

	/**
	 * The event type that the subscription is listening to.
	 */
	get type(): string {
		return this[rawDataSymbol].type;
	}

	/**
	 * The cost of the subscription.
	 */
	get cost(): number {
		return this[rawDataSymbol].cost;
	}

	/**
	 * The condition of the subscription.
	 */
	get condition(): Record<string, unknown> {
		return this[rawDataSymbol].condition;
	}

	/**
	 * The date and time of creation of the subscription.
	 */
	get creationDate(): Date {
		return new Date(this[rawDataSymbol].created_at);
	}

	/**
	 * End the EventSub subscription.
	 */
	async unsubscribe(): Promise<void> {
		await this._client.eventSub.deleteSubscription(this[rawDataSymbol].id);
	}

	/** @private */
	get _transport(): HelixEventSubTransportData {
		return this[rawDataSymbol].transport;
	}

	/** @private */
	set _status(status: HelixEventSubSubscriptionStatus) {
		this[rawDataSymbol].status = status;
	}
}
