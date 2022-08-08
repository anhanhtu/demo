/**
 * Created by TaoLaTu.
 * User: tutv
 * Date: 29/07/2022 14:16
 */

/**
 * Point model.
 */
define([
    'ko',
    'domReady!'
], function (ko) {
    'use strict';

    var pointUse = ko.observable(null),
        isApplied = ko.observable(null);

    return {
        pointUse: pointUse,
        isApplied: isApplied,

        /**
         * @return {*}
         */
        getPointUse: function () {
            return pointUse;
        },

        /**
         * @return {Boolean}
         */
        getIsApplied: function () {
            return isApplied;
        },

        /**
         * @param {*} pointUseValue
         */
        setPointUse: function (pointUseValue) {
            pointUse(pointUseValue);
        },

        /**
         * @param {Boolean} isAppliedValue
         */
        setIsApplied: function (isAppliedValue) {
            isApplied(isAppliedValue);
        }
    };
});
