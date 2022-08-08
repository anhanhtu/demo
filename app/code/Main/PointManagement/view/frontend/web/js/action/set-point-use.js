/**
 * Created by TaoLaTu.
 * User: tutv
 * Date: 29/07/2022 14:16
 */

define([
    'ko',
    'jquery',
    'Magento_Checkout/js/model/quote',
    'Main_PointManagement/js/model/resource-url-manager',
    'Magento_Checkout/js/model/error-processor',
    'Magento_SalesRule/js/model/payment/discount-messages',
    'mage/storage',
    'mage/translate',
    'Magento_Checkout/js/action/get-payment-information',
    'Magento_Checkout/js/model/totals',
    'Magento_Checkout/js/model/full-screen-loader',
    'Magento_Checkout/js/action/recollect-shipping-rates'
], function (ko, $, quote,
             urlManager,
             errorProcessor, messageContainer, storage, $t, getPaymentInformationAction,
             totals, fullScreenLoader, recollectShippingRates
) {
    'use strict';

    var dataModifiers = [],
        successCallbacks = [],
        failCallbacks = [],
        action;

    /**
     * Apply provided point.
     *
     * @param {String} pointUse
     * @param {Boolean}isApplied
     * @returns {Deferred}
     */
    action = function (pointUse, isApplied) {
        var quoteId = quote.getQuoteId(),
            url = urlManager.getApplyPointUrl(pointUse, quoteId),
            message = $t('Your point was successfully used.'),
            data = {},
            headers = {};

        //Allowing to modify point-apply request
        dataModifiers.forEach(function (modifier) {
            modifier(headers, data);
        });
        fullScreenLoader.startLoader();

        return storage.put(
            url,
            data,
            false,
            null,
            headers
        ).done(function (response) {
            var deferred;

            if (response) {
                deferred = $.Deferred();

                isApplied(true);
                totals.isLoading(true);
                recollectShippingRates();
                getPaymentInformationAction(deferred);
                $.when(deferred).done(function () {
                    fullScreenLoader.stopLoader();
                    totals.isLoading(false);
                });
                messageContainer.addSuccessMessage({
                    'message': message
                });
                //Allowing to tap into apply-point process.
                successCallbacks.forEach(function (callback) {
                    callback(response);
                });
            }
        }).fail(function (response) {
            fullScreenLoader.stopLoader();
            totals.isLoading(false);
            errorProcessor.process(response, messageContainer);
            //Allowing to tap into apply-point process.
            failCallbacks.forEach(function (callback) {
                callback(response);
            });
        });
    };

    /**
     * Modifying data to be sent.
     *
     * @param {Function} modifier
     */
    action.registerDataModifier = function (modifier) {
        dataModifiers.push(modifier);
    };

    /**
     * When successfully added a point.
     *
     * @param {Function} callback
     */
    action.registerSuccessCallback = function (callback) {
        successCallbacks.push(callback);
    };

    /**
     * When failed to add a point.
     *
     * @param {Function} callback
     */
    action.registerFailCallback = function (callback) {
        failCallbacks.push(callback);
    };

    return action;
});
