// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SkillSwap
 * @dev Allows users to create skills and exchange them with others.
 */
contract SkillSwap {
    address public owner;

    struct Skill {
        uint32 id;
        string name;
        address creator;
        bool isAvailableForExchange;
    }

    // Events declaration for creating, requesting, and completing skill exchanges.
    event SkillCreated(uint32 indexed id, string name, address indexed creator);
    event SkillExchangeRequested(uint32 indexed requestedSkillId, uint32 indexed offeredSkillId, address indexed requester);
    event SkillExchangeCompleted(uint32 indexed requestedSkillId, uint32 indexed offeredSkillId, address indexed requester, address approver);

    uint32 private skillCounter = 0;
    mapping(uint32 => Skill) public skills;
    mapping(address => uint32[]) public userSkills;
    mapping(uint32 => uint32) public skillExchangeRequests;

    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict certain functions to the contract owner.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    // Modifier to restrict certain functions to the skill creator.
    modifier onlySkillCreator(uint32 skillId) {
        require(skills[skillId].creator == msg.sender, "Only the skill creator can perform this action.");
        _;
    }

    /**
     * @dev Creates a new skill and adds it to the mapping.
     * @param name Name of the new skill.
     */
    function createSkill(string memory name) public {
        require(bytes(name).length > 0, "Skill name cannot be empty.");
        uint32 _skillId = skillCounter;
        skills[_skillId] = Skill(_skillId, name, msg.sender, true);
        userSkills[msg.sender].push(_skillId);
        emit SkillCreated(_skillId, name, msg.sender);
        skillCounter++;
    }

    /**
     * @dev Requests an exchange of skills between users.
     * @param requestedSkillId ID of the skill being requested.
     * @param offeredSkillId ID of the skill being offered in exchange.
     */
    function requestSkillExchange(uint32 requestedSkillId, uint32 offeredSkillId) public {
        require(skills[requestedSkillId].isAvailableForExchange, "Requested skill is not available for exchange.");
        require(skills[offeredSkillId].creator == msg.sender, "You can only offer skills you created.");
        skillExchangeRequests[requestedSkillId] = offeredSkillId;
        emit SkillExchangeRequested(requestedSkillId, offeredSkillId, msg.sender);
    }

    /**
     * @dev Approves a skill exchange request.
     * @param requestedSkillId ID of the skill being requested, which this user must own.
     */
    function approveSkillExchange(uint32 requestedSkillId) public onlySkillCreator(requestedSkillId) {
        uint32 offeredSkillId = skillExchangeRequests[requestedSkillId];
        address requester = skills[offeredSkillId].creator;

        // Exchange the creators of the two skills.
        skills[requestedSkillId].creator = requester;
        skills[offeredSkillId].creator = msg.sender;
        
        emit SkillExchangeCompleted(requestedSkillId, offeredSkillId, requester, msg.sender);
    }

    /**
     * @dev Toggles the availability of a skill for exchange.
     * @param skillId ID of the skill to toggle the availability for.
     */
    function toggleSkillAvailability(uint32 skillId) public onlySkillCreator(skillId) {
        skills[skillId].isAvailableForExchange = !skills[skillId].isAvailableForExchange;
    }
}