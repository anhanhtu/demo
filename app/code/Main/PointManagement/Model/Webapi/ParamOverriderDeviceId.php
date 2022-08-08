<?php
/**
 * Created by TaoLaTu.
 * User: tutv
 * Date: 29/07/2022 16:52
 */

namespace Main\PointManagement\Model\Webapi;

use Magento\Authorization\Model\UserContextInterface;
use Magento\Framework\Webapi\Rest\Request\ParamOverriderInterface;
use Magento\Quote\Api\CartManagementInterface;
use Magento\Framework\HTTP\Header;

class ParamOverriderDeviceId implements ParamOverriderInterface
{
    const DEFAULT_DEVICE = 0; //desktop website
    const MOBILE_DEVICE = 1; //mobile website
    const MOBILE_APP = 2; //mobile app
    /**
     * @var UserContextInterface
     */
    private $userContext;

    /**
     * @var CartManagementInterface
     */
    private $cartManagement;

    /**
     * @var Header
     */
    private $httpHeader;

    /**
     * Constructs an object to override the cart ID parameter on a request.
     *
     * @param UserContextInterface $userContext
     * @param CartManagementInterface $cartManagement
     * @param Header $httpHeader
     */
    public function __construct(
        UserContextInterface $userContext,
        CartManagementInterface $cartManagement,
        Header $httpHeader
    ) {
        $this->userContext = $userContext;
        $this->cartManagement = $cartManagement;
        $this->httpHeader = $httpHeader;
    }

    /**
     * {@inheritDoc}
     * get device user
     */
    public function getOverriddenValue()
    {
        $deviceId = self::DEFAULT_DEVICE;
        if ($this->isMobileDevice()) {
            $deviceId = self::MOBILE_DEVICE;
        }
        return $deviceId;
    }

    /**
     * Check is Mobile Device
     * @return bool
     */
    private function isMobileDevice()
    {
        $userAgent = $this->httpHeader->getHttpUserAgent();
        return \Zend_Http_UserAgent_Mobile::match($userAgent, $_SERVER);
    }
}

