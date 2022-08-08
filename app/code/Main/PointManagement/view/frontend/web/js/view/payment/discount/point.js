/**
 * Created by TaoLaTu.
 * User: tutv
 * Date: 29/07/2022 14:16
 */

define([
    'jquery',
    'ko',
    'uiComponent',
    'Magento_Checkout/js/model/quote',
    'Main_PointManagement/js/action/set-point-use',
    // 'Main_PointManagement/js/action/cancel-point',
    'Main_PointManagement/js/model/point'
], function ($, ko, Component, quote,
             setPointUseAction,
             // cancelPointAction,
             point) {
    'use strict';

    var totals = quote.getTotals(),
        pointUse = point.getPointUse(),
        isApplied = point.getIsApplied();

    if (totals()['point_use']) {
        pointUse(totals()['point_use']);
    }
    isApplied(pointUse() != null);

    return Component.extend({
        defaults: {
            template: 'Main_PointManagement/payment/discount/point'
        },
        pointUse: pointUse,

        /**
         * Applied flag
         */
        isApplied: isApplied,

        /**
         * Coupon code application procedure
         */
        apply: function () {
            if (this.validate()) {
                setPointUseAction(pointUse(), isApplied);
            }
        },

        /**
         * Cancel using coupon
         */
        cancel: function () {
            if (this.validate()) {
                pointUse('');
                // cancelPointAction(isApplied);
            }
        },

        /**
         * Coupon form validation
         *
         * @returns {Boolean}
         */
        validate: function () {
            var form = '#discount-form';

            return $(form).validation() && $(form).validation('isValid');
        }
    });
});
