// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthProfile {
    
    struct Profile {
        string name;
        uint age;
        string bloodType;
        string medicalHistory;
        string allergies;
    }
    
    struct MedicalFile {
        uint timestamp;
        string fileHash;
        bool isImage;
    }
    
    mapping(address => Profile) private profiles;
    mapping(address => MedicalFile[]) private medicalFiles;
    mapping(address => bool) private authorizedOrganizations;
    
    event ProfileCreated(address indexed user, string name, uint age, string bloodType, string medicalHistory, string allergies);
    event ProfileUpdated(address indexed user, string name, uint age, string bloodType, string medicalHistory, string allergies);
    event MedicalFileAdded(address indexed user, uint timestamp, string fileHash);
    
    modifier onlyUser() {
        require(msg.sender == tx.origin, "Only user can perform this action");
        _;
    }
    
    modifier onlyAuthorized() {
        require(msg.sender == tx.origin || authorizedOrganizations[msg.sender], "Unauthorized");
        _;
    }
    
    function createUserProfile(string memory _name, uint _age, string memory _bloodType, string memory _medicalHistory, string memory _allergies) public onlyUser {
        require(bytes(profiles[msg.sender].name).length == 0, "Profile already exists for this user");
        
        Profile memory newProfile = Profile(_name, _age, _bloodType, _medicalHistory, _allergies);
        profiles[msg.sender] = newProfile;
        
        emit ProfileCreated(msg.sender, _name, _age, _bloodType, _medicalHistory, _allergies);
    }
    
    function updateUserProfile(string memory _name, uint _age, string memory _bloodType, string memory _medicalHistory, string memory _allergies) public onlyUser {
        require(bytes(profiles[msg.sender].name).length != 0, "Profile does not exist for this user");
        
        profiles[msg.sender].name = _name;
        profiles[msg.sender].age = _age;
        profiles[msg.sender].bloodType = _bloodType;
        profiles[msg.sender].medicalHistory = _medicalHistory;
        profiles[msg.sender].allergies = _allergies;
        
        emit ProfileUpdated(msg.sender, _name, _age, _bloodType, _medicalHistory, _allergies);
    }
    
    function addMedicalFile(string memory _fileHash, bool _isImage) public onlyUser {
        uint timestamp = block.timestamp;
        medicalFiles[msg.sender].push(MedicalFile(timestamp, _fileHash,_isImage));
        
        emit MedicalFileAdded(msg.sender, timestamp, _fileHash);
    }
    
    function grantAccess(address _organization) public onlyUser {
        authorizedOrganizations[_organization] = true;
    }
    
    function revokeAccess(address _organization) public onlyUser {
        authorizedOrganizations[_organization] = false;
    }
    
    function viewPaitentProfile(address _user) public view onlyAuthorized returns (string memory, uint, string memory, string memory, string memory) {
        Profile memory userProfile = profiles[_user];
        return (userProfile.name, userProfile.age, userProfile.bloodType, userProfile.medicalHistory, userProfile.allergies);
    }
    
    function viewOwnProfile() public view onlyUser returns (string memory, uint, string memory, string memory, string memory) {
        Profile memory ownProfile = profiles[msg.sender];
        return (ownProfile.name, ownProfile.age, ownProfile.bloodType, ownProfile.medicalHistory, ownProfile.allergies);
    }
    
    function viewMedicalFiles() public view onlyUser returns (MedicalFile[] memory) {
        return medicalFiles[msg.sender];
    }
    function viewPaitentMedicalFiles(address _user) public view onlyAuthorized returns (MedicalFile[] memory) {
        return medicalFiles[_user];
    }
    function viewMedicalFilesByTime(uint _startTime, uint _endTime) public view onlyUser returns (MedicalFile[] memory) {
        require(_endTime >= _startTime, "End time must be greater than or equal to start time");
        
        MedicalFile[] memory userMedicalFiles = medicalFiles[msg.sender];
        MedicalFile[] memory result = new MedicalFile[](userMedicalFiles.length);
        uint resultIndex = 0;
        
        for(uint i = 0; i < userMedicalFiles.length; i++) {
            if(userMedicalFiles[i].timestamp >= _startTime && userMedicalFiles[i].timestamp <= _endTime) {
                result[resultIndex] = userMedicalFiles[i];
                resultIndex++;
            }
        }
        
        return result;
    }
}
