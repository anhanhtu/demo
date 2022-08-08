<?php
/**
 * Created by TaoLaTu.
 * User: tutv
 * Date: 29/07/2022 16:34
 */

namespace Main\PointManagement\Api;

interface PointManagementInterface
{
    /**
     * Returns information for a point in a specified cart.
     *
     * @param int $customerId The customer ID.
     * @return string The point use value.
     * @throws \Magento\Framework\Exception\NoSuchEntityException The specified cart does not exist.
     */
    public function get($customerId);

    /**
     * Adds a point by code to a specified cart.
     *
     * @param int $cartId The cart ID.
     * @param string $pointUse The point code data.
     * @return bool
     * @throws \Magento\Framework\Exception\NoSuchEntityException The specified cart does not exist.
     * @throws \Magento\Framework\Exception\CouldNotSaveException The specified point could not be added.
     */
    public function set($cartId, $pointUse);

    /**
     * Deletes a point from a specified cart.
     *
     * @param int $cartId The cart ID.
     * @return bool
     * @throws \Magento\Framework\Exception\NoSuchEntityException The specified cart does not exist.
     * @throws \Magento\Framework\Exception\CouldNotDeleteException The specified point could not be deleted.
     */
    public function remove($cartId);
}
