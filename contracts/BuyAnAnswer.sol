// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract BuyAnAnswer {
    // the front end will be able to call the following:
    // - create user
    // - update user
    //  - get user by username
    // - post question to user by choosing user address
    // - post answer to question received by choosing questionID
    // - decline question received by choosing questionID
    // - get user history (all questions and answers)
    // - get unanswered questions
    // - get received questions
    // - get declined questions
    // - get answered questions
    // - get user balance

    // CREATE ALL NECESSARY EVENTS

    struct User {
        address payable userAddress;
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
    mapping(string => User) public usersByUsername;
    mapping(address => Question[]) public history;
    mapping(address => Question[]) public receivedQuestions;
    mapping(address => Question[]) public declinedQuestions;
    mapping(address => Answer[]) public answeredQuestions;
    mapping(bytes32 => Question) public questions;

    // create social

    // function createSocial(
    //     string memory _platform,
    //     string memory _socialUrl
    // ) public {
    //     Social memory newSocial = Social(_platform, _socialUrl);
    //     users[msg.sender].socials.push(newSocial);
    // }

    function createBoardID(string memory usrnm, string memory eml)
        internal
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(usrnm, eml));
    }

    // create user

    function createUser(
        string memory _username,
        string memory _name,
        string memory _email,
        string memory _password,
        // bytes32 _boardID,
        string memory _headline,
        string memory _bio,
        uint256 _minimumPrice
    ) public // Social[] memory _socials
    {
        // check if there is already a user with this address
        // if yes, throw error
        // if no, create user

        // checking if user exists

        // if (users[msg.sender].username != "") {
        //     revert("User already exists");
        // }

        bytes32 _boardID = createBoardID(_username, _email);

        address payable userAddress = msg.sender;

        User memory newUser = User(
            userAddress,
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
        usersByUsername[_username] = newUser;
    }

    // get user

    function getUser(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    // update user (only update headline, bio, minimum price)

    function updateUser(
        string memory _headline,
        string memory _bio,
        uint256 _minimumPrice
    ) public {
        users[msg.sender].headline = _headline;
        users[msg.sender].bio = _bio;
        users[msg.sender].minimumPrice = _minimumPrice;
    }

    // post question from user to another user

    function postQuestion(
        string memory _questionText,
        uint256 _priorityBonus,
        address payable _answerUser
    ) public payable {
        Question memory newQuestion = Question(
            keccak256(
                abi.encodePacked(
                    _questionText,
                    getUser(_answerUser).boardID,
                    (getUser(_answerUser).minimumPrice + _priorityBonus),
                    _priorityBonus,
                    msg.sender,
                    _answerUser
                )
            ),
            _questionText,
            getUser(_answerUser).boardID,
            (getUser(_answerUser).minimumPrice + _priorityBonus),
            _priorityBonus,
            msg.sender,
            _answerUser,
            false
        );
        history[msg.sender].push(newQuestion);
        history[_answerUser].push(newQuestion);
        unansweredQuestions[_answerUser].push(newQuestion);
        questions[
            keccak256(
                abi.encodePacked(
                    _questionText,
                    getUser(_answerUser).boardID,
                    (getUser(_answerUser).minimumPrice + _priorityBonus),
                    _priorityBonus,
                    msg.sender,
                    _answerUser
                )
            )
        ] = newQuestion;
        receivedQuestions[_answerUser].push(newQuestion);
    }

    // post answer from user to question

    function postAnswer(bytes32 _questionID, string memory _answerText)
        public
        payable
    {
        Question memory question;
        for (uint256 i = 0; i < receivedQuestions[msg.sender].length; i++) {
            if (receivedQuestions[msg.sender][i].questionID == _questionID) {
                question = receivedQuestions[msg.sender][i];
                break;
            }
        }
        Answer memory newAnswer = Answer(question, _answerText);

        answeredQuestions[msg.sender].push(newAnswer);

        question.isAnswered = true;
        question.answerUser = msg.sender;
        history[question.askUser].push(question);
        history[question.answerUser].push(question);
        // question.answerUser.transfer(question.price);
        // question.askUser.transfer(question.priorityBonus);
        // payable(question.answerUser).transfer(question.price);
        // payable(question.askUser).transfer(question.price);
    }

    // decline question from user to question

    function declineQuestion(bytes32 _questionID) public payable {
        Question memory question;
        for (uint256 i = 0; i < receivedQuestions[msg.sender].length; i++) {
            if (receivedQuestions[msg.sender][i].questionID == _questionID) {
                question = receivedQuestions[msg.sender][i];
                break;
            }
        }
        declinedQuestions[msg.sender].push(question);
        history[question.askUser].push(question);
        history[question.answerUser].push(question);
        question.answerUser.transfer(question.price);
        question.askUser.transfer(question.priorityBonus);
    }

    // get user history

    function getUserHistory(address _userAddress)
        public
        view
        returns (Question[] memory)
    {
        return history[_userAddress];
    }

    // create mapping for unanswered questions

    mapping(address => Question[]) public unansweredQuestions;

    // get unanswered questions

    function getUnansweredQuestions() public view returns (Question[] memory) {
        return unansweredQuestions[msg.sender];
    }

    // get user received questions

    function getUserReceivedQuestions(address _userAddress)
        public
        view
        returns (Question[] memory)
    {
        return receivedQuestions[_userAddress];
    }

    // get user declined questions

    function getUserDeclinedQuestions(address _userAddress)
        public
        view
        returns (Question[] memory)
    {
        return declinedQuestions[_userAddress];
    }

    // get user answered questions

    function getUserAnsweredQuestions(address _userAddress)
        public
        view
        returns (Answer[] memory)
    {
        return answeredQuestions[_userAddress];
    }

    // get user balance

    function getUserBalance(address _userAddress)
        public
        view
        returns (uint256)
    {
        return users[_userAddress].balance;
    }

    // get user boardID

    function getUserBoardID(address _userAddress)
        public
        view
        returns (bytes32)
    {
        return users[_userAddress].boardID;
    }

    // get user headline

    function getUserHeadline(address _userAddress)
        public
        view
        returns (string memory)
    {
        return users[_userAddress].headline;
    }

    // get user bio

    function getUserBio(address _userAddress)
        public
        view
        returns (string memory)
    {
        return users[_userAddress].bio;
    }

    // get user minimum price

    function getUserMinimumPrice(address _userAddress)
        public
        view
        returns (uint256)
    {
        return users[_userAddress].minimumPrice;
    }

    // get user socials

    // function getUserSocials(address _userAddress) public view returns (Social[] memory) {
    //     return users[_userAddress].socials;
    // }

    // get user socials by platform

    // function getUserSocialsByPlatform(address _userAddress, string memory _platform) public view returns (Social memory) {
    //     for (uint256 i = 0; i < users[_userAddress].socials.length; i++) {
    //         if (keccak256(abi.encodePacked(users[_userAddress].socials[i].platform)) == keccak256(abi.encodePacked(_platform))) {
    //             return users[_userAddress].socials[i];
    //         }
    //     }
    // }

    // get user by username

    function getUserByUsername(string memory _username)
        public
        view
        returns (User memory)
    {
        return usersByUsername[_username];
    }
}
