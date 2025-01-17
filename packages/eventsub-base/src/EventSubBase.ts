import type { Logger, LoggerOptions } from '@d-fischer/logger';
import { createLogger } from '@d-fischer/logger';
import { Enumerable } from '@d-fischer/shared-utils';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
import type {
	ApiClient,
	HelixEventSubSubscription,
	HelixEventSubTransportOptions,
	UserIdResolvable
} from '@twurple/api';
import { extractUserId } from '@twurple/api';
import { rtfm } from '@twurple/common';
import type { EventSubChannelBanEvent } from './events/EventSubChannelBanEvent';
import type { EventSubChannelCheerEvent } from './events/EventSubChannelCheerEvent';
import type { EventSubChannelFollowEvent } from './events/EventSubChannelFollowEvent';
import type { EventSubChannelGoalBeginEvent } from './events/EventSubChannelGoalBeginEvent';
import type { EventSubChannelGoalEndEvent } from './events/EventSubChannelGoalEndEvent';
import type { EventSubChannelGoalProgressEvent } from './events/EventSubChannelGoalProgressEvent';
import type { EventSubChannelHypeTrainBeginEvent } from './events/EventSubChannelHypeTrainBeginEvent';
import type { EventSubChannelHypeTrainEndEvent } from './events/EventSubChannelHypeTrainEndEvent';
import type { EventSubChannelHypeTrainProgressEvent } from './events/EventSubChannelHypeTrainProgressEvent';
import type { EventSubChannelModeratorEvent } from './events/EventSubChannelModeratorEvent';
import type { EventSubChannelPollBeginEvent } from './events/EventSubChannelPollBeginEvent';
import type { EventSubChannelPollEndEvent } from './events/EventSubChannelPollEndEvent';
import type { EventSubChannelPollProgressEvent } from './events/EventSubChannelPollProgressEvent';
import type { EventSubChannelPredictionBeginEvent } from './events/EventSubChannelPredictionBeginEvent';
import type { EventSubChannelPredictionEndEvent } from './events/EventSubChannelPredictionEndEvent';
import type { EventSubChannelPredictionLockEvent } from './events/EventSubChannelPredictionLockEvent';
import type { EventSubChannelPredictionProgressEvent } from './events/EventSubChannelPredictionProgressEvent';
import type { EventSubChannelRaidEvent } from './events/EventSubChannelRaidEvent';
import type { EventSubChannelRedemptionAddEvent } from './events/EventSubChannelRedemptionAddEvent';
import type { EventSubChannelRedemptionUpdateEvent } from './events/EventSubChannelRedemptionUpdateEvent';
import type { EventSubChannelRewardEvent } from './events/EventSubChannelRewardEvent';
import type { EventSubChannelSubscriptionEndEvent } from './events/EventSubChannelSubscriptionEndEvent';
import type { EventSubChannelSubscriptionEvent } from './events/EventSubChannelSubscriptionEvent';
import type { EventSubChannelSubscriptionGiftEvent } from './events/EventSubChannelSubscriptionGiftEvent';
import type { EventSubChannelSubscriptionMessageEvent } from './events/EventSubChannelSubscriptionMessageEvent';
import type { EventSubChannelUnbanEvent } from './events/EventSubChannelUnbanEvent';
import type { EventSubChannelUpdateEvent } from './events/EventSubChannelUpdateEvent';
import type { EventSubExtensionBitsTransactionCreateEvent } from './events/EventSubExtensionBitsTransactionCreateEvent';
import type { EventSubStreamOfflineEvent } from './events/EventSubStreamOfflineEvent';
import type { EventSubStreamOnlineEvent } from './events/EventSubStreamOnlineEvent';
import type { EventSubUserAuthorizationGrantEvent } from './events/EventSubUserAuthorizationGrantEvent';
import type { EventSubUserAuthorizationRevokeEvent } from './events/EventSubUserAuthorizationRevokeEvent';
import type { EventSubUserUpdateEvent } from './events/EventSubUserUpdateEvent';
import { EventSubChannelBanSubscription } from './subscriptions/EventSubChannelBanSubscription';
import { EventSubChannelCheerSubscription } from './subscriptions/EventSubChannelCheerSubscription';
import { EventSubChannelFollowSubscription } from './subscriptions/EventSubChannelFollowSubscription';
import { EventSubChannelGoalBeginSubscription } from './subscriptions/EventSubChannelGoalBeginSubscription';
import { EventSubChannelGoalEndSubscription } from './subscriptions/EventSubChannelGoalEndSubscription';
import { EventSubChannelGoalProgressSubscription } from './subscriptions/EventSubChannelGoalProgressSubscription';
import { EventSubChannelHypeTrainBeginSubscription } from './subscriptions/EventSubChannelHypeTrainBeginSubscription';
import { EventSubChannelHypeTrainEndSubscription } from './subscriptions/EventSubChannelHypeTrainEndSubscription';
import { EventSubChannelHypeTrainProgressSubscription } from './subscriptions/EventSubChannelHypeTrainProgressSubscription';
import { EventSubChannelModeratorAddSubscription } from './subscriptions/EventSubChannelModeratorAddSubscription';
import { EventSubChannelModeratorRemoveSubscription } from './subscriptions/EventSubChannelModeratorRemoveSubscription';
import { EventSubChannelPollBeginSubscription } from './subscriptions/EventSubChannelPollBeginSubscription';
import { EventSubChannelPollEndSubscription } from './subscriptions/EventSubChannelPollEndSubscription';
import { EventSubChannelPollProgressSubscription } from './subscriptions/EventSubChannelPollProgressSubscription';
import { EventSubChannelPredictionBeginSubscription } from './subscriptions/EventSubChannelPredictionBeginSubscription';
import { EventSubChannelPredictionEndSubscription } from './subscriptions/EventSubChannelPredictionEndSubscription';
import { EventSubChannelPredictionLockSubscription } from './subscriptions/EventSubChannelPredictionLockSubscription';
import { EventSubChannelPredictionProgressSubscription } from './subscriptions/EventSubChannelPredictionProgressSubscription';
import { EventSubChannelRaidSubscription } from './subscriptions/EventSubChannelRaidSubscription';
import { EventSubChannelRedemptionAddSubscription } from './subscriptions/EventSubChannelRedemptionAddSubscription';
import { EventSubChannelRedemptionUpdateSubscription } from './subscriptions/EventSubChannelRedemptionUpdateSubscription';
import { EventSubChannelRewardAddSubscription } from './subscriptions/EventSubChannelRewardAddSubscription';
import { EventSubChannelRewardRemoveSubscription } from './subscriptions/EventSubChannelRewardRemoveSubscription';
import { EventSubChannelRewardUpdateSubscription } from './subscriptions/EventSubChannelRewardUpdateSubscription';
import { EventSubChannelSubscriptionEndSubscription } from './subscriptions/EventSubChannelSubscriptionEndSubscription';
import { EventSubChannelSubscriptionGiftSubscription } from './subscriptions/EventSubChannelSubscriptionGiftSubscription';
import { EventSubChannelSubscriptionMessageSubscription } from './subscriptions/EventSubChannelSubscriptionMessageSubscription';
import { EventSubChannelSubscriptionSubscription } from './subscriptions/EventSubChannelSubscriptionSubscription';
import { EventSubChannelUnbanSubscription } from './subscriptions/EventSubChannelUnbanSubscription';
import { EventSubChannelUpdateSubscription } from './subscriptions/EventSubChannelUpdateSubscription';
import { EventSubExtensionBitsTransactionCreateSubscription } from './subscriptions/EventSubExtensionBitsTransactionCreateSubscription';
import { EventSubStreamOfflineSubscription } from './subscriptions/EventSubStreamOfflineSubscription';
import { EventSubStreamOnlineSubscription } from './subscriptions/EventSubStreamOnlineSubscription';
import type { EventSubSubscription } from './subscriptions/EventSubSubscription';
import { EventSubUserAuthorizationGrantSubscription } from './subscriptions/EventSubUserAuthorizationGrantSubscription';
import { EventSubUserAuthorizationRevokeSubscription } from './subscriptions/EventSubUserAuthorizationRevokeSubscription';
import { EventSubUserUpdateSubscription } from './subscriptions/EventSubUserUpdateSubscription';

const numberRegex = /^\d+$/;

/**
 * The base EventSub configuration.
 */
export interface EventSubBaseConfig {
	/**
	 * The API client that will be used to subscribe to events.
	 */
	apiClient: ApiClient;

	/**
	 * Options to pass to the logger.
	 */
	logger?: Partial<LoggerOptions>;
}

/**
 * @private
 * @hideProtected
 */
@rtfm('eventsub-base', 'EventSubBase')
export abstract class EventSubBase extends EventEmitter {
	@Enumerable(false) protected readonly _subscriptions = new Map<string, EventSubSubscription>();
	@Enumerable(false) protected readonly _subscriptionsByTwitchId = new Map<string, EventSubSubscription>();
	@Enumerable(false) protected _twitchSubscriptions = new Map<string, HelixEventSubSubscription>();

	/** @private */ @Enumerable(false) readonly _apiClient: ApiClient;
	/** @private */ readonly _logger: Logger;

	/**
	 * Fires when a subscription is revoked.
	 *
	 * @eventListener
	 *
	 * @param subscription The subscription that was revoked.
	 */
	readonly onRevoke = this.registerEvent<[subscription: EventSubSubscription]>();

	protected _readyToSubscribe = false;

	constructor(config: EventSubBaseConfig) {
		super();

		this._apiClient = config.apiClient;
		this._logger = createLogger({
			name: 'twurple:eventsub',
			emoji: true,
			...config.logger
		});
	}

	/** @private */
	_dropSubscription(id: string): void {
		this._subscriptions.delete(id);
	}

	/** @private */
	_dropTwitchSubscription(id: string): void {
		if (this._twitchSubscriptions.has(id)) {
			const data = this._twitchSubscriptions.get(id)!;
			this._twitchSubscriptions.delete(id);
			this._subscriptionsByTwitchId.delete(data.id);
		}
	}

	/** @private */
	_registerTwitchSubscription(subscription: EventSubSubscription, data: HelixEventSubSubscription): void {
		this._twitchSubscriptions.set(subscription.id, data);
		this._subscriptionsByTwitchId.set(data.id, subscription);
	}

	/**
	 * Subscribes to events representing a stream going live.
	 *
	 * @param user The user for which to get notifications about their streams going live.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToStreamOnlineEvents(
		user: UserIdResolvable,
		handler: (event: EventSubStreamOnlineEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToStreamOnlineEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}

		return await this._genericSubscribe(EventSubStreamOnlineSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events representing a stream going offline.
	 *
	 * @param user The user for which to get notifications about their streams going offline.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToStreamOfflineEvents(
		user: UserIdResolvable,
		handler: (event: EventSubStreamOfflineEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToStreamOfflineEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}

		return await this._genericSubscribe(EventSubStreamOfflineSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events representing a change in channel metadata, e.g. stream title or category.
	 *
	 * @param user The user for which to get notifications about updates.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelUpdateEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelUpdateEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelUpdateEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelUpdateSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user following a channel.
	 *
	 * @param user The user for which to get notifications about their followers.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelFollowEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelFollowEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelFollowEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelFollowSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user subscribing to a channel.
	 *
	 * @param user The user for which to get notifications for about their subscribers.
	 * @param handler  The function that will be called for any new notifications.
	 */
	async subscribeToChannelSubscriptionEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelSubscriptionEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelSubscriptionEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelSubscriptionSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user gifting a subscription to a channel to someone else.
	 *
	 * @param user The user for which to get notifications for about subscriptions people gift in their channel.
	 * @param handler  The function that will be called for any new notifications.
	 */
	async subscribeToChannelSubscriptionGiftEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelSubscriptionGiftEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelSubscriptionGiftEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelSubscriptionGiftSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user's subscription to a channel being announced.
	 *
	 * @param user The user for which to get notifications for about announced subscriptions.
	 * @param handler  The function that will be called for any new notifications.
	 */
	async subscribeToChannelSubscriptionMessageEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelSubscriptionMessageEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelSubscriptionMessageEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelSubscriptionMessageSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user's subscription to a channel ending.
	 *
	 * @param user The user for which to get notifications for about ending subscriptions.
	 * @param handler  The function that will be called for any new notifications.
	 */
	async subscribeToChannelSubscriptionEndEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelSubscriptionEndEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelSubscriptionEndEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelSubscriptionEndSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user cheering some bits.
	 *
	 * @param user The user for which to get notifications for about cheers they get.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelCheerEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelCheerEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelCheerEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelCheerSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user getting banned from a channel.
	 *
	 * @param user The user for which to get notifications for when users get banned in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelBanEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelBanEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelBanEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelBanSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user getting unbanned from a channel.
	 *
	 * @param user The user for which to get notifications for when users get unbanned in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelUnbanEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelUnbanEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelUnbanEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelUnbanSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user getting moderator permissions in a channel.
	 *
	 * @param user The user for which to get notifications for when users get moderator permissions in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelModeratorAddEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelModeratorEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelModeratorAddEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelModeratorAddSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a user losing moderator permissions in a channel.
	 *
	 * @param user The user for which to get notifications for when users lose moderator permissions in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelModeratorRemoveEvents(
		user: UserIdResolvable,
		handler: (event: EventSubChannelModeratorEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelModeratorRemoveEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelModeratorRemoveSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a broadcaster raiding another broadcaster.
	 *
	 * @param user The broadcaster for which to get outgoing raid notifications.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRaidEventsFrom(
		user: UserIdResolvable,
		handler: (event: EventSubChannelRaidEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelRaidEventsFrom: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRaidSubscription, handler, this, userId, 'from');
	}

	/**
	 * Subscribes to events that represent a broadcaster being raided by another broadcaster.
	 *
	 * @param user The broadcaster for which to get incoming raid notifications.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRaidEventsTo(
		user: UserIdResolvable,
		handler: (event: EventSubChannelRaidEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelRaidEventsTo: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRaidSubscription, handler, this, userId, 'to');
	}

	/**
	 * Subscribes to events that represent a Channel Points reward being added to a channel.
	 *
	 * @param user The user for which to get notifications for when they add a reward to their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRewardAddEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelRewardEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelRewardAddEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRewardAddSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a Channel Points reward being updated.
	 *
	 * @param user The user for which to get notifications for when they update a reward.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRewardUpdateEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelRewardEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToRewardUpdateEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRewardUpdateSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a specific Channel Points reward being updated.
	 *
	 * @param user The user for which to get notifications for when they update the reward.
	 * @param rewardId The ID of the reward for which to get notifications when it is updated.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRewardUpdateEventsForReward(
		user: UserIdResolvable,
		rewardId: string,
		handler: (data: EventSubChannelRewardEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToRewardUpdateEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRewardUpdateSubscription, handler, this, userId, rewardId);
	}

	/**
	 * Subscribes to events that represent a Channel Points reward being removed.
	 *
	 * @param user The user for which to get notifications for when they remove a reward.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRewardRemoveEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelRewardEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToRewardRemoveEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRewardRemoveSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a specific Channel Points reward being removed.
	 *
	 * @param user The user for which to get notifications for when they remove the reward.
	 * @param rewardId The ID of the reward to get notifications for when it is removed.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRewardRemoveEventsForReward(
		user: UserIdResolvable,
		rewardId: string,
		handler: (data: EventSubChannelRewardEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToRewardRemoveEventsForReward: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRewardRemoveSubscription, handler, this, userId, rewardId);
	}

	/**
	 * Subscribes to events that represents a Channel Points reward being redeemed.
	 *
	 * @param user The user for which to get notifications for when their rewards are redeemed.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRedemptionAddEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelRedemptionAddEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelRedemptionEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRedemptionAddSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a specific Channel Points reward being redeemed.
	 *
	 * @param user The user for which to get notifications when their reward is redeemed.
	 * @param rewardId The ID of the reward for which to get notifications when it is redeemed.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRedemptionAddEventsForReward(
		user: UserIdResolvable,
		rewardId: string,
		handler: (data: EventSubChannelRedemptionAddEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToRedemptionAddEventsForReward: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRedemptionAddSubscription, handler, this, userId, rewardId);
	}

	/**
	 * Subscribes to events that represent a Channel Points reward being updated by a broadcaster.
	 *
	 * @param user The user for which to get notifications for when they update a reward.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRedemptionUpdateEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelRedemptionUpdateEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelRedemptionUpdateEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelRedemptionUpdateSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a specific Channel Points reward being updated by a broadcaster.
	 *
	 * @param user The user for which to get notifications for when they update the reward.
	 * @param rewardId The ID of the reward for which to get notifications when it gets updated.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelRedemptionUpdateEventsForReward(
		user: UserIdResolvable,
		rewardId: string,
		handler: (data: EventSubChannelRedemptionUpdateEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelRedemptionUpdateEventsForReward: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(
			EventSubChannelRedemptionUpdateSubscription,
			handler,
			this,
			userId,
			rewardId
		);
	}

	/**
	 * Subscribes to events that represent a poll starting in a channel.
	 *
	 * @param user The broadcaster for which to receive poll begin events.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelPollBeginEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelPollBeginEvent) => void
	): Promise<EventSubSubscription> {
		const broadcasterId = extractUserId(user);

		if (!numberRegex.test(broadcasterId)) {
			this._logger.warn(
				'subscribeToChannelPollBeginEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelPollBeginSubscription, handler, this, broadcasterId);
	}

	/**
	 * Subscribes to events that represent a poll being voted on in a channel.
	 *
	 * @param user The broadcaster for which to receive poll progress events.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelPollProgressEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelPollProgressEvent) => void
	): Promise<EventSubSubscription> {
		const broadcasterId = extractUserId(user);

		if (!numberRegex.test(broadcasterId)) {
			this._logger.warn(
				'subscribeToChannelPollProgressEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelPollProgressSubscription, handler, this, broadcasterId);
	}

	/**
	 * Subscribes to events that represent a poll ending in a channel.
	 *
	 * @param user The broadcaster for which to receive poll end events.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelPollEndEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelPollEndEvent) => void
	): Promise<EventSubSubscription> {
		const broadcasterId = extractUserId(user);

		if (!numberRegex.test(broadcasterId)) {
			this._logger.warn(
				'subscribeToChannelPollEndEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelPollEndSubscription, handler, this, broadcasterId);
	}

	/**
	 * Subscribes to events that represent a prediction starting in a channel.
	 *
	 * @param user The broadcaster for which to receive prediction begin events.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelPredictionBeginEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelPredictionBeginEvent) => void
	): Promise<EventSubSubscription> {
		const broadcasterId = extractUserId(user);

		if (!numberRegex.test(broadcasterId)) {
			this._logger.warn(
				'subscribeToChannelPredictionBeginEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelPredictionBeginSubscription, handler, this, broadcasterId);
	}

	/**
	 * Subscribes to events that represent a prediction being voted on in a channel.
	 *
	 * @param user The broadcaster for which to receive prediction progress events.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelPredictionProgressEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelPredictionProgressEvent) => void
	): Promise<EventSubSubscription> {
		const broadcasterId = extractUserId(user);

		if (!numberRegex.test(broadcasterId)) {
			this._logger.warn(
				'subscribeToChannelPredictionProgressEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(
			EventSubChannelPredictionProgressSubscription,
			handler,
			this,
			broadcasterId
		);
	}

	/**
	 * Subscribes to events that represent a prediction being locked in a channel.
	 *
	 * @param user The broadcaster for which to receive prediction lock events.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelPredictionLockEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelPredictionLockEvent) => void
	): Promise<EventSubSubscription> {
		const broadcasterId = extractUserId(user);

		if (!numberRegex.test(broadcasterId)) {
			this._logger.warn(
				'subscribeToChannelPredictionLockEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelPredictionLockSubscription, handler, this, broadcasterId);
	}

	/**
	 * Subscribes to events that represent a prediction ending in a channel.
	 *
	 * @param user The broadcaster for which to receive prediction end events.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelPredictionEndEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelPredictionEndEvent) => void
	): Promise<EventSubSubscription> {
		const broadcasterId = extractUserId(user);

		if (!numberRegex.test(broadcasterId)) {
			this._logger.warn(
				'subscribeToChannelPredictionEndEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelPredictionEndSubscription, handler, this, broadcasterId);
	}

	/**
	 * Subscribes to events that represent a Goal beginning.
	 *
	 * @param user The user for which to get notifications about Goals in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelGoalBeginEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelGoalBeginEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelGoalBeginEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelGoalBeginSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent progress in a Goal in a channel.
	 *
	 * @param user The user for which to get notifications about Goals in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelGoalProgressEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelGoalProgressEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelGoalProgressEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelGoalProgressSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent the end of a Goal in a channel.
	 *
	 * @param user The user for which to get notifications about Goals in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelGoalEndEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelGoalEndEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelGoalEndEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelGoalEndSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a Hype Train beginning.
	 *
	 * @param user The user for which to get notifications about Hype Trains in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelHypeTrainBeginEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelHypeTrainBeginEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelHypeTrainBeginEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelHypeTrainBeginSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent progress in a Hype Train in a channel.
	 *
	 * @param user The user for which to get notifications about Hype Trains in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelHypeTrainProgressEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelHypeTrainProgressEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelHypeTrainProgressEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelHypeTrainProgressSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent the end of a Hype Train in a channel.
	 *
	 * @param user The user for which to get notifications about Hype Trains in their channel.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToChannelHypeTrainEndEvents(
		user: UserIdResolvable,
		handler: (data: EventSubChannelHypeTrainEndEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToChannelHypeTrainEndEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubChannelHypeTrainEndSubscription, handler, this, userId);
	}

	/**
	 * Subscribes to events that represent a Bits transaction in an extension.
	 *
	 * @param clientId The Client ID of the extension for which to get notifications for about Bits transactions.
	 * @param handler  The function that will be called for any new notifications.
	 */
	async subscribeToExtensionBitsTransactionCreateEvents(
		clientId: string,
		handler: (event: EventSubExtensionBitsTransactionCreateEvent) => void
	): Promise<EventSubSubscription> {
		return await this._genericSubscribe(
			EventSubExtensionBitsTransactionCreateSubscription,
			handler,
			this,
			clientId
		);
	}

	/**
	 * Subscribes to events that represent a user granting authorization to an application.
	 *
	 * @param clientId The Client ID for which to get notifications about authorization grants.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToUserAuthorizationGrantEvents(
		clientId: string,
		handler: (data: EventSubUserAuthorizationGrantEvent) => void
	): Promise<EventSubSubscription> {
		return await this._genericSubscribe(EventSubUserAuthorizationGrantSubscription, handler, this, clientId);
	}

	/**
	 * Subscribes to events that represent a user revoking authorization from an application.
	 *
	 * @param clientId The Client ID for which to get notifications about authorization revocations.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToUserAuthorizationRevokeEvents(
		clientId: string,
		handler: (data: EventSubUserAuthorizationRevokeEvent) => void
	): Promise<EventSubSubscription> {
		return await this._genericSubscribe(EventSubUserAuthorizationRevokeSubscription, handler, this, clientId);
	}

	/**
	 * Subscribes to events that represent a user updating their account details.
	 *
	 * @param user The user for which to get notifications about account updates.
	 * @param handler The function that will be called for any new notifications.
	 */
	async subscribeToUserUpdateEvents(
		user: UserIdResolvable,
		handler: (data: EventSubUserUpdateEvent) => void
	): Promise<EventSubSubscription> {
		const userId = extractUserId(user);

		if (!numberRegex.test(userId)) {
			this._logger.warn(
				'subscribeToUserUpdateEvents: The given user is a non-numeric string. You might be sending a user name instead of a user ID.'
			);
		}
		return await this._genericSubscribe(EventSubUserUpdateSubscription, handler, this, userId);
	}

	/** @private */
	abstract _getTransportOptionsForSubscription(
		subscription: EventSubSubscription
	): Promise<HelixEventSubTransportOptions>;

	/** @private */
	abstract _getCliTestCommandForSubscription(subscription: EventSubSubscription): Promise<string>;

	protected _getCorrectSubscriptionByTwitchId(id: string): EventSubSubscription | undefined {
		return this._subscriptionsByTwitchId.get(id);
	}

	private async _genericSubscribe<T, Args extends unknown[]>(
		clazz: new (handler: (obj: T) => void, client: EventSubBase, ...args: Args) => EventSubSubscription<T>,
		handler: (obj: T) => void,
		client: EventSubBase,
		...params: Args
	): Promise<EventSubSubscription> {
		const subscription = new clazz(handler, client, ...params);
		if (this._readyToSubscribe) {
			await subscription.start(this._twitchSubscriptions.get(subscription.id));
		}
		this._subscriptions.set(subscription.id, subscription as EventSubSubscription);

		return subscription as EventSubSubscription;
	}
}
