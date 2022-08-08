/**
 * Created by TaoLaTu.
 * User: tutv
 * Date: 29/07/2022 14:16
 */

define([
    'jquery',
    'Magento_Checkout/js/model/resource-url-manager'
], function ($, checkoutResourceUrl) {
    'use strict';

    return $.extend(checkoutResourceUrl, {
        /**
         * @param {String} pointUse
         * @param {String} quoteId
         * @return {*}
         */
        getApplyPointUrl: function (pointUse, quoteId) {
            var params = this.getCheckoutMethod() == 'guest' ?
                    {quoteId: quoteId} : {},
                urls = {
                    'guest': '/guest-carts/' + quoteId + '/points/' + encodeURIComponent(pointUse),
                    'customer': '/carts/mine/points/' + encodeURIComponent(pointUse)
                };

            return this.getUrl(urls, params);
        },

        /**
         * @param {String} quoteId
         * @return {*}
         */
        getCancelPointUrl: function (quoteId) {
            var params = this.getCheckoutMethod() == 'guest' ? //eslint-disable-line eqeqeq
                    {quoteId: quoteId} : {},
                urls = {
                    'guest': '/guest-carts/' + quoteId + '/points/',
                    'customer': '/carts/mine/points/'
                };

            return this.getUrl(urls, params);
        }
    });
});
