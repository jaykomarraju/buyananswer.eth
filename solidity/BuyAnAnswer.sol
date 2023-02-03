// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract BuyAnAnswer {

    struct User {
        string username;
        string name;
        string email;
        string password;
        uint256 balance;
        bytes32 boardID;
        string headline;
        string bio;
        uint256 minimumPrice;
        // Social[] socials;
    }

    struct Social {
        string platform;
        string socialUrl;
    }

    struct Question {
        bytes32 questionID;
        string questionText;
        bytes32 boardID;
        uint256 price;
        uint256 priorityBonus;
        address payable askUser;
        address payable answerUser;
        bool isAnswered;
    }

    struct Answer {
        Question question;
        string answerText;
    }

    mapping(address => User) public users;
    mapping(address => Question[]) public history;
    mapping(address => Question[]) public receivedQuestions;
    mapping(address => Question[]) public declinedQuestions;
    mapping(address => Answer[]) public answeredQuestions;

    // create social

    // function createSocial(
    //     string memory _platform,
    //     string memory _socialUrl
    // ) public {
    //     Social memory newSocial = Social(_platform, _socialUrl);
    //     users[msg.sender].socials.push(newSocial);
    // }

    

    // create user

    function createUser(
        string memory _username,
        string memory _name,
        string memory _email,
        string memory _password,
        bytes32 _boardID,
        string memory _headline,
        string memory _bio,
        uint256 _minimumPrice
        // Social[] memory _socials
    ) public {
        User memory newUser = User(
            _username,
            _name,
            _email,
            _password,
            0,
            _boardID,
            _headline,
            _bio,
            _minimumPrice
            // _socials,
            // new Question[](0)
            );
        users[msg.sender] = newUser;
    }

    // get user

    function getUser(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    // post question from user to another user

    function postQuestion(
        string memory _questionText,
        uint256 _priorityBonus,
        address payable _answerUser
    ) public payable {
        Question memory newQuestion = Question(
            keccak256(abi.encodePacked(_questionText, getUser(_answerUser).boardID, (getUser(_answerUser).minimumPrice + _priorityBonus), _priorityBonus, msg.sender, _answerUser)),
            _questionText,
            getUser(_answerUser).boardID,
            (getUser(_answerUser).minimumPrice + _priorityBonus),
            _priorityBonus,
            payable(msg.sender),
            _answerUser,
            false
        );
        history[msg.sender].push(newQuestion);
        receivedQuestions[_answerUser].push(newQuestion);
    }

    // post answer from user to question

    function postAnswer(
        bytes32 _questionID,
        string memory _answerText
    ) public payable {
        Question memory question;
        for (uint256 i = 0; i < receivedQuestions[msg.sender].length; i++) {
            if (receivedQuestions[msg.sender][i].questionID == _questionID) {
                question = receivedQuestions[msg.sender][i];
                break;
            }
        }
        Answer memory newAnswer = Answer(question, _answerText);
        answeredQuestions[msg.sender].push(newAnswer);
        payable(question.askUser).transfer(question.price);
    }

    // decline question from user to question

    function declineQuestion(
        bytes32 _questionID
    ) public payable {
        Question memory question;
        for (uint256 i = 0; i < receivedQuestions[msg.sender].length; i++) {
            if (receivedQuestions[msg.sender][i].questionID == _questionID) {
                question = receivedQuestions[msg.sender][i];
                break;
            }
        }
        declinedQuestions[msg.sender].push(question);
    }

    // get user history

    function getUserHistory(address _userAddress) public view returns (Question[] memory) {
        return history[_userAddress];
    }

    // get user received questions

    function getUserReceivedQuestions(address _userAddress) public view returns (Question[] memory) {
        return receivedQuestions[_userAddress];
    }

    // get user declined questions

    function getUserDeclinedQuestions(address _userAddress) public view returns (Question[] memory) {
        return declinedQuestions[_userAddress];
    }

    // get user answered questions

    function getUserAnsweredQuestions(address _userAddress) public view returns (Answer[] memory) {
        return answeredQuestions[_userAddress];
    }

}
