pragma solidity ^0.8.0;

contract SkillSwap {
    address public owner;
    struct Skill {
        uint256 id;
        string name;
        address creator;
        bool isAvailableForExchange;
    }
    
    event SkillCreated(uint256 indexed id, string name, address indexed creator);
    event SkillExchangeRequested(uint256 indexed requestedSkillId, uint256 indexed offeredSkillId, address indexed requester);
    event SkillExchangeCompleted(uint256 indexed requestedSkillId, uint256 indexed offeredSkillId, address indexed requester, address approver);

    uint256 private skillCounter = 0;
    mapping(uint256 => Skill) public skills;
    mapping(address => uint256[]) public userSkills;
    mapping(uint256 => uint256) public skillExchangeRequests; 

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    modifier onlySkillCreator(uint256 skillId) {
        require(skills[skillId].creator == msg.sender, "Only the skill creator can perform this action.");
        _;
    }

    function createSkill(string memory name) public {
        require(bytes(name).length > 0, "Skill name cannot be empty.");
        skills[skillCounter] = Skill(skillCounter, name, msg.sender, true);
        userSkills[msg.sender].push(skillCounter);
        emit SkillCreated(skillCounter, name, msg.sender);
        skillCounter++;
    }

    function requestSkillExchange(uint256 requestedSkillId, uint256 offeredSkillId) public {
        require(skills[requestedSkillId].isAvailableForExchange, "Requested skill is not available for exchange.");
        require(skills[offeredSkillId].creator == msg.sender, "You can only offer skills you created.");
        skillExchangeRequests[requestedSkillId] = offeredSkillId;
        emit SkillExchangeRequested(requestedSkillId, offeredSkillId, msg.sender);
    }

    function approveSkillExchange(uint256 requestedSkillId) public onlySkillCreator(requestedSkillId) {
        uint256 offeredSkillId = skillExchangeRequests[requestedSkillId];
        address requester = skills[offeredSkillId].creator;

        skills[requestedSkillId].creator = requester;
        skills[offeredSkillId].creator = msg.sender;
        
        emit SkillExchangeCompleted(requestedSkillId, offeredSkillId, requester, msg.sender);
    }

    function toggleSkillAvailability(uint256 skillId) public onlySkillCreator(skillId) {
        skills[skillId].isAvailableForExchange = !skills[skillId].isAvailableForExchange;
    }
}